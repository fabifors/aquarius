// BUTTONS
const saveBtn = document.querySelector("#save-btn");
const newBtn = document.querySelector("#new-btn");
const tagbtn = document.createElement('i');

// Notes
const notesDiv = document.querySelector('#notes');
const notesOutput = document.querySelector('#notes-output');
const tagList = notesDiv.querySelector('.tag-list');
const addTagBtn = document.querySelector('.ql-tag');
const removeTagBtn = document.querySelector('.remove-tag');

// Menus
const mainMenu = document.querySelector('#main-menu');
const menuItems = [].slice.call(mainMenu.children);
const sidebar = document.querySelector('#sidebar');
const menuBTN = document.querySelector('#menu-btn');
const menuBTNClose = document.querySelector('#menu-btn-close');
const toolsBTN = document.querySelector('.tool-menu').children[0];
const tools = document.querySelector('.tools');
const lightBox = document.querySelector('.lightbox');
const deletedNotesBtn = document.querySelector('#deleted-notes');

// Welcome Selectors
let welcomeState = 0;
const welcome = document.querySelector('.welcome');
const welcomeLogos = welcome.querySelectorAll('.logo');
const welcomeSlides = [].slice.call(welcome.querySelectorAll('.slide'));
const welcomeBtn = welcome.querySelector('.welcome__footer__btn');
const bubbles = [].slice.call(welcome.querySelectorAll('.bubble'));
const welcomeLightbox = document.querySelector('#welcome-lightbox');
const bgLayer1 = welcome.querySelector('.welcome__background-layer-1');
const bgLayer2 = welcome.querySelector('.welcome__background-layer-2');
const bgLayer1Path = welcome.querySelector('#background');
const bgLayer2Path = welcome.querySelector('#foreground');