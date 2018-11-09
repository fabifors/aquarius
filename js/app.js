const notesOutput = document.querySelector('#notes-output');
const notesArray = [];
let currentNote = '';

// Initialize Quill editor
var quill = new Quill('#editor', {
  theme: 'snow'
});

function getDate() {
  let d = new Date();
  let date = [d.getFullYear(), d.getMonth(), d.getDate()];
  if (date[2] <= 9) {
    date[2] = '0' + date[2];
  }
  if (date[1] <= 1) {
    date[1] = '0' + date[1];
  }
  return date.join('-');
}

function noteConstructor(content) {
  let note = {
    id: guid(),
    dateTime: getDate(),
    favorite: false,
    deleted: false,
    title: noteTitle(),
    tags: [],
    content: content
  };
  return note;
}

// function storeNote() {
//   if (currentNote.length > 5) {
//     let storage = JSON.parse(localStorage('note'));
//     storage.get
//   }
//   let note = noteConstructor(quill.getContents());
//   currentNote = note.id;
//   notesArray.push(note);
//   localStorage.setItem('note', JSON.stringify(notesArray));
//   console.log(localStorage);
//   showNotes(createNoteElements());
// }


function newNote() {
  currentNote = '';
  quill.setContents('');
}

function getNote(id) {
  let storage = localStorage.getItem('note');
  let content = JSON.parse(storage);

  content.forEach(e => {
    console.log(e.id);
    console.log(id);
    if (e.id === id) {
      quill.setContents(e.content);
      console.log('yes');
    } else {
      console.log('continue');
    }
  });
}

// Function that takes the current note's ID and saves it
function saveNote(id) {
  // Checks if note is in memory
  if (notesArray.find(n => n.id === id.toString())) {
    // If true: runt update function and save new note in memory
    updateNote(id);
    localStorage.setItem('note', JSON.stringify(notesArray));
  } else {
    // If false: create a new note with contents of the editor
    const note = noteConstructor(quill.getContents());
    // Get the ID and set it as currentNote
    currentNote = note.id;
    // Place the new note first in the array
    notesArray.unshift(note);
    // Save note into memory
    localStorage.setItem('note', JSON.stringify(notesArray));
    // Build and show the new updated DOM
    showNotes(buildDom());

    console.log('no current, creating new note...');
  }
};

// Function that takes ID and change the corresponding note's content, title and date
function updateNote(id) {
  // UNDER CONSTRUCTION
  notesArray.find(note => note.id === id).content = quill.getContents();
}

// Get the note title from editor's first line
function noteTitle() {
  let title = quill.getContents().ops[0].insert;
  return title;
}

// Randomize a hash of 5 sections to use for ID on notes
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// Takes the buildDom function and appends all notes to the DOM
function showNotes(build) {
  // Appends all items to the DOM in #notes-output
  build.forEach(el => notesOutput.appendChild(el));
}

// Function that takes an object and creates a <li> with contents
function createElement(obj) {
  // Defines all element variable and create corresponding elements
  const li = document.createElement('li');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const date = document.createElement('p');
  const span = document.createElement('span');

  // Take information from obj and pass it in as innerHTML
  h4.innerHTML = obj.title;
  date.innerHTML = "Date: ";
  span.innerHTML = obj.dateTime;

  // Append all elements to <li> in correct order
  li.appendChild(h4);
  li.appendChild(p);
  date.appendChild(span);
  li.appendChild(date);

  // Adds the class and id to <li>
  li.classList.add('note');
  li.id = obj.id;

  // Return finished <li>
  return li;
}

// Function that removes the selected element's children
function clearDom(elemID) {
  // Select element.children and put it in a variable
  const el = document.querySelector(elemID);
  const children = el.children;

  // Check if element has children
  if (children.length > 0) {
    // If true: remove all children
    for (let i = 0; i < children.length; i++) {
      let parent = children[i].parentNode;
      parent.removeChild(children[i]);
    }
  } else {
    // If false: nothing happens, (console.log)
    console.log('No notes in DOM');
  }
}

// Function that build the new domArray with notes
function buildDom() {
  // Clear the dom tree so no old ones are left
  clearDom('#notes-output')
  // Create the variable to store all notes
  let domArray = [];
  // Get all the notes from localStorage
  let storage = JSON.parse(localStorage.getItem('note'));
  // Loop through them and push each item to new array
  storage.forEach(el => domArray.push(createElement(el)));
  // Return array
  return domArray;
}



// Event Listeners

// Click event for the notes in sidebar
notesOutput.addEventListener('click', (e) => {
  // Get the clicked note's ID
  const targetId = e.target.id;
  // Update editor with selected note's ID
  getNote(targetId);
  // Close menu
  showMenu(false);
  // Set local variable to equal new current note's ID
  currentNote = targetId;
});