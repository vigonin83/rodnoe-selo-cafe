import { bodyLock, bodyUnlock, unlock } from './utils.js'

//-----functions that open & close popUps-----//

export function popupOpen(currentPopup) {
   if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup__form.popup--open')
      if (popupActive) {
         popupClose(popupActive, false)
      } else {
         bodyLock();
      }
      currentPopup.classList.add('popup--open');
      currentPopup.addEventListener('click', (e) => {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'))
         }
      })
   }
}
export function popupClose (popupActive, makeUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('popup--open');
      if (makeUnlock) {
         bodyUnlock()
      }
   }
}