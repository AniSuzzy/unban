// Templates map
const TEMPLATES = {
  V1: `Dear WhatsApp Support,

My number {NUMBER} has been permanently banned, and I strongly believe this may be a mistake or an automated action. I respectfully request a detailed review of my account and activity.

I always strive to follow WhatsApp's Terms of Service and community guidelines. If any issues were caused unintentionally, I assure you it was not with malicious intent, and I am ready to correct any mistakes.

Please consider reinstating my number. I truly rely on WhatsApp for personal and professional communication. Your assistance would mean a lot.

Thank you for your time and understanding.

Best regards.`,
  V2: `I acknowledge mistakes on number {NUMBER}. Requesting a final opportunity and committing to policy adherence.`,
  V3: `Please unban my number {NUMBER}. I take full responsibility and seek one final chance to use WhatsApp responsibly.`,
  V4: `This is a request to reconsider the permanent ban on my number {NUMBER}. I assure compliance in the future.`,
  V5: `My number {NUMBER} is permanently banned. I deeply regret any violation. Kindly give me one more opportunity.`,
  V6: `Dear WhatsApp Support, I humbly request a second chance for my number {NUMBER}. I understand the policies and promise to follow all rules henceforth.`,
  V7: `Please reactivate my number because I didn't violate any WhatsApp rules, suddenly my number was banned, please reactivate this number: {NUMBER}`,
  V8: `Hallo WhatsApp-Team, ich möchte eine Beschwerde bezüglich meines gesperrten WhatsApp-Kontos einreichen. Ich habe große Schwierigkeiten, weil ich nicht auf mein WhatsApp-Konto zugreifen kann, obwohl ich diese Anwendung schon lange verwende und die von WhatsApp bereitgestellten Nutzungsbedingungen verstehe. Als ich versuchte, die WhatsApp-Anwendung zu öffnen, erhielt ich eine Nachricht, dass mein Konto gesperrt wurde. Ich bin sehr überrascht und verstehe nicht, warum dies geschieht, da ich glaube, dass ich keinen Verstoß gegen die von WhatsApp bereitgestellten Nutzungsbedingungen begangen habe. Ich brauche dringend wieder Zugriff auf mein Konto, da ich auf WhatsApp angewiesen bin, um mit meiner Familie, Freunden und Kollegen zu kommunizieren. Bitte helfen Sie mir, mein WhatsApp-Konto oder meine WhatsApp-Nummer {NUMBER} zu entsperren. Vielen Dank für Ihre Aufmerksamkeit.`,
  V9: `Hello Mark Zuckerberg and others, I think you made a mistake and banned me by mistake. I’m a loyal person. Will you please unban me again? I’m a verified user on WhatsApp without any problems. Review my ban and unban me as soon as possible. The Number is {NUMBER}.`,
  V10: `Hi, I’m a verified user on WhatsApp but my account was banned. Maybe I did something wrong or violated your WhatsApp terms without knowing and I’m sorry. As a verified user, I can’t talk to my customers or family since I was banned. Please review this ban and unban me as soon as possible. My customers and relatives are waiting for me. My phone number is {NUMBER}. Yours sincerely, [Your Name].`,
  V11: `Urgent: Wrongful Ban of My WhatsApp Account - Request for Review and Reinstatement
Dear WhatsApp Support Team, I am writing to express my distress and disappointment upon discovering that my WhatsApp account has been banned without any justification. I strongly believe that my account has been mistakenly banned due to false reports from malicious individuals. I have always used the official WhatsApp application and never engaged in any violations. Please help reinstate my account urgently. My number: {NUMBER}.`,
  V12: `I'm from Twitter Manager, and my WhatsApp account {NUMBER} is unlawfully blocked. I have not committed any violation against WhatsApp terms of service. Please review this urgently.`,
  V13: `Il mio numero è nuovo, e con quello ho appena aperto il settore e in questo gruppo ho davvero bisogno del mio account. Non violo alcuna regola dell'informativa sulla privacy, quindi chiedo al team di supporto di WhatsApp di agire il prima possibile in modo che io possa avere accesso al materiale dal mio gruppo. Il mio numero è {NUMBER}.`,
  V14: `Meu número é novo, e com isso acabei de abrir a indústria e neste grupo preciso muito da minha conta. Não estou infringindo nenhuma regra da política de privacidade, por isso solicito à equipe de suporte do WhatsApp que tome providências o mais rápido possível para que eu possa ter acesso ao material do meu grupo. Meu número é {NUMBER}.`,
};

const form = document.getElementById('unbanForm');
const numberInput = document.getElementById('number');
const versionSelect = document.getElementById('version');
const subjectInput = document.getElementById('subject');
const preview = document.getElementById('preview');
const openBtn = document.getElementById('openGmail');
const copyBtn = document.getElementById('copyMsg');
const mailtoLink = document.getElementById('mailtoLink');
const clearBtn = document.getElementById('clearBtn');
const expandBtn = document.getElementById('expandPreview');

function sanitizeNumber(raw){
  // Keep + and digits, remove spaces/dashes
  let n = raw.replace(/[^\d+]/g, '');
  // Ensure only one leading +
  if(n.startsWith('++')) n = n.replace(/^\++/,'+');
  return n;
}
function buildBody(){
  const raw = sanitizeNumber(numberInput.value.trim());
  const version = versionSelect.value || 'V1';
  const tmpl = TEMPLATES[version] || TEMPLATES['V1'];
  return tmpl.replaceAll('{NUMBER}', raw || '{NUMBER}');
}
function refresh(){
  const body = buildBody();
  preview.value = body;
  const subject = subjectInput.value.trim() || 'Appeal: Request to Review Ban';
  // mailto fallback
  const mailto = `mailto:support@support.whatsapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  mailtoLink.href = mailto;
}

openBtn.addEventListener('click', () => {
  const n = sanitizeNumber(numberInput.value.trim());
  if(!n){
    numberInput.focus();
    numberInput.setCustomValidity('Please enter your phone number with country code.');
    numberInput.reportValidity();
    return;
  }
  const subject = subjectInput.value.trim() || 'Appeal: Request to Review Ban';
  const body = buildBody();
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=support@support.whatsapp.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(url, '_blank', 'noopener');
});

copyBtn.addEventListener('click', async () => {
  const body = buildBody();
  try{
    await navigator.clipboard.writeText(body);
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=> copyBtn.textContent='Copy Message', 1500);
  }catch(e){
    alert('Could not copy. Please copy manually from the preview.');
  }
});

[versionSelect, subjectInput, numberInput].forEach(el => el.addEventListener('input', refresh));
clearBtn.addEventListener('click', () => { numberInput.value=''; refresh(); numberInput.focus(); });

expandBtn.addEventListener('click', () => {
  const ta = preview;
  if(ta.style.maxHeight === '70vh'){
    ta.style.maxHeight = '400px';
    expandBtn.textContent = 'Expand';
  }else{
    ta.style.maxHeight = '70vh';
    expandBtn.textContent = 'Collapse';
  }
});

// init
refresh();
