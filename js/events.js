const menuBTN = document.querySelector('#menu-btn');
const menuBTNClose = document.querySelector('#menu-btn-close');
const sidebar = document.querySelector('#sidebar');
const notes = document.querySelector('#notes');
const lightBox = document.querySelector('.lightbox');
const toolsBTN = document.querySelector('.tool-menu').children[0];
const tools = document.querySelector('.tools');

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

function toolMenuOpen() {
    toolsBTN.children[0].classList.toggle('open-menu1');
    toolsBTN.children[1].classList.toggle('open-menu2');
    toolsBTN.children[0].classList.toggle('close-menu1');
    toolsBTN.children[1].classList.toggle('close-menu2');
    tools.classList.toggle('tools-expanded');
};