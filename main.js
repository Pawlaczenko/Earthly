//Variables and Constants

const navElement = document.querySelector('.navigation');
const messageElement = document.querySelector('.contact__textarea');
const wordsCounter = document.querySelector('.contact__counter-words');
const formButton = document.querySelector('.contact__button');
const tipsContainer = document.querySelector('.tips__container');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.popup__button');
const navigation = document.querySelector('.navigation');

const detachedNavClass = "navigation--detached";
const tips = {
    'tip--1': ["Turn the water off when brushing your teeth.", "Take shorter showers.", "Use eco wash tablets to wash at cooler temperatures."],
    'tip--2': ["Recycle whenever you can.", "Buy recycled products.", "Reduce the amount of new packing by buying less."],
    'tip--3': ["Switch the power off at the wall when finished with the appliance.", "Switch to energy saving light bulbs around your home.", "Read the energy label of new devices and buy the most energy efficent."],
    'tip--4': ["Ditch the car and use your bike or walk to places close by.", "Consider using public transport when you want to go somewhere far.", "Switch to an electric car or more one which is more fuel efficient."],
    'tip--5': ["Switch to renewable energy", "Install solar panels and generate your own energy"],
    'tip--6': ["Buy local. The less distance your food has travelled the smaller the carbon footprint.", "Plant a tree", "Spread the word and share what you know to all your friends and family."]
}

//Functions

const stickNavigation = (e) => {
    let yPos = window.pageYOffset;
    if (yPos > 0 && !navElement.classList.contains(detachedNavClass)) {
        navElement.classList.add(detachedNavClass);
    } else if (yPos === 0) {
        navElement.classList.remove(detachedNavClass);
    }
}

const disableButton = (words) => {
    formButton.disabled = (words > 500);
}

const countWords = (e) => {
    let words = e.target.value.length;
    wordsCounter.innerHTML = words;

    let color = 'black';

    if (words > 490 && words <= 500) {
        color = "orange";
    } else if (words > 500) {
        color = "red";
    } else {
        color = "black";
    }
    disableButton(words);
    wordsCounter.parentElement.style.color = color;
}

const openModal = e => {
    const title = e.querySelector('.tips__title').innerHTML;
    const text = e.querySelector('.tips__text').innerHTML;
    const id = e.id;

    popup.classList.toggle("closed");
    overlay.classList.toggle("closed");

    let tipsList = "";
    tips[id].map(e => tipsList += `<li class="popup__item">${e}</li>`);

    popup.querySelector('.popup__h').innerHTML = title;
    popup.querySelector('.popup__paragraph').innerHTML = text;
    popup.querySelector('.popup__list').innerHTML = tipsList;
    popup.style.backgroundImage = `url(./assets/icons/${id}.svg)`;
}

const closeModal = () => {
    popup.classList.toggle("closed");
    overlay.classList.toggle("closed");
}

const hideTheLoader = () => {
    document.querySelector('.loader').classList.add('closed');
}

//Listeners

window.addEventListener('scroll', stickNavigation);
messageElement.addEventListener('input', countWords);
tipsContainer.addEventListener('click', e => {
    if (e.target.id) openModal(e.target);
});

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - navigation.offsetHeight);
});

window.addEventListener("load", hideTheLoader);