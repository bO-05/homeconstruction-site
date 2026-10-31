import StudyInfoPage from '../components/StudyInfoPage';

export default function TermsPage() {
  return (
    <StudyInfoPage
      title="Prototype Usage Notice"
      intro="HomeConstruction is a fictional interface study, not an offer of construction services or a construction contract."
      sections={[
        { title: 'Illustrative content', text: 'Packages, prices, schedules, warranties, project descriptions, and review cards are demonstration content. They are not actual offers, completed customer work, verified endorsements, or evidence of licensing, bonding, or insurance.' },
        { title: 'No real transaction', text: 'The calculator produces illustrative totals only. Form previews do not create quotes, appointments, payments, deposits, financing, warranties, or agreements. No real availability or delivery commitment is represented.' },
        { title: 'Rights and provenance', text: 'This notice does not grant an application license or rights to third-party assets. Dependency notices must be preserved, and image and other asset rights require separate verification before reuse.' },
      ]}
    />
  );
}
