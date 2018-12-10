// Database object
const database = {
  notes: [],
  tags: [],
  currentNote: '',
  noteList: document.querySelector('#notes-output'),
  init: () => {
    let storageNotes = JSON.parse(localStorage.getItem('notes'));
    if (storageNotes === null) {
      console.log('database.Init(): No notes in memory (new user)');
    } else if (storageNotes.length === 0) {
      console.log('database.Init(): No notes in memory (exsisting user)');
      welcomeLightbox.style.display = 'none';
    } else {
      console.log('database.Init(): Loading exsisting notes from memory')
      welcomeLightbox.style.display = 'none';
      database.notes = importNotes(storageNotes);
      database.tags = getTags(database.notes);
      DOM.show(database.filter(allNotes));
    }
  },

  nukeNote: (id) => {
    let index = database.notes.findIndex(note => note.id === id);
    if (index => 0) {
      database.notes.splice(index, 1);
      console.log(`Nuked note: '${id}'`);
      DOM.update();
      database.storeNotes();
    } else {
      console.log(`Could not find note in ${database.notes}`);
    }
  },

  openNote: (id) => {
    let note = database.notes.find(note => note.id === id);
    if (note === undefined) {
      console.log(`Could not find note with ID: ${id}`);
      return;
    } else {
      console.log(`Got note with id: ${id}`);
      let notes = [].slice.call(notesOutput.children);
      database.currentNote = id;
      notes.forEach(note => note.classList.contains('active') ? note.classList.remove('active') : false);
      notes.forEach(note => note.id === database.currentNote ? note.classList.add('active') : false);
      quill.setContents(note.content);
      document.getElementsByClassName("ql-editor")[0].focus();
      return note;
    }
  },

  filter: (func = (note) => note) => {
    console.log(func);
    return database.notes.filter(func);
  },

  newNote: () => {
    database.saveNote(database.currentNote);
    database.storeNotes();
    database.currentNote = '';
    quill.setContents('');
    document.querySelector('.ql-editor').focus();
  }, // Add check for empty currentNote

  saveNote: (id) => {
    if (database.notes.find(n => n.id === id)) {
      database.updateNote(id);
      database.storeNotes();
      DOM.show(database.filter(allNotes));
    } else {
      const note = new Note(newNote(quill.getContents()));
      database.currentNote = note.id;
      database.notes.unshift(note);
      DOM.show(database.filter(allNotes));
      console.log('database.saveNote(): No current, creating new note...');
      console.log('database.saveNote(): Creates new note with ID: ' + note.id);
    }
  },

  updateNote: (id) => {
    const note = findNote(id);
    note.title = noteTitle();
    note.lastModified = getDate('full');
    note.content = quill.getContents();
    move(database.notes, database.notes.indexOf(note), 0);
    console.log('database.updateNote(): ' + note.title);
  },

  storeNotes: () => {
    localStorage.setItem('notes', JSON.stringify(exportNotes(database.notes)));
    localStorage.setItem('tags', JSON.stringify(database.tags));
  }

}

const DOM = {
  current: 'all',
  currentTags: [],
  tagToBeRemoved: '',
  noteId: false,
  tagsList: document.querySelector('.tag-list'),
  notesList: document.querySelector('#notes-output'),

  show: (arr = update()) => {
    DOM.clear();
    arr.forEach(note => DOM.notesList.appendChild(createElement(note)));
    database.tags = getTags(database.notes);
    database.tags.forEach(tag => DOM.tagsList.appendChild(badgeCreater(tag)));
  },

  clear: () => {
    if (DOM.notesList.children.length > 0) {
      while (DOM.notesList.firstChild) {
        DOM.notesList.removeChild(DOM.notesList.firstChild);
      }
      console.log('DOM.clear(): Cleared DOM')
    } else {
      console.log('DOM.clear(): No notes in DOM');
    }
    if (tagList.children.length > 0) {
      console.log('Clearing tags');
      while (tagList.firstChild) {
        tagList.removeChild(tagList.firstChild);
      }
      console.log('DOM.clear(): Cleared all tags')
    }
  },

  update: () => {
    DOM.clear();
    switch (DOM.current) {
      case 'all':
        DOM.show(database.filter(allNotes));
        break;
      case 'deleted':
        DOM.show(database.filter(deleted));
        break;
      case 'favourite':
        DOM.show(database.filter(favourite));
        break;
      case 'tag':
        DOM.show(database.filter(tag(DOM.currentTag)));
      default:
        DOM.show(database.filter());
    }
  }
}

// Filters
const favourite = (note) => {
  DOM.current = 'favourite';
  clearActive(menuItems);
  setActive('favourites', 'Favourites');
  return note.favourite === true && note.deleted === false;
};

const deleted = (note) => {
  DOM.current = 'deleted';
  clearActive(menuItems);
  setActive('deleted', 'Deleted Notes');
  return note.deleted === true;
};

const allNotes = (note) => {
  DOM.current = 'all';
  clearActive(menuItems);
  setActive('notes', 'All Notes');
  return note.deleted === false;
};

const tags = () => {
  let notes = [];
  for (let i = 0; i < DOM.currentTags.length; i++) {
    database.notes.forEach(note => {
      note.tags.find(tag => {
        let temp = tag === DOM.currentTags[i] ? note : false;
        if (temp) {
          notes.push(temp);
        }
      })
    })
  }
  return notes;
}

function newCreate(noteObject) {
  console.log(noteObject);
  const li = document.createElement('li');
  li.classList.add('note');
  li.innerHTML =
    `<div class="note-item-wrapper">
        <div>
          <h4 class="note__title">${noteObject.title}</h4>
          <p class="note__summary"></p>
          <p class="note__date">Updated: <span class="note__date__updated">${noteObject.lastModified}</span></p>
        </div>
        <div>
          <i class="far fa-star" id="fav-btn" onclick="${noteObject.setFavourite()}"></i>
          <i class="fas fa-times" id="remove-btn" onclick="${noteObject.remove()}"></i>
        </div>
      </div>`;
  return li;
}