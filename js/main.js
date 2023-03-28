"use strict";
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", (e) => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

window.onscroll = () => {
  sections.forEach((sect) => {
    let top = window.scrollY;
    let offset = sect.offsetTop - 150;
    let heigth = sect.offsetHeight;
    let id = sect.getAttribute("id");

    if (top >= offset && top < offset + heigth) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY < 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });

ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .form-contact",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "rigth" });

const typed = new Typed(".multiple-text", {
  strings: ["Frontend Developer", "Administrator", "Сryptoman"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
