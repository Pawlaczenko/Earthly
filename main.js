const navElement = document.querySelector('.navigation');
const messageElement = document.querySelector('.contact__textarea');
const wordsCounter = document.querySelector('.contact__counter-words');
const formButton = document.querySelector('.contact__button');

const detachedNavClass = "navigation--detached";

const stickNavigation = (e) => {
    let yPos = window.pageYOffset;
    if (yPos > 0 && !navElement.classList.contains(detachedNavClass)) {
        navElement.classList.add(detachedNavClass);
    } else if (yPos === 0) {
        navElement.classList.remove(detachedNavClass);
    }
}

const disableButton = (words) => {
    formButton.disabled = (words > 200);
}

const countWords = (e) => {
    let words = e.target.value.length;
    wordsCounter.innerHTML = words;

    let color = 'black';

    if (words > 190 && words <= 200) {
        color = "orange";
    } else if (words > 200) {
        color = "red";
    } else {
        color = "black";
    }
    disableButton(words);
    wordsCounter.parentElement.style.color = color;
}

window.addEventListener('scroll', stickNavigation);
messageElement.addEventListener('input', countWords);