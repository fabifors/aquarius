document.addEventListener('DOMContentLoaded', () => {
  database.init();

  // Create the button for adding tags in toolbar
  tagbtn.classList.add('fas', 'fa-tag');
  addTagBtn.appendChild(tagbtn);

  addTagBtn.addEventListener('blur', () => {
    document.querySelector('.ql-editor').focus();
  });

  addTagBtn.addEventListener('click', (e) => {
    // Ask for tagg
    let newTag = prompt('Add a tag').toLowerCase();
    if (database.currentNote === '') {
      database.saveNote(database.currentNote);
      findNote(database.currentNote).addTag(newTag);
      database.saveNote(database.currentNote);
      database.storeNotes();
      DOM.show(database.filter(allNotes));
    } else {
      findNote(database.currentNote).addTag(newTag);
      database.saveNote(database.currentNote);
      database.storeNotes();
      DOM.show(database.filter(allNotes));
    }
  });

  document.getElementById('search-input').addEventListener('keyup', (event) => {
    let searchArray = [];
    database.notes.filter(note => {
      let noteContent = note.content.ops[0].insert.toLowerCase();
      if (noteContent.includes(event.target.value.toLowerCase())) {
        searchArray.push(note);
        DOM.clear();
        DOM.show(searchArray);
      } else {
        return;
      };
    });
  });


  /*
  ==================================
  ==== Themepicker Events ==========
  ==================================
  */
  document.getElementById('ql-picker-options-3').addEventListener('click', (event) => {
    quill.formatText(0, quill.getText().length, 'font', event.target.getAttribute("data-value"));
  });

  /*
  ==================================
  ==== Menubutton Events ===========
  ==================================
  */
  menuBTN.addEventListener('click', () => {
    showMenu(true);
  });

  menuBTNClose.addEventListener('click', () => {
    showMenu(false);
  });

  lightBox.addEventListener('click', () => {
    showMenu(false);
  });


  /*
  ==================================
  ==== Noteitem Events =============
  ==================================
  */
  database.noteList.addEventListener('click', (e) => {
    const targetId = e.target.id;
    if (e.target.tagName.toLowerCase() === "li" &&
      database.notes.find(note => note.id === targetId)) {
      // end of condition
      if (database.notes.find(note => note.id === targetId).deleted === false) {
        showMenu(false);
        database.openNote(targetId);
        database.currentNote = targetId;
      } else {
        alert(`Note is currently in the trash. Restore it if you want to access it's content.`);
        return;
      }
    };
  });
});

// REFACTOR THIS: WELCOME SLIDES
window.addEventListener('DOMContentLoaded', () => {
  let welcomeState = 0;
  welcomeBtn.addEventListener('click', () => {
    if (welcomeState === 0) {
      welcome.children[0].classList.add('welcome__background-state-2-changed');

      welcomeLogos[0].classList.toggle('welcome__header__logo--show');
      welcomeLogos[1].classList.toggle('welcome__header__logo--show');

      bgLayer1.classList.add('welcome__background-layer--fade-in');
      bgLayer2.classList.add('welcome__background-layer--fade-in');

      welcomeSlides[0].classList.add('slide--fade-out');
      welcomeSlides[0].classList.remove('slide--view');
      welcomeSlides[1].classList.add('slide--view');

      bubbles[0].classList.remove('active');
      bubbles[1].classList.add('active');

      welcomeState = 1;
    } else if (welcomeState === 1) {
      welcomeSlides[1].classList.add('slide--fade-out');
      welcomeSlides[1].classList.remove('slide--view');
      welcomeSlides[2].classList.add('slide--view');
      bubbles[1].classList.remove('active');
      bubbles[2].classList.add('active');
      welcomeBtn.innerText = 'Get started!';
      bgLayer1Path.style.fill = "#8b3ad2"
      bgLayer2Path.style.fill = '#8b3ad2';
      welcomeState = 2;
    } else if (welcomeState === 2) {
      welcomeSlides[2].classList.add('slide--fade-out');
      welcomeSlides[2].classList.remove('slide--view');

      welcome.classList.add('welcome--close');
      welcomeLightbox.classList.add('close');
      setTimeout(() => {
        welcome.style.display = 'none';
        welcomeLightbox.style.display = 'none';
      }, 300)
      welcomeState = 3;
    }
  })
});