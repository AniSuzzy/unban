const templates = {
  1: { subject: "Account Review Request V1", body: `Dear WhatsApp Support,\n\nMy number {NUMBER} has been permanently banned, and I strongly believe this may be a mistake or an automated action. I respectfully request a detailed review of my account and activity.\n\nI always strive to follow WhatsApp's Terms of Service and community guidelines. If any issues were caused unintentionally, I assure you it was not with malicious intent, and I am ready to correct any mistakes.\n\nPlease consider reinstating my number. I truly rely on WhatsApp for personal and professional communication. Your assistance would mean a lot.\n\nThank you for your time and understanding.\n\nBest regards.` },
  2: { subject: "Request for Final Opportunity V2", body: `I acknowledge mistakes on number {NUMBER}. Requesting a final opportunity and committing to policy adherence.` },
  3: { subject: "Appeal for Reinstatement V3", body: `Please unban my number {NUMBER}. I take full responsibility and seek one final chance to use WhatsApp responsibly.` },
  4: { subject: "Reconsideration Request V4", body: `This is a request to reconsider the permanent ban on my number {NUMBER}. I assure compliance in the future.` },
  5: { subject: "Apology and Request V5", body: `My number {NUMBER} is permanently banned. I deeply regret any violation. Kindly give me one more opportunity.` },
  6: { subject: "Second Chance Request V6", body: `Dear WhatsApp Support, I humbly request a second chance for my number {NUMBER}. I understand the policies and promise to follow all rules henceforth.` },
  7: { subject: "Wrongful Ban Appeal V7", body: `Please reactivate my number because I didn't violate any WhatsApp rules, suddenly my number was banned, please reactivate this number: {NUMBER}` },
  8: { subject: "Beschwerde über Kontosperre V8", body: `Hallo WhatsApp-Team, ... {NUMBER}` },
  9: { subject: "Mistaken Ban Appeal V9", body: `Hello Mark Zuckerberg and others, ... The Number is {NUMBER}.` },
  10: { subject: "Verified User Appeal V10", body: `Hi, I’m a verified user ... My phone number is {NUMBER}.` },
  11: { subject: "Urgent Ban Review V11", body: `Urgent: Wrongful Ban of My WhatsApp Account ... My number: {NUMBER}.` },
  12: { subject: "Unlawful Block Review V12", body: `I'm from Twitter Manager ... my WhatsApp account {NUMBER} is unlawfully blocked.` },
  13: { subject: "Richiesta di Revisione V13", body: `Il mio numero è nuovo ... Il mio numero è {NUMBER}.` },
  14: { subject: "Solicitação de Revisão V14", body: `Meu número é novo ... Meu número é {NUMBER}.` }
};

function sendEmail(method) {
  const number = document.getElementById('number').value.trim();
  const version = document.getElementById('version').value;
  if (!number) {
    alert("Please enter your number");
    return;
  }

  const template = templates[version];
  const subject = template.subject;
  const body = template.body.replace(/{NUMBER}/g, number);

  if (method === 'app') {
    window.location.href = `mailto:support@support.whatsapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=support@support.whatsapp.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  }
}
