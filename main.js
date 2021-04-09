const navElement = document.querySelector('.navigation');
const detachedNavClass = "navigation--detached";

const stickNavigation = (e) => {
    let yPos = window.pageYOffset;
    if (yPos > 0 && !navElement.classList.contains(detachedNavClass)) {
        navElement.classList.add(detachedNavClass);
    } else if (yPos === 0) {
        navElement.classList.remove(detachedNavClass);
    }
}

window.addEventListener('scroll', stickNavigation);