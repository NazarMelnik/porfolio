'use strict';
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const form = document.getElementById('send-form');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', (e) => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

window.onscroll = () => {
  sections.forEach((sect) => {
    let top = window.scrollY;
    let offset = sect.offsetTop - 150;
    let heigth = sect.offsetHeight;
    let id = sect.getAttribute('id');

    if (top >= offset && top < offset + heigth) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        document
          .querySelector('header nav a[href*=' + id + ']')
          .classList.add('active');
      });
    }
  });
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY < 100);

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });

ScrollReveal().reveal(
  '.home-img, .services-container, .portfolio-box, .form-contact',
  { origin: 'bottom' }
);
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'rigth' });

const typed = new Typed('.multiple-text', {
  strings: ['Frontend Developer', 'Administrator', 'Сryptoman'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

const validate = (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('input-name').value,
    phone: document.getElementById('input-phone').value,
    email: document.getElementById('input-email').value,
    message: document.getElementById('textarea').value
  };

  const nameRegex = /^[a-zA-Z-яА-Я\s]+$/;
  if (!nameRegex.test(formData.name)) {
    alert('Name should contain only letters');
    document.getElementById('input-name').focus();
    return false;
  }

  const phoneRegex = /^[0-9+\\s-]+$/
  if (!phoneRegex.test(formData.phone)) {
    alert('Invalid phone number');
    document.getElementById('input-phone').focus();
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._-]{5,}@[a-z]+\.[a-z]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Invalid email address');
    document.getElementById('input-email').focus();
    return false;
  }

  if (formData.message.split(' ').length < 2) {
    alert('Text should contain at least a couple of words');
    document.getElementById('textarea').focus();
    return false;
  }

  sendEmail(formData);
};

const sendEmail = async ({ name, phone, email, message }) => {
  try {
    const response = await fetch('https://fathomless-fortress-46555-b8dc4119fcb1.herokuapp.com/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        message: message
      })
    });
    if (response.ok) {
      alert('Email sent successfully');
      form.reset();
    } else {
      console.error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

form.addEventListener('submit', validate);

