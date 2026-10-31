const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.join(__dirname, '..');
function compile(file) {
  return ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true,
    },
  }).outputText;
}
const data = { exports: {} };
vm.runInNewContext(compile('src/data/content.ts'), data);
const fixtures = data.exports;

function load(file, stateOverrides = [], TestDate = Date) {
  let stateIndex = 0;
  const messages = [], changes = [];
  const element = (type, props) => ({ type, props });
  const sandbox = {
    exports: {}, URLSearchParams, Date: TestDate,
    fetch() { throw new Error('Preview tests forbid network requests'); },
    require(id) {
      if (id === 'react/jsx-runtime') return { jsx: element, jsxs: element };
      if (id === 'react') return {
        useEffect() {},
        useRef: current => ({ current }),
        useState(initial) {
          const index = stateIndex++;
          const value = index in stateOverrides ? stateOverrides[index] : initial;
          return [value, next => changes.push({ index, value: next })];
        },
      };
      if (id === 'react-router-dom') return {
        Link: 'a', Routes: 'routes', Route: 'route',
        useSearchParams: () => [new URLSearchParams('package=essential&addons=kitchen-upgrade')],
      };
      if (id === 'gsap') return { gsap: { registerPlugin() {} } };
      if (id === 'gsap/ScrollTrigger') return { ScrollTrigger: {} };
      if (id === 'lucide-react') return new Proxy({}, { get: (_, key) => `icon-${String(key)}` });
      if (id === 'sonner') return { toast: {
        success: (...args) => messages.push({ type: 'success', args }),
        info: (...args) => messages.push({ type: 'info', args }),
        error: (...args) => messages.push({ type: 'error', args }),
      } };
      if (id.endsWith('/data/content')) return fixtures;
      if (id.endsWith('/lib/dialog-focus')) return { trapDialogFocus() {} };
      if (id.endsWith('.css')) return {};
      if (id.startsWith('./pages/') || id.includes('/components/')) {
        return { __esModule: true, default: `component-${id}` };
      }
      throw new Error(`Unexpected preview dependency: ${id}`);
    },
  };
  vm.runInNewContext(compile(file), sandbox, { filename: file });
  return { render: sandbox.exports.default, messages, changes };
}
function nodes(tree) {
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  if (!tree || typeof tree !== 'object') return [];
  return [tree, ...nodes(tree.props?.children)];
}
function text(tree) {
  if (Array.isArray(tree)) return tree.map(text).join(' ');
  if (typeof tree === 'string' || typeof tree === 'number') return String(tree);
  return tree && typeof tree === 'object' ? text(tree.props?.children) : '';
}
function submit(component) {
  const form = nodes(component.render()).find(n => n.type === 'form');
  let prevented = false;
  form.props.onSubmit({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(component.messages.some(message => message.type === 'success'), false);
}

test('contact preview prevents delivery claims and retains entered state', () => {
  const component = load('src/pages/ContactPage.tsx');
  submit(component);
  assert.equal(component.messages[0].type, 'info');
  assert.match(component.messages[0].args[0], /no message sent/i);
  assert.equal(component.changes.length, 0);
});
test('quote preview calculates sample prices without requesting a quote', () => {
  const component = load('src/pages/QuotePage.tsx');
  const body = text(component.render());
  assert.match(body, /\$40,500/);
  submit(component);
  assert.match(component.messages[0].args[0], /no quote requested/i);
});
test('quote packages and add-ons are keyboard buttons with selected state', () => {
  const component = load('src/pages/QuotePage.tsx');
  const tree = component.render();
  const packages = nodes(tree).filter(n => /^Select sample package /.test(n.props?.['aria-label'] || ''));
  const addons = nodes(tree).filter(n => /^Toggle sample add-on /.test(n.props?.['aria-label'] || ''));
  assert.equal(packages.length, fixtures.basePackages.length);
  assert.equal(addons.length, fixtures.addOns.length);
  assert.equal([...packages, ...addons].every(n => n.type === 'button' && n.props.type === 'button'), true);
  assert.equal(packages[0].props['aria-pressed'], true);
  packages[1].props.onClick();
  assert.equal(component.changes[0].value, fixtures.basePackages[1].id);
  assert.equal(addons[0].props['aria-pressed'], true);
  addons[0].props.onClick();
  assert.equal(component.changes[1].value(['kitchen-upgrade']).includes('kitchen-upgrade'), false);
});
test('sample dates retain the displayed local day across a UTC boundary', () => {
  class JakartaDate extends Date {
    constructor() { super('2026-10-31T05:30:00.000Z'); }
    getFullYear() { return this.getUTCFullYear(); }
    getMonth() { return this.getUTCMonth(); }
    getDate() { return this.getUTCDate(); }
    setDate(value) { return this.setUTCDate(value); }
    toISOString() { return new Date(this.getTime() - 7 * 60 * 60 * 1000).toISOString(); }
    toLocaleDateString(locale, options) {
      return super.toLocaleDateString(locale, { ...options, timeZone: 'UTC' });
    }
  }
  const component = load('src/pages/BookCallPage.tsx', [], JakartaDate);
  const dates = nodes(component.render()).filter(n => /^Sample date /.test(n.props?.['aria-label'] || ''));
  assert.equal(dates.length, 14);
  assert.match(dates[0].props['aria-label'], /Nov 1/);
  dates[0].props.onClick();
  assert.equal(component.changes[0].value, '2026-11-01');
});
test('call planner only previews a selected sample slot', () => {
  const component = load('src/pages/BookCallPage.tsx', ['2026-11-01', '9:00 AM']);
  submit(component);
  assert.equal(component.messages[0].type, 'info');
  assert.match(component.messages[0].args[1].description, /No appointment/);
  assert.equal(component.changes.length, 1);
  assert.equal(component.changes[0].value, true);
});
test('call preview does not claim a booking or sent confirmation', () => {
  const component = load('src/pages/BookCallPage.tsx', [
    '2026-11-01', '9:00 AM', 'video', {}, true,
  ]);
  const body = text(component.render());
  assert.match(body, /No call was booked/);
  assert.match(body, /No confirmation, reminder, or calendar invitation was sent/);
  assert.doesNotMatch(body, /We've sent|Your discovery call is scheduled/);
});
for (const file of ['ContactPage', 'QuotePage', 'BookCallPage']) {
  test(`${file} can be previewed without mandatory personal information`, () => {
    const component = load(`src/pages/${file}.tsx`);
    assert.equal(nodes(component.render()).some(n => n.props?.required), false);
    const tree = component.render();
    for (const label of nodes(tree).filter(n => n.type === 'label')) {
      assert.ok(label.props.htmlFor, 'Every form field has a programmatic label');
      assert.ok(nodes(tree).some(n => n.props?.id === label.props.htmlFor));
    }
  });
}
for (const file of ['src/components/Footer.tsx', 'src/pages/ContactPage.tsx']) {
  test(`${file} has no active fictional business contact links`, () => {
    const component = load(file);
    const links = nodes(component.render()).filter(n => n.type === 'a');
    assert.equal(links.some(n => /^(mailto:|tel:|https?:)/i.test(n.props?.href || '')), false);
    assert.doesNotMatch(text(component.render()), /CSLB #|Licensed, bonded, and insured/);
  });
}
test('review fixtures are explicitly sample identities and never verified', () => {
  assert.equal(fixtures.reviews.length, 5);
  for (const review of fixtures.reviews) {
    assert.match(review.name, /^Sample Homeowner /);
    assert.equal(review.verified, false);
  }
});
test('review cards do not present real business statistics or customer portraits', () => {
  const tree = load('src/pages/ReviewsPage.tsx').render();
  const body = text(tree);
  assert.match(body, /Fictional Review Cards/);
  assert.match(body, /0 Verified Endorsements/);
  assert.doesNotMatch(body, /200\+|98%|100%|Average Rating|Would Recommend/);
  assert.equal(nodes(tree).filter(node => node.type === 'img').length, 0);
});
test('gallery cards are keyboard buttons and the sample dialog can be cancelled', () => {
  const component = load('src/pages/GalleryPage.tsx', [fixtures.galleryProjects[0], 'All']);
  const tree = component.render();
  const cards = nodes(tree).filter(node => /^View sample project /.test(node.props?.['aria-label'] || ''));
  assert.equal(cards.length, fixtures.galleryProjects.length);
  assert.equal(cards.every(node => node.type === 'button'), true);
  const dialog = nodes(tree).find(node => node.type === 'dialog');
  assert.equal(dialog.props['aria-labelledby'], 'sample-project-title');
  dialog.props.onCancel();
  assert.equal(component.changes[0].value, null);
});
test('dialog Tab boundaries wrap, including a single close button', () => {
  const document = { activeElement: null };
  const sandbox = { exports: {}, document };
  vm.runInNewContext(compile('src/lib/dialog-focus.ts'), sandbox);
  const makeControl = () => ({
    tabIndex: 0, hasAttribute: () => false, closest: () => null,
    getClientRects: () => [{}],
    focus() { document.activeElement = this; },
  });
  const first = makeControl(), last = makeControl();
  let prevented = false;
  const event = {
    key: 'Tab', shiftKey: false,
    currentTarget: { querySelectorAll: () => [first, last] },
    preventDefault() { prevented = true; },
  };
  document.activeElement = last;
  sandbox.exports.trapDialogFocus(event);
  assert.equal(document.activeElement, first);
  assert.equal(prevented, true);
  event.shiftKey = true;
  sandbox.exports.trapDialogFocus(event);
  assert.equal(document.activeElement, last);
  event.shiftKey = false;
  event.currentTarget.querySelectorAll = () => [first];
  document.activeElement = first;
  sandbox.exports.trapDialogFocus(event);
  assert.equal(document.activeElement, first);
});
test('homepage does not promise delivery or invent a named endorsement', () => {
  const source = fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8');
  assert.doesNotMatch(source, /Sarah Mitchell|send a quote in 48 hours|Monthly payment options|Upgrade without changing the timeline/);
  assert.match(source, /Fictional sample homeowner, not an endorsement/);
});
test('editor inspection is explicitly opted in and excluded from production preview', () => {
  const source = fs.readFileSync(path.join(root, 'vite.config.ts'), 'utf8');
  assert.match(source, /command === 'serve' && !isPreview && process\.env\.ENABLE_VISUAL_EDITS === '1'/);
  assert.match(source, /await import\('kimi-plugin-inspect-react'\)/);
});
test('every route has the shared fictional-study disclosure', () => {
  const component = load('src/App.tsx');
  const body = text(component.render());
  assert.match(body, /Fictional interface study/);
  assert.match(body, /not real offers or customer results/);
});
test('metadata identifies a study and avoids business search indexing', () => {
  const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(source, /Fictional Interface Study/);
  assert.match(source, /name="robots" content="noindex, follow"/);
});
test('declared social and touch images exist with the expected dimensions', () => {
  for (const [file, width, height] of [
    ['og-image.png', 1200, 630], ['apple-touch-icon.png', 180, 180],
  ]) {
    const bytes = fs.readFileSync(path.join(root, 'public', file));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    assert.equal(bytes.readUInt32BE(16), width);
    assert.equal(bytes.readUInt32BE(20), height);
  }
  const robots = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
  assert.doesNotMatch(robots, /Sitemap:/);
});
for (const file of ['PrivacyPage', 'TermsPage']) {
  test(`${file} describes the prototype rather than fictional business terms`, () => {
    const page = load(`src/pages/${file}.tsx`).render();
    const body = JSON.stringify(page.props);
    assert.doesNotMatch(body, /20% deposit|1\.5%|Travis County|hello@homeconstruction\.site/);
    assert.match(body, /prototype|fictional/i);
  });
}

test('sample timeline export uses the displayed fixtures and disclaims real delivery', () => {
  const sandbox = {
    exports: {},
    require(id) {
      assert.equal(id, '../data/content');
      return fixtures;
    },
  };
  vm.runInNewContext(compile('src/lib/sample-timeline.ts'), sandbox);
  const output = sandbox.exports.getSampleTimelineText();
  assert.match(output, /FICTIONAL TIMELINE EXAMPLE/);
  assert.match(output, /Not an offered schedule or delivery commitment/);
  assert.doesNotMatch(output, /hello@|Contact us|published every Monday/);
  for (const item of fixtures.timelineWeeks) {
    assert.ok(output.includes(`${item.week}: ${item.phase}`));
    assert.ok(output.includes(`Sample milestone: ${item.milestone}`));
    for (const task of item.tasks) assert.ok(output.includes(`- ${task}`));
  }
});

test('editorial motion is scoped to desktop without reduced motion and cleans up', () => {
  let query, cleanup, reverted = 0, animated = 0;
  const section = {};
  const sandbox = {
    exports: {},
    require(id) {
      assert.equal(id, 'gsap');
      return { gsap: {
        matchMedia: () => ({
          add(condition, setup) { query = condition; cleanup = setup(); },
          revert() { cleanup(); reverted++; },
        }),
        context(setup, scope) {
          assert.equal(scope, section);
          setup();
          return { revert() { reverted++; } };
        },
      } };
    },
  };
  vm.runInNewContext(compile('src/lib/editorial-motion.ts'), sandbox);
  const dispose = sandbox.exports.withEditorialMotion(section, () => { animated++; });
  assert.equal(query, '(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  assert.equal(animated, 1);
  dispose();
  assert.equal(reverted, 2);
  const source = fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8');
  assert.equal((source.match(/withEditorialMotion\(section,/g) || []).length, 8);
  assert.doesNotMatch(source, /subRef|hello@homeconstruction\.site|Milestones published every Monday/);
});
