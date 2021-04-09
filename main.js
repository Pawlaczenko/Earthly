const navElement = document.querySelector('.navigation');
const messageElement = document.querySelector('.contact__textarea');
const wordsCounter = document.querySelector('.contact__counter-words');
const formButton = document.querySelector('.contact__button');
const tipsContainer = document.querySelector('.tips__container');

const detachedNavClass = "navigation--detached";
const tips = {
    'tip--1': ["Turn the water off when brushing your teeth.", "Take shorter showers.", "Use eco wash tablets to wash at cooler temperatures."],
    'tip--2': ["Recycle whenever you can.", "Buy recycled products.", "Reduce the amount of new packing by buying less."],
    'tip--3': ["Switch the power off at the wall when finished with the appliance.", "Switch to energy saving light bulbs around your home.", "Read the energy label of new devices and buy the most energy efficent."],
    'tip--4': ["Ditch the car and use your bike or walk to places close by.", "Consider using public transport when you want to go somewhere far.", "Switch to an electric car or more one which is more fuel efficient."],
    'tip--5': ["Switch to renewable energy", "Install solar panels and generate your own energy"],
    'tip--6': ["Buy local. The less distance your food has travelled the smaller the carbon footprint.", "Plant a tree", "Spread the word and share what you know to all your friends and family."]
}

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

const openModal = e => {
    const id = e.id;

    let list = '';
    tips[id].forEach(tip => {
        list += `<li class="popup__item">${tip}</li>`
    });

    const title = e.querySelector('.tips__title').innerText;
    const text = e.querySelector('.tips__text').innerText;

    const element = `
        <div class="popup__bar">
            <button class="popup__button">X</button>
        </div>
        <div class="popup__content">
            <h2 class="popup__h">${title}</h2>
            <p class="popup__paragraph">${text}</p>
            <ul class="popup__list">
                ${list}
            </ul>
        </div>
    `;
    let popup = document.createElement('div');
    popup.innerHTML = element;
    popup.classList.add('popup');
    popup.style.backgroundImage = `url(./assets/icons/${id}.svg)`;
    document.querySelector('body').appendChild(popup);
    document.querySelector('.overlay').style.display = "block";
}

closeModal = () => {
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('body').removeChild(document.querySelector('.popup'));
}

window.addEventListener('scroll', stickNavigation);
messageElement.addEventListener('input', countWords);
tipsContainer.addEventListener('click', e => {
    if (e.target.id) openModal(e.target);
});
document.addEventListener('click', e => {
    if (e.target.classList.contains('popup__button')) closeModal();
});