import StudyInfoPage from '../components/StudyInfoPage';

export default function PrivacyPage() {
  return (
    <StudyInfoPage
      title="Prototype Privacy Notes"
      intro="This fictional interface is not an operating construction service. These notes describe the prototype, not an invented business privacy policy."
      sections={[
        { title: 'Local form previews', text: 'The contact, quote, and call-planner handlers do not send messages, request quotes, create bookings, or send email. Entered values are held in page memory for the preview. Use sample details only, not personal or confidential information.' },
        { title: 'Browser and hosting requests', text: 'Loading the site requests assets from its host and may request Google Fonts. Hosting and network providers may process ordinary request information. Their actual logs, retention, and account settings have not been independently verified here.' },
        { title: 'No connected business channels', text: 'The displayed contact placeholders do not connect to a business inbox, telephone, office, or social account. This prototype does not establish a customer relationship or enroll anyone in marketing.' },
      ]}
    />
  );
}
