/* 
In Quire, we use a local database object that keeps track of notes, tags and the current note. It also has some methods that alternate the exsisting notes and tags depending on some factors. database.init() is called every time a user enters the app. The other mehtods gets called at appropriate times through out the application to remove, open, filter notes and so on. It also has a save, update and new note feature.
*/
const database = {
    notes: [],
    tags: [],
    currentNote: '',

    /*
    Init loads data from localstorage to parse and store in the database.notes array. It also keeps track of if the user is new to the app, if so it displays the welcome message. Some other functions like getTags() and DOM.show() are called. 
    
    getTags(): get all the tags from each note to store in a seperate array called tags.
    DOM.show: Render the notes and tags in the DOM. (more where the function is declared)
    */

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

    // nukeNote() takes the ID of the note to nuke, removes it from the notes array and runt DOM.update()
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

    // Takes argument in form of an ID that it use to find and open a specific note in the database
    openNote: (id) => {
        let note = database.notes.find(note => note.id === id);
        if (note === undefined) {
            console.log(`Could not find note with ID: ${id}`);
            return;
        } else {
            console.log(`Got note with id: ${id}`);
            database.currentNote = id;
            quill.setContents(note.content);
            document.getElementsByClassName("ql-editor")[0].focus();
            DOM.update();
            return note;
        }
    },

    /* 
    The créme de la créme: database.filter (jk)
    This acts as a short hand for database.notes.filter()
    HINT: The name of this function can be confusing at first. When reading the code, think of it like this:

    In english ==> In the DOM, Show the database filtered through the favourite filter.
    In javascript ==> DOM.show(database.filter(favourite));

    It's not that bad if you get into the mindset.
     */
    filter: (func = (note) => note) => {
        // runs argument (function) as an argument to the array function filter
        return database.notes.filter(func);
    },

    // Method that gets called when plus sign is clicked
    // If the user is working on a note: save the note first before creating a new one
    newNote: () => {
        if (database.currentNote === '') {
            const content = quill.getContents();
            console.log(content.ops[0].insert.length);
            if (content.ops.length === 1 && content.ops[0].insert.length === 1) {
                console.log('this works');
                quill.setContents('');
                document.querySelector('.ql-editor').focus();
            } else {
                const note = new Note(newNote(quill.getContents()));
                console.log(note);
                database.notes.unshift(note);
                database.storeNotes();
                DOM.update();
            }

        } else {
            database.saveNote(database.currentNote);
            database.storeNotes();
            database.currentNote = '';
            quill.setContents('');
            document.querySelector('.ql-editor').focus();
        }
    },

    // Saves the note associated with the ID passed as argument and then updates DOM
    // OR creates a new one 
    saveNote: (id) => {
        if (database.notes.find(n => n.id === id)) {
            database.updateNote(id);
            database.storeNotes();
            DOM.update();
        } else {
            const note = new Note(newNote(quill.getContents()));
            database.currentNote = note.id;
            database.notes.unshift(note);
            database.storeNotes();
            DOM.update();
            console.log('database.saveNote(): Creates new note with ID: ' + note.id);
        }
    },

    // Mehtod that updates a specific note to current content and date, 
    updateNote: (id) => {
        const note = findNote(id);
        note.title = noteTitle();
        note.lastModified = getDate('full');
        note.content = quill.getContents();
        move(database.notes, database.notes.indexOf(note), 0);
        console.log('database.updateNote(): ' + note.title);
    },

    // Sets the local to the local database.notes array as the key 'notes'
    storeNotes: () => {
        localStorage.setItem('notes', JSON.stringify(exportNotes(database.notes)));
    }
}

/* 
This is the object that keeps track of all the DOM states. It includes the .show(), .clear() and .update() methods. DOM.clear() gets called inside both .update() and .show() so no need for calling that unless you want to force the DOM to clear.
*/
const DOM = {
    // Current refers to the current "view" in the DOM. For example 'all' refer to 'All notes are shown' in the DOM.noteList
    current: 'all',
    // Current tags refers to the current array of filtered tags.
    currentTags: [],
    // tagToBeRemoved is a temporary place the label of the tag to be removed is placed to be refered at in another function outside the state.
    tagToBeRemoved: '',
    // noteId is also a temporary place for a note ID to be stored. It is used to get the note that a tag is attatched to.
    noteId: false,
    tagsList: document.querySelector('.tag-list'),
    notesList: document.querySelector('#notes-output'),

    /* 
    show() simply takes an array of objects (html elements) and appends each item to the DOM. It gets passed the database.filter() method that in turn returns an array depending on the filter that is passed.(filters that are passed to database.filter() are declared below)
    It also renders the tags.
    */
    show: (arr = update()) => {
        DOM.clear();
        arr.forEach(note => DOM.notesList.appendChild(createElement(note)));
        database.tags = getTags(database.notes);
        database.tags.forEach(tag => DOM.tagsList.appendChild(badgeCreater(tag)));
    },

    // This function only removes the elements created by DOM.show() so that when DOM.show is created run, no duplicates are present
    clear: () => {
        if (DOM.notesList.children.length > 0) {
            while (DOM.notesList.firstChild) {
                DOM.notesList.removeChild(DOM.notesList.firstChild);
            }
            console.log('DOM.clear(): Cleared DOM')
        } else {
            return false;
        }
        if (tagList.children.length > 0) {
            while (tagList.firstChild) {
                tagList.removeChild(tagList.firstChild);
            }
        }
    },

    // Takes the DOM.current variable (described above) and run the DOM.show() method with the corresponding filter. 
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
            default:
                DOM.show(database.filter());
        }
    }
}

// Filters
/* 
These are the heart of the DOM.show method. These functions are passed as filters for the database.notes array. When DOM.show(database.filter(favourite)) is called, only the notes with favourite = true are shown in the DOM. This is true for all filters but with different results for different cases.
*/

// Show all favourite notes
const favourite = (note) => {
    DOM.current = 'favourite';
    clearActive(menuItems);
    setActive('favourites', 'Favourites');
    return note.favourite === true && note.deleted === false;
};

// Show all deleted notes
const deleted = (note) => {
    DOM.current = 'deleted';
    clearActive(menuItems);
    setActive('deleted', 'Deleted Notes');
    return note.deleted === true;
};

// Show all notes except ones that are deleted
const allNotes = (note) => {
    DOM.current = 'all';
    clearActive(menuItems);
    setActive('notes', 'All Notes');
    return note.deleted === false;
};

/*
This is the only kinda filter that works differently. It does not get passed down the .filter() method within the database object. It gets passed directly into the DOM.show() method. It returns an array of all the notes that contains one of the tags in the DOM.currentTags array. This get's called everytime a tag is clicked.
*/
const tags = () => {
    let notes = [];
    for (let i = 0; i < DOM.currentTags.length; i++) {
        database.notes.forEach(note => {
            note.tags.find(tag => {
                let temp = tag === DOM.currentTags[i] ? note : false;
                if (temp && !notes.includes(note)) {
                    notes.push(temp);
                }
            })
        })
    }
    return notes;
}