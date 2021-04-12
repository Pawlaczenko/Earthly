//Variables and Constants

const navElement = document.querySelector('.navigation');
const navigationList = document.querySelector('.navigation__list');
const messageElement = document.querySelector('.contact__textarea');
const lettersCounter = document.querySelector('.contact__counter-words');
const formButton = document.querySelector('.contact__button');
const tipsContainer = document.querySelector('.tips__container');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.popup__button');

const detachedNavClass = "navigation--detached";
const tips = {
    'tip--1': ["Turn the water off when brushing your teeth.", "Take shorter showers.", "Use eco wash tablets to wash at cooler temperatures."],
    'tip--2': ["Recycle whenever you can.", "Buy recycled products.", "Reduce the amount of new packing by buying less."],
    'tip--3': ["Switch the power off at the wall when finished with the appliance.", "Switch to energy saving light bulbs around your home.", "Read the energy label of new devices and buy the most energy efficent."],
    'tip--4': ["Ditch the car and use your bike or walk to places close by.", "Consider using public transport when you want to go somewhere far.", "Switch to an electric car or more one which is more fuel efficient."],
    'tip--5': ["Switch to renewable energy", "Install solar panels and generate your own energy"],
    'tip--6': ["Buy local. The less distance your food has travelled the smaller the carbon footprint.", "Plant a tree", "Spread the word and share what you know to all your friends and family."]
}

//FUNCTIONS//

//Handling the sticky vagivation
const stickNavigation = () => {
    let yPos = window.pageYOffset;
    if (yPos > 0 && !navElement.classList.contains(detachedNavClass)) {
        navElement.classList.add(detachedNavClass);
    } else if (yPos === 0) {
        navElement.classList.remove(detachedNavClass);
    }
}

const handleHashChange = () => {
    //Make place for the navigation at the top
    window.scrollTo(window.scrollX, window.scrollY - navElement.offsetHeight);
}

const handleTheNavigation = e => {
    //Hide the navigation list when the link is clicked
    if (e.target.classList.contains('navigation__link')) document.getElementById('burger').checked = false;
}

//Handling the letter counter in messege input
const disableButton = (letters) => {
    formButton.disabled = (letters > 500);
}

const countletters = (e) => {
    let letters = e.target.value.length;
    lettersCounter.innerHTML = letters;

    let color = 'black';

    if (letters > 490 && letters <= 500) {
        color = "orange";
    } else if (letters > 500) {
        color = "red";
    } else {
        color = "black";
    }
    disableButton(letters);
    lettersCounter.parentElement.style.color = color;
}

//Handling the modal mechanics
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


//Handling the loader
const hideTheLoader = () => {
    document.querySelector('.loader').classList.add('closed');
}

// LISTENERS //

window.addEventListener('scroll', stickNavigation);
navigationList.addEventListener('click', handleTheNavigation);
messageElement.addEventListener('input', countletters);
tipsContainer.addEventListener('click', e => {
    if (e.target.id) openModal(e.target);
});

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", hideTheLoader);