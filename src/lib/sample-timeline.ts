import { timelineWeeks } from '../data/content';

export function getSampleTimelineText() {
  return [
    'HOME CONSTRUCTION - FICTIONAL TIMELINE EXAMPLE',
    'Interface study only. Not an offered schedule or delivery commitment.',
    '',
    ...timelineWeeks.flatMap(item => [
      `${item.week}: ${item.phase}`,
      ...item.tasks.map(task => `- ${task}`),
      `Sample milestone: ${item.milestone}`,
      '',
    ]),
    'No construction service, contact channel, or publishing workflow is connected.',
  ].join('\n');
}
