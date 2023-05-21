//-----functions that remove & add browser scrollbar-----//

const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
export let unlock = true;

export function bodyLock() {
   const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
   if (lockPaddingValue.length > 0) {
      for (let element of lockPadding) {
         element.style.paddingRight = lockPaddingValue
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
      unlock = true
};

export function bodyUnlock (paddingElement) {
      if (lockPadding.length > 0) {
         for (let element of lockPadding) {
            element.style.paddingRight = paddingElement;
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
      unlock = false;
      unlock = true
};


export const addPadding = (htmlElem) => {
   const htmlElemPadding = parseInt((window.getComputedStyle(htmlElem).paddingRight), 10)
   const scrollBarWidth = window.innerWidth - body.offsetWidth;
   const totalPadding = scrollBarWidth + htmlElemPadding + 'px';
   htmlElem.style.paddingRight = totalPadding;
};


export const removePadding = (htmlElem, initialPadding) => {
   htmlElem.style.paddingRight = initialPadding;
}