import './index.html'
import './index.scss'
import { popupOpen, popupClose } from './js/popup.js';
import { addPadding, removePadding } from './js/utils.js';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const initialPadding = window.getComputedStyle(header).paddingRight;
const menuBurgerBtn = document.querySelector('.menu-burger__btn');
const menuBurger = document.querySelector('.menu-burger');
let closedBurgerMenu = true;

// toggle burgerMenu //
const toggleBurgerMenu = () => {
   menuBurger.classList.toggle('menu--open')
   if (menuBurger.classList.contains('menu--open')) {
      !closedBurgerMenu
      addPadding(header)
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
      removePadding(header, initialPadding)
   }
}

menuBurgerBtn.addEventListener('click', toggleBurgerMenu)

//-----popUps handling-----//

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseBtns = document.querySelectorAll('.popup--close');

if (popupLinks.length > 0) {
   for (let linkBtn of popupLinks) {
      linkBtn.addEventListener('click', (e) => {
         const popupName = linkBtn.getAttribute('href').replace('#', '');
         const currentPopup = document.getElementById(popupName);
         popupOpen(currentPopup);
         e.preventDefault();
      })
   }
}

if (popupCloseBtns.length > 0) {
   for (let closeBtn of popupCloseBtns) {
      closeBtn.addEventListener('click', (e) => {
         popupClose(closeBtn.closest('.popup'))
         e.preventDefault()
      })
   }
}

document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape') {
      const popupActive = document.querySelector('.popup.popup--open');
      popupClose(popupActive);
   }
})