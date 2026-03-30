function updateContactResponse(text, type) {
  const response = document.getElementById('contact-response');
  if (!response) {
    return;
  }

  response.textContent = text;
  response.className = `message ${type}`;
}

function sendMessage() {
  const name = document.getElementById('name')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const subject = document.getElementById('subject')?.value.trim() || 'Cupboard quote request';
  const message = document.getElementById('message')?.value.trim() || '';
  const date = document.getElementById('date')?.value || 'Not selected';
  const time = document.getElementById('time')?.value || 'Not selected';

  if (!name || !email || !message) {
    updateContactResponse('Please complete your name, email, and project details first.', 'error');
    return;
  }

  const enquiry = [
    `Hello Sir Daniel, my name is ${name}.`,
    `Email: ${email}`,
    `Project: ${subject}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time}`,
    `Details: ${message}`
  ].join('\n');

  updateContactResponse('Your WhatsApp enquiry is ready to send.', 'success');

  if (typeof window.open === 'function') {
    window.open(`https://wa.me/27813421958?text=${encodeURIComponent(enquiry)}`, '_blank');
  }
}

window.sendMessage = sendMessage;