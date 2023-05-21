import './index.html';
import './index.scss';
import { popupOpen, popupClose } from './js/popup.js';
import { addPadding, removePadding, goToTop } from './js/utils.js';
import Swiper from 'swiper';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
   direction: 'horizontal',
   loop: true,
   // If we need pagination
   pagination: {
      el: '.swiper-pagination',
   },
   // Navigation arrows
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.swiper-scrollbar',
   }
})

const header = document.querySelector('.header');
const initialPadding = window.getComputedStyle(header).paddingRight;
const menuBurgerBtn = document.querySelector('.menu-burger__btn');
const menuBurger = document.querySelector('.menu-burger');
let closedBurgerMenu = true;


document.addEventListener('scroll', goToTop);


// toggle burgerMenu //
const toggleBurgerMenu = () => {
   menuBurger.classList.toggle('menu--open');
   if (menuBurger.classList.contains('menu--open')) {
      !closedBurgerMenu;
      addPadding(header);
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
      removePadding(header, initialPadding);
   }
};

menuBurgerBtn.addEventListener('click', toggleBurgerMenu);


//-----popUps handling-----//

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseBtns = document.querySelectorAll('.popup--close');


document.addEventListener('click', ({target}) => {
   const isClosest = target.closest(".menu-burger");
   console.log(isClosest);
   if (isClosest && menuBurger.classList.contains('menu--open')) {
      menuBurger.classList.remove('menu--open');
      document.body.style.overflow = 'auto';
      removePadding(header, initialPadding);
   }

});

if (popupLinks.length > 0) {
   for (let linkBtn of popupLinks) {
      linkBtn.addEventListener('click', (e) => {
         const popupName = linkBtn.getAttribute('href').replace('#', '');
         const currentPopup = document.getElementById(popupName);
         popupOpen(currentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseBtns.length > 0) {
   for (let closeBtn of popupCloseBtns) {
      closeBtn.addEventListener('click', (e) => {
         popupClose(closeBtn.closest('.popup'));
         e.preventDefault();
      });
   }
}

document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape') {
      const popupActive = document.querySelector('.popup.popup--open');
      popupClose(popupActive);
   }
});