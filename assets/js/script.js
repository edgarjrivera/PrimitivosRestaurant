'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

/**
 * APERITIVOS, PLATO PRINCIPAL Y BEBIDAS BUTTON
 */
document.getElementById("aperitivosButton").addEventListener("click", function() {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal-content">
  <span class="close">&times;</span>
  <img src="./assets/images/modal-logo.svg" width="160" height="50" alt="Primitivos - inicio" class="modal-logo">
  <h2>Aperitivos:</h2>
  <br>
  <ul>
    <li>Sorullos (12) . . . . .  $6.95</li>
    <br>
    <li>Mozarella Sticks (12) . . . . .  $11.95</li>
    <br>
    <li>Queso Frito (12) . . . . .  $6.95</li>
    <br>
    <li>Cordon Bleu (12) . . . . .  $11.95</li>
    <br>
    <li>Egg Roll Langosta (12) . . . . .  $13.95</li>
    <br>
    <li>Salmorejo de Langosta (12) . . . . .  $13.95</li>
    <br>
    <li>Masita de Pescado (12) . . . . .  $11.95</li>
    <br>
    <li>Sopa de Queso Gouda y Piquillo (12) . . . . .  $6.95</li>
    <br>
  </ul>
</div>
  `;
  document.body.appendChild(modal);

  var closeButton = modal.querySelector(".close");
  closeButton.addEventListener("click", function() {
    document.body.removeChild(modal);
  });
});

document.getElementById("comidaButton").addEventListener("click", function() {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal-content">
  <span class="close">&times;</span>
  <img src="./assets/images/modal-logo.svg" width="160" height="50" alt="Primitivos - inicio" class="modal-logo">
  <h2>Platos Principales:</h2>
  <br>
  <ul>
    <li>Sorullos (12) . . . . .  $6.95</li>
    <br>
    <li>Mozarella Sticks (12) . . . . .  $11.95</li>
    <br>
    <li>Queso Frito (12) . . . . .  $6.95</li>
    <br>
    <li>Cordon Bleu (12) . . . . .  $11.95</li>
    <br>
    <li>Egg Roll Langosta (12) . . . . .  $13.95</li>
    <br>
    <li>Salmorejo de Langosta (12) . . . . .  $13.95</li>
    <br>
    <li>Masita de Pescado (12) . . . . .  $11.95</li>
    <br>
    <li>Sopa de Queso Gouda y Piquillo (12) . . . . .  $6.95</li>
    <br>
  </ul>
</div>
  `;
  document.body.appendChild(modal);

  var closeButton = modal.querySelector(".close");
  closeButton.addEventListener("click", function() {
    document.body.removeChild(modal);
  });
});

document.getElementById("bebidasButton").addEventListener("click", function() {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal-content">
  <span class="close">&times;</span>
  <img src="./assets/images/modal-logo.svg" width="160" height="50" alt="Primitivos - inicio" class="modal-logo">
  <h2>Bebidas:</h2>
  <br>
  <ul>
    <li>Sorullos (12) . . . . .  $6.95</li>
    <br>
    <li>Mozarella Sticks (12) . . . . .  $11.95</li>
    <br>
    <li>Queso Frito (12) . . . . .  $6.95</li>
    <br>
    <li>Cordon Bleu (12) . . . . .  $11.95</li>
    <br>
    <li>Egg Roll Langosta (12) . . . . .  $13.95</li>
    <br>
    <li>Salmorejo de Langosta (12) . . . . .  $13.95</li>
    <br>
    <li>Masita de Pescado (12) . . . . .  $11.95</li>
    <br>
    <li>Sopa de Queso Gouda y Piquillo (12) . . . . .  $6.95</li>
    <br>
  </ul>
</div>
  `;
  document.body.appendChild(modal);

  var closeButton = modal.querySelector(".close");
  closeButton.addEventListener("click", function() {
    document.body.removeChild(modal);
  });
});