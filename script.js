
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.dropdown');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
      console.log('Menu toggle clicked, expanded:', !expanded); // Debug log
    });

 
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('show')) {
        nav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('show')) {
        nav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  const dropBtn = document.querySelector('.dropbtn');
  if (dropBtn && dropdown) {
    dropBtn.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 860px)').matches) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  }
});

const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));


const form = document.getElementById('contactForm');
const statusEl = document.querySelector('.form-status');

const validate = (el) => {
  const error = el.parentElement.querySelector('.error');
  if (el.validity.valid) {
    error.textContent = '';
    el.classList.remove('invalid');
    return true;
  } else {
    let msg = 'Udfyld venligst dette felt.';
    if (el.type === 'email') msg = 'Indtast en gyldig email.';
    error.textContent = msg;
    el.classList.add('invalid');
    return false;
  }
};

form?.querySelectorAll('input[required], textarea[required]').forEach(el => {
  el.addEventListener('blur', () => validate(el));
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const required = [...form.querySelectorAll('[required]')];
  const ok = required.every(validate);
  if (!ok) return;

 
  const recipientEmail = 'virksomhedmailwordpress@gmail.com'; 
  
  const data = Object.fromEntries(new FormData(form).entries());
  

  data.recipientEmail = recipientEmail;
  
  statusEl.textContent = 'Sender besked...';
  

  if (typeof emailjs !== 'undefined') {
    console.log('Sending email with data:', {
      to_email: recipientEmail,
      from_name: data.name || (data.firstName + ' ' + data.lastName),
      company: data.company || 'Ikke angivet',
      desiredDate: data.desiredDate || 'Ikke angivet',
      from_email: data.email,
      phone: data.phone || 'Ikke angivet',
      message: data.message
    });
    
    emailjs.send('service_msipssg', 'template_fc109gi', {
      to_email: recipientEmail,
      from_name: data.name || (data.firstName + ' ' + data.lastName),
      company: data.company || 'Ikke angivet',
      desiredDate: data.desiredDate || 'Ikke angivet',
      from_email: data.email,
      phone: data.phone || 'Ikke angivet',
      message: data.message
    }).then(function(response) {
      console.log('Email sendt!', response.status, response.text);
      statusEl.textContent = 'Tak for din besked! Vi vender tilbage snarest.';
      form.reset();
      setTimeout(()=> statusEl.textContent = '', 6000);
    }, function(error) {
      console.log('Email fejl detaljer:', error);
      statusEl.textContent = 'Der opstod en fejl. Prøv igen eller ring på 42261039.';
      setTimeout(()=> statusEl.textContent = '', 6000);
    });
  } else {
    
    console.log('Form data:', data);
    console.log('Sender til:', recipientEmail);
    statusEl.textContent = 'EmailJS ikke konfigureret. Se konsollen for form data.';
    setTimeout(()=> statusEl.textContent = '', 6000);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();


if (typeof emailjs !== 'undefined') {
  emailjs.init('vrLxseO2lWWDipJBZ'); 
}
