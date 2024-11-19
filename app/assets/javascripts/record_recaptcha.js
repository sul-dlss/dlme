// This is the recaptcha submit handler for the record feedback modal.
// Normally this is inline, but the Blacklight modal filters out inline scripts.
// See: app/views/record_feedback/new.html.erb
document.addEventListener('show.blacklight.blacklight-modal', () => {
  const form = document.forms.record_new_contact_form;
  if (!form || form.dataset.recaptchaInitialized) return;

  form.dataset.recaptchaInitialized = 'true';
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (typeof grecaptcha !== 'undefined' && grecaptcha) {
      const response = await grecaptcha.execute(this.dataset.recaptchaSiteKey, { action: 'record_feedback' });
      const element = document.getElementById('g-recaptcha-response-data-record-feedback');
      if (element) element.value = response;
    }
    this.submit();
  });
});