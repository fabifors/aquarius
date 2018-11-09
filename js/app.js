const notesOutput = document.querySelector('#notes-output');
const notesArray = [];

// Initialize Quill editor
var quill = new Quill('#editor', {
  theme: 'snow'
});

function noteConstructor(content) {
  let d = new Date();
  let date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  let note = {
    id: guid(),
    dateTime: date,
    favorite: false,
    deleted: false,
    title: noteTitle(),
    tags: [],
    content: content
  };
  return note;
}

function storeNote() {
  let note = noteConstructor(quill.getContents());
  notesArray.push(note);
  localStorage.setItem('note', JSON.stringify(notesArray));
  console.log(localStorage);
  quill.setContents('');
  showNotes(createNoteElements());
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

function noteTitle() {
  let title = quill.getContents().ops[0].insert;
  return title;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function createNoteElements() {
  let notes = JSON.parse(localStorage.getItem('note'));
  const li = document.createElement('li');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const date = document.createElement('p');
  const span = document.createElement('span');

  const domArray = [];

  console.log(notes);
  notes.forEach(el => {
    h4.innerHTML = el.title;
    date.innerHTML = "Date: ";
    span.innerHTML = el.dateTime;

    li.appendChild(h4);
    li.appendChild(p);
    date.appendChild(span);
    li.appendChild(date);

    li.classList.add('note');
    li.id = el.id;

    domArray.push(li);
  });

  return domArray;
}

function showNotes(createList) {
  createList.forEach(el => notesOutput.appendChild(el));
}

notesOutput.addEventListener('click', (e) => {
  const targetId = e.target.id;
  getNote(targetId);
  showMenu(false);
});