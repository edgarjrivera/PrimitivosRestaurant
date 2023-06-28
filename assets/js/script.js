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
  <img src="./assets/images/modal-logo.svg" width="250" height="50" alt="Primitivos - inicio" class="modal-logo">
  <h2>Aperitivos:</h2>
  <br>
  <ul class="modalMenuItemsStyle">
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
        <p>- Acompañado con chips de malanga</p>
    <br>
    <li>Masita de Pescado (12) . . . . .  $11.95</li>
    <br>
    <li>Sopa de Queso Gouda y Piquillo Rostizado . . . . .  $6.95</li>
        <p>- Acompañada de pan focaccia de tomate</p>
    <br>
    <li>Croquetas Trio (6) . . . . $11.95</li>
    <br>
    <li>Croquetas Jamón Serano (6) . . . . $11.95</li>
    <br>
    <li>Croquetas Queso Gouda (6) . . . . $11.95</li>
    <br>
    <li>Croquetas Manchego (6) . . . . $11.95</li>
    <br>
    <li>Ceviche . . . . $11.95</li>
        <p>- Acompañado con chips de malanga</p>
    <br>
    <li>Coctel de Pulpo . . . . $13.95</li>
        <p>- Acompañado con chips de malanga</p>
    <br>
    <li>Coctel de Camarones . . . . $11.95</li>
    <br>
    <li>Chorizo al Vino . . . . $11.95</li>
    <br>
    <li>Cortes Frios . . . . $11.95</li>
    <br>
    <li>Surtido (20) . . . . $19.95</li>
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
  <img src="./assets/images/modal-logo.svg" width="250" height="50" alt="Primitivos - inicio" class="modal-logo">
  <h2>Platos Principales:</h2>
  <br>
  <h3 class="modalMenuTittle">Carnes / Meats<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Churrasco / Skirt Steak 12oz . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Filete Mignon / Filet Mignon 9oz . . . . .  $25.95</li>
    <br>
    <li class="modalMenuFood">Osso Bucco de Cerdo / Pork Osso Bucco 20oz. . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Ribeye 1lb . . . . .  $27.95</li>
    <br>
    <li class="modalMenuFood">Picanha 1lb . . . . .  $24.95</li>
    <br>
    <li class="modalMenuFood">Tomahawk . . . . .  $54.95</li>
    <br>
    <li class="modalMenuFood">Rack de Cordero / Lamb Rack . . . . .  $29.95</li>
    <br>
    <li class="subList">Salsas / Sauces:
        <ul class="subListItems">
          <li>- Chimmichurri</li>
          <li>- Vino Tinto / Red Wine</li>
          <li>- Chimi Butter</li>
          <li>- Zetas / Mushrooms</li>
          <li>- Crema de Ajo / Garlic Cream</li>
        </ul>
      </li>
    <br>
    <li class="subList">Agregar Mariscos:
        <ul class="subListItems">
          <li>- Camarones / Shrimps $12.95</li>
          <li>- Pulpo / Octopus $12.95</li>
          <li>- Langosta / Lobster $12.95</li>
          <li>- Mixto / Sea Food Mix $12.95</li>
        </ul>
      </li>
  </ul>
  <h3 class="modalMenuTittle">Mariscos / Sea Food<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Salmon 8oz . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Dorado / Mahi Mahi 8oz . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Filete de Chillo / Red Snapper Filet 12oz. . . . .  $21.95</li>
    <br>
    <li class="modalMenuFood">Rodaballo / Turbot 8oz . . . . .  $27.95</li>
    <br>
    <li class="modalMenuFood">Camarones / Shrimp . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Ensalada de Pulpo / Octopus . . . . .  $24.95</li>
    <br>
    <li class="modalMenuFood">Filete de Mero / Grouper Filet. . . . .  $17.95</li>
    <br>
    <li class="subList">Salsas / Sauces:
        <ul class="subListItems">
          <li>- Entomatado(criolla) / Tomato</li>
          <li>- Mantequilla / Butter</li>
          <li>- Crema de Ajo / Garlic Cream</li>
        </ul>
      </li>
    <br>
  </ul>
  <h3 class="modalMenuTittle">Aves / Birds<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Pechuga / Chricken . . . . .  $14.95</li>
    <br>
    <li class="modalMenuFood">Pechuga Milanesa / Chicken Milanese . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Codorniz Asada / Roast Quail. . . . .  $21.95</li>
    <br>
    <li class="subList">Salsas / Sauces:
        <ul class="subListItems">
          <li>- Entomatado(criolla) / Tomato</li>
          <li>- Mantequilla / Butter</li>
          <li>- Crema de Ajo / Garlic Cream</li>
        </ul>
      </li>
    <br>
  </ul>
  <h3 class="modalMenuTittle">Sopas / Soups<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Asopao de Pollo / Chciken Soup  . . . . .  $14.95</li>
    <br>
    <li class="modalMenuFood">Asopao de Camarones / Shrimp Soup . . . . .  $20.95</li>
    <br>
    <li class="modalMenuFood">Asopao de Langosta / Lobster Soup . . . . .  $27.95</li>
    <br>
    <li class="modalMenuFood">Asopao de Pulpo / Octopus Soup . . . . .  $23.95</li>
    <br>
    <li class="modalMenuFood">Asopao de Mariscos / Sea Food Soup . . . . .  $27.95</li>
    <br>
    <li class="subList">Salsas / Sauces:
        <ul class="subListItems">
          <li>- Entomatado(criolla) / Tomato</li>
          <li>- Mantequilla / Butter</li>
          <li>- Crema de Ajo / Garlic Cream</li>
        </ul>
      </li>
    <br>
  </ul>
  <h3 class="modalMenuTittle">Mofongos Rellenos / Stuffed Platains<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Churrasco   . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Pollo / Chicken . . . . .  $14.95</li>
    <br>
    <li class="modalMenuFood">Pescado / Fish . . . . .  $19.95</li>
    <br>
    <li class="modalMenuFood">Camarones / Shrimp . . . . .  $20.95</li>
    <br>
    <li class="modalMenuFood">Langosta / Lobster . . . . .  $27.95</li>
    <br>
    <li class="modalMenuFood">Pulpo / Octopus. . . . .  $23.95</li>
    <br>
    <li class="modalMenuFood">Mariscos / Sea Food. . . . .  $27.95</li>
    <br>
    <li class="subList">Salsas / Sauces:
        <ul class="subListItems">
          <li>- Entomatado(criolla) / Tomato</li>
          <li>- Mantequilla / Butter</li>
          <li>- Crema de Ajo / Garlic Cream</li>
          <li>- Chimmichurri</li>
          <li>- Zetas / Mushrooms</li>
        </ul>
      </li>
    <br>
  </ul>
  <h3 class="modalMenuTittle">Pizza<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Queso / Cheese   . . . . .  $18.00</li>
    <br>
    <li class="modalMenuFood">Suprema / Supreme . . . . .  $25.00</li>
    <br>
    <li class="modalMenuFood">Pizza de Coliflor / Coliflour . . . . .  $12.00</li>
    <br>
    <li class="subList">Ingredientes / Ingredients:
        <ul class="subListItems">
          <li>- Bacon $2.00</li>
          <li>- Pepperoni $2.00</li>
          <li>- Chorizo $2.00</li>
          <li>- Salchicha Italiana / Italian Sausage $2.00</li>
          <li>- Vegetales / Vegetables $2.00</li>
          <ul class="subListItems">
            <li>• Cebolla / Onions $0.95</li>
            <li>• Pimientos / Peppers $0.95</li>
            <li>• Zetas / Mushrooms $0.95</li>
            <li>• Jalapeños $0.95</li>
          </ul>
          <p>***Cada Ingrediente extra se le añade aparte</p>
        </ul>
    <br>
    <li class="subList">Salsas / Sauces:
        <ul class="subListItems">
          <li>- Tomate / Tomato</li>
          <li>- Queso (blanca) / Cheese (white)</li>
        </ul>
      </li>
    <br>
  </ul>
  <h3 class="modalMenuTittle">Kids Menu<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Tiritas de pollo / Chicken Strips  . . . . .  $11.95</li>
    <br>
    <li class="modalMenuFood">Mini Cordon Bleu  . . . . .  $11.95</li>
    <br>
    <li class="modalMenuFood">Tiritas de Churrasco / Skirt Steak Strips . . . . .  $14.95</li>
    <br>
    <li class="modalMenuFood">Pechuga / Chicken Breast . . . . .  $11.95</li>
    <br>
  </ul>
  <h3 class="modalMenuTittle">Acompañantes / Sides<h3>
  <ul class="modalMenuItems">
    <li class="modalMenuFood">Arroz Primitivo  . . . . .  $3.95</li>
    <ul class="subListItems">
          <li>- Mamposteado de Habichuelas Rosadas / with Pink Bean</li>
          <li>- Mamposteado de Habichuelas Blanca / with White Bean</li>
          <li>- Mamposteado de Ganfules / with Green Peas</li>
        </ul>
    <br>
    <li class="modalMenuFood">Ensalada Verde / Green Salad . . . . .  $2.95</li>
    <br>
    <li class="modalMenuFood">Tostones / Fried Platains . . . . .  $3.95</li>
    <br>
    <li class="modalMenuFood">Tostones de Pana / Fried Breadfruit . . . . .  $3.95</li>
    <br>
    <li class="modalMenuFood">Amarillo / Sweet Platains  . . . . .  $2.95</li>
    <br>
    <li class="modalMenuFood">Papas Fritas / French Fries . . . . .  $3.95</li>
    <br>
    <li class="modalMenuFood">Arroz Blanco con Habichuelas / Rice and Beans . . . . .  $3.95</li>
    <br>
    <li class="modalMenuFood">Mofongo / Smashed Platain  . . . . .  $3.95</li>
    <br>
    <li class="modalMenuFood">Majado Malanga / Smashed Roots . . . . .  $3.95</li>
    <br>
    <li class="modalMenuFood">Pasta . . . . .  $4.95</li>
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

document.getElementById("postresButton").addEventListener("click", function() {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal-content">
  <span class="close">&times;</span>
  <img src="./assets/images/modal-logo.svg" width="250" height="50" alt="Primitivos - inicio" class="modal-logo">
  <h2>Postres:</h2>
  <br>
  <ul class="modalMenuItemsStyle">
    <li>Creme Brulee . . . . .  $6.95</li>
    <br>
    <li>Creme Brulee Cafe . . . . .  $6.95</li>
    <br>
    <li>Cheesecake Dulce de Leche . . . . .  $6.95</li>
    <br>
    <li>Coppa Chocolate . . . . .  $6.95</li>
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

/**Publicacion FACEBOOK
 
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '100093666367694', // Reemplaza con tu ID de aplicación de Facebook
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v12.0'
    });
  };

  function loadFacebookPost() {
    var accessToken = 'TU_ACCESS_TOKEN'; // Reemplaza con tu token de acceso válido
    var postId = '118332984632247'; // Reemplaza con el ID de la última publicación de Facebook

    FB.api(
      '/' + postId,
      { access_token: accessToken, fields: 'permalink_url' },
      function(response) {
        if (response && !response.error) {
          var postContainer = document.getElementById('facebook-post-container');
          postContainer.innerHTML = '<div class="fb-post" data-href="' + response.permalink_url + '" data-show-text="true"></div>';
          FB.XFBML.parse(postContainer);
        }
      }
    );
  }

  setInterval(loadFacebookPost, 60000); // Actualiza cada 60 segundos (ajusta según tus necesidades)
</script>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v12.0&appId=100093666367694&autoLogAppEvents=1" nonce="UN_VALOR_UNICO"></script>

*/