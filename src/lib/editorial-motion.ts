import { gsap } from 'gsap';

export function withEditorialMotion(section: Element, animate: () => void) {
  const media = gsap.matchMedia();
  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(animate, section);
    return () => context.revert();
  });
  return () => media.revert();
}
