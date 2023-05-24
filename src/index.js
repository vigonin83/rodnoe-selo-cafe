import './index.html'
import './index.scss'
import { popupOpen, popupClose } from './js/popup.js'
import { addPadding, removePadding, goToTop } from './js/utils.js'
import Swiper, { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

//------ variables ------//

const header = document.querySelector('.header')
const mainTitle = document.querySelector('.cafe-presentation__title')
const mainContent = document.querySelector('.cafe-presentation__content')
const upTitle = document.querySelector('.cafe-presentation__uptitle')
const initialPadding = window.getComputedStyle(header).paddingRight
const menuBurgerBtn = document.querySelector('.menu-burger__btn')
const menuBurger = document.querySelector('.menu-burger')
let closedBurgerMenu = true
const popupLinks = document.querySelectorAll('.popup-link')
const popupCloseBtns = document.querySelectorAll('.popup--close')

//----- variables ------//

//----- activate slider swiper -----//

const swiper = new Swiper('.swiper', {
	modules: [Navigation],
	direction: 'horizontal',
	loop: true,
	slidesPerView: 1,
	spaceBetween: 20,
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})
//----- activate slider swiper -----//

//----- go to top button -----//

document.addEventListener('scroll', goToTop)

//----- go to top button -----//

// -----html element apperiance -------//

setTimeout(() => {
	mainTitle.classList.add('__active')
	mainContent.classList.add('__active')
	upTitle.classList.add('__active')
}, 300)

// ----- element apperiance -------//

// toggle burgerMenu //
const toggleBurgerMenu = () => {
	menuBurger.classList.toggle('menu--open')
	if (menuBurger.classList.contains('menu--open')) {
		!closedBurgerMenu
		addPadding(header)
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'auto'
		removePadding(header, initialPadding)
	}
}

menuBurgerBtn.addEventListener('click', toggleBurgerMenu)

//-----popUps handling-----//

document.addEventListener('click', ({ target }) => {
	const isClosest = target.closest('.menu-burger')
	if (isClosest && menuBurger.classList.contains('menu--open')) {
		menuBurger.classList.remove('menu--open')
		document.body.style.overflow = 'auto'
		removePadding(header, initialPadding)
	}
})

if (popupLinks.length > 0) {
	for (let linkBtn of popupLinks) {
		linkBtn.addEventListener('click', e => {
			const popupName = linkBtn.getAttribute('href').replace('#', '')
			const currentPopup = document.getElementById(popupName)
			popupOpen(currentPopup)
			e.preventDefault()
		})
	}
}

if (popupCloseBtns.length > 0) {
	for (let closeBtn of popupCloseBtns) {
		closeBtn.addEventListener('click', e => {
			popupClose(closeBtn.closest('.popup'))
			e.preventDefault()
		})
	}
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.popup--open')
		popupClose(popupActive)
	}
})
