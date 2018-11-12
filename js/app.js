const notesOutput = document.querySelector('#notes-output');
const saveBtn = document.querySelector("#save-btn");
const newBtn = document.querySelector("#new-btn");
const notesArray = [];
let domArray = [];
let currentNote = '';

var fonts = ['sofia', 'roboto', 'lobster'];
var Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);


var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{
    'indent': '-1'
  }, {
    'indent': '+1'
  }],
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }],
  [{
    'color': []
  }, {
    'background': []
  }],
  [{
    'font': ['sofia', 'roboto', 'lobster']
  }],
  [{
    'align': []
  }],
  ['clean']
];

// Initialize Quill editor
var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

// Function that creates a new date in YYYY-MM-DD format
function getDate(type) {
  let d = new Date();

  if (type === 'full') {
    let date = [
      [d.getFullYear(), d.getMonth(), d.getDate()],
      [d.getHours(), d.getMinutes()]
    ];

    if (date[0][2] <= 9) {
      date[0][2] = '0' + date[0][2];
    }
    if (date[0][1] <= 9) {
      date[0][1] = '0' + date[0][1];
    }

    if (date[1][0] <= 9) {
      date[1][0] = '0' + date[1][0];
    }
    if (date[1][1] <= 9) {
      date[1][1] = '0' + date[1][1];
    }

    return date[0].join('-') + ' ' + '@' + ' ' + date[1].join(':');
  } else if (type === 'date') {
    let date = [d.getFullYear(), d.getMonth(), d.getDate()];

    if (date[0][2] <= 9) {
      date[0][2] = '0' + date[0][2];
    }
    if (date[0][1] <= 9) {
      date[0][1] = '0' + date[0][1];
    }

    return date.join('-');
  } else {
    console.error('No or incorrect function call. Check arguments.');
  }
}

function noteConstructor(content) {
  let note = {
    id: guid(),
    lastModified: getDate('full'),
    created: getDate('date'),
    favorite: false,
    deleted: false,
    title: noteTitle(),
    tags: [],
    content: content,
  };
  return note;
}

function newNote() {
  currentNote = '';
  quill.setContents('');
  showNotes(buildDom());
}

// Function that takes in note id and display the note in editor
function getNote(id) {
  let storage = localStorage.getItem('note');
  let content = JSON.parse(storage);
  content.forEach(e => {
    if (e.id === id) {
      quill.setContents(e.content);
      console.log('getNote(): Open note: ' + e.id);
    }
  }, false);
}

// Function that takes the current note's ID and saves it
function saveNote(id) {
  if (notesArray.find(n => n.id === id.toString())) {
    updateNote(id);
    showNotes(buildDom());
  } else {
    const note = noteConstructor(quill.getContents());
    currentNote = note.id;
    notesArray.unshift(note);
    localStorage.setItem('note', JSON.stringify(notesArray));
    showNotes(buildDom());

    console.log('saveNote(): No current, creating new note...');
    console.log('saveNote(): Creates new note with ID: ' + note.id);
  }
  saveBtn.classList.add('success');
  setTimeout(() => {
    saveBtn.classList.remove('success');
  }, 1500);
};

function findNote(id) {
  if (id.length > 0) {
    return notesArray.find(note => note.id === id);
  } else {
    console.error('findNote(): No current ID');
  }
}

// Function that takes ID and change the corresponding note's content, title and date
function updateNote(id) {
  const note = findNote(id);
  note.title = noteTitle();
  note.lastModified = getDate();
  note.content = quill.getContents();
  move(notesArray, notesArray.indexOf(note), 0);
  localStorage.setItem('note', JSON.stringify(notesArray));
  console.log('updateNote(): ' + note.title);
}

// Code from link that moves item from one spot to another https://www.w3resource.com/javascript-exercises/javascript-array-exercise-38.php
function move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

// Function that takes the current note's ID and saves it
function saveNote(id) {
  if (notesArray.find(n => n.id === id.toString())) {
    updateNote(id);
    showNotes(buildDom());
  } else {
    const note = noteConstructor(quill.getContents());
    currentNote = note.id;
    notesArray.unshift(note);
    localStorage.setItem('note', JSON.stringify(notesArray));
    showNotes(buildDom());

    console.log('saveNote(): No current, creating new note...');
    console.log('saveNote(): Creates new note with ID: ' + note.id);
  }
  saveBtn.classList.add('success');
  setTimeout(() => {
    saveBtn.classList.remove('success');
  }, 1500);
};

function findNote(id) {
  if (id.length > 0) {
    return notesArray.find(note => note.id === id);
  } else {
    console.error('findNote(): No current ID');
  }
}

// Function that takes ID and change the corresponding note's content, title and date
function updateNote(id) {
  const note = findNote(id);
  note.title = noteTitle();
  note.lastModified = getDate();
  note.content = quill.getContents();
  move(notesArray, notesArray.indexOf(note), 0);
  localStorage.setItem('note', JSON.stringify(notesArray));
  console.log('updateNote(): ' + note.title);
}

// Code from link that moves item from one spot to another https://www.w3resource.com/javascript-exercises/javascript-array-exercise-38.php
function move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

// Kristian 
// const move = (arr, old_index, new_index) => arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

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
function showNotes() {
  buildDom().forEach(el => notesOutput.appendChild(el));
}

// Function that build the new domArray with notes
function buildDom() {
  clearDom('#notes-output')
  domArray = [];
  notesArray.forEach(el => domArray.push(createElement(el)));
  return domArray;
}

// Function that takes an object and creates a <li> with contents
function createElement(obj) {
  const li = document.createElement('li');
  const mainDiv = document.createElement('div');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const date = document.createElement('p');
  const span = document.createElement('span');

  const btnDiv = document.createElement('div');
  const removeBtn = document.createElement('i');
  removeBtn.classList.add('fas', 'fa-times');
  removeBtn.id = 'remove-btn';
  removeBtn.onclick = function (e) {
    let note = e.target.parentNode.parentNode.id;
    let noteIndex = notesArray.map(n => n.id).indexOf(note);
    notesArray.splice(noteIndex, 1);
    clearDom();
    showNotes(buildDom());
    localStorage.setItem('note', JSON.stringify(notesArray));
  }

  // Take information from obj and pass it in as innerHTML
  h4.innerHTML = obj.title;
  date.innerHTML = "Updated: ";
  span.innerHTML = obj.lastModified;

  // Append all elements in correct order
  mainDiv.appendChild(h4);
  mainDiv.appendChild(p);
  date.appendChild(span);
  mainDiv.appendChild(date);
  btnDiv.appendChild(removeBtn);

  // Adds the class and id to <li>
  li.classList.add('note');
  li.id = obj.id;

  // Append all elements to <li> in correct order
  li.appendChild(mainDiv);
  li.appendChild(btnDiv);
  return li;
}

// Function that removes the selected element's children
function clearDom() {
  const children = notesOutput.children;

  if (children.length > 0) {
    while (notesOutput.firstChild) {
      notesOutput.removeChild(notesOutput.firstChild);
    }
  } else {
    console.log('clearDom(): No notes in DOM');
  }
}

function start() {
  let storage = JSON.parse(localStorage.getItem('note'));
  if (storage !== null) {
    storage.forEach(el => notesArray.push(el));
    showNotes(buildDom());
  } else {
    console.log('start(): No notes in memory.');
  }
}


// Event Listeners

// Click event for the notes in sidebar
notesOutput.addEventListener('click', (e) => {
  const targetId = e.target.id;
  getNote(targetId);
  if (e.target.tagName.toLowerCase() !== 'i') {
    showMenu(false);
  }
  currentNote = targetId;
});