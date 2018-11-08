const menuBTN = document.querySelector('#menu-btn');
const menuBTNClose = document.querySelector('#menu-btn-close');
const sidebar = document.querySelector('#sidebar');

menuBTN.addEventListener('click', () => {
    sidebar.classList.add('expanded');
})

menuBTNClose.addEventListener('click', () => {
    sidebar.classList.remove('expanded');
})