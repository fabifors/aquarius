const menuBTN = document.querySelector('#menu-btn');
const menuBTNClose = document.querySelector('#menu-btn-close');
const sidebar = document.querySelector('#sidebar');
const notes = document.querySelector('#notes');
const lightBox = document.querySelector('.lightbox');

menuBTN.addEventListener('click', () => {
    showMenu(true);
})

menuBTNClose.addEventListener('click', () => {
    showMenu(false);
})

lightBox.addEventListener('click', () => {
    showMenu(false);
})

function showMenu(bool) {
    if (bool === true) {
        sidebar.classList.add('expanded');
        lightBox.classList.add('show-lightbox');
    } else if (bool === false) {
        sidebar.classList.remove('expanded');
        lightBox.classList.remove('show-lightbox');
        notes.scrollTop = 0;
    } else {
        console.error('Function has no argument or argument is not boolean.');
    }
}