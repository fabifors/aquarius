// BUTTONS
const saveBtn = document.querySelector("#save-btn");
const newBtn = document.querySelector("#new-btn");
const tagbtn = document.createElement('i');

// Template definitions
const templateSelect = document.querySelector('ql-templates');
const select = document.createElement('select');
const option = document.createElement('option');


// qlEditor OLD
const qlEditor = document.querySelector('.ql-editor');
const qlPickerLabel = document.querySelector('.ql-picker-label');
const qlPicker = document.getElementById('ql-picker-options-3');

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


// Templates
const formats = document.querySelectorAll('.ql-formats');
const temp = formats[7];
console.log(temp);
temp.removeChild(temp.firstChild);

const template1 = document.createElement('option');
template1.classList.add('template1');
template1.text = "Template 1";
template1.value = 'template-1';


const template2 = document.createElement('option');
template2.classList.add('template-2', 'select');
template2.text = "Template 2";
template2.value = 'template-2';


const template3 = document.createElement('option');
template3.classList.add('template1');
template3.text = "Template 3";
template3.value = 'template-3';


select.onchange = () => {
    if (database.currentNote !== '') {
        findNote(database.currentNote).template = select.value;
        database.saveNote(database.currentNote);
    }
    templatePicker(select.value);
}

// Select 
select.classList.add('ql-template-picker', 'ql-picker', 'ql-picker-label');
select.add(template1, 0);
select.add(template2, 1);
select.add(template3, 2);

document.addEventListener('DOMContentLoaded', () => {
    temp.appendChild(select);
    const templateSelect = document.querySelector('.ql-template-picker');
    console.log(templateSelect);
})