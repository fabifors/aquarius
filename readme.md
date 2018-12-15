# Quire - A simple and elegant note taking app
The project is an in browser rich text editor built upon the open source Quill.js *WYSIWYG* editor architecture. The app works without a back-end and instead utilizing local storage as storage method. It lets the user create notes, format and style them and save and organize a collection of notes.

The code has documentation through out and any part that isn't self explanatory will likely be preceded by a comment that explains the following codes purpose. Below you will find an index of the different files in the project.


## Javascript.
The code is structured in a object oriented manner and split in to six JavaScript files with their own distinct area of concern. They are implemented in index.html in the following order.<hr>

### quill.js (our own file): 
This file contains the modifications and initializing of the quill rich text editor. The actual script for Quil is linked by a CDN on line 204 in index.html. If you want more information about Quill. you can read the full document. The file, as stated above, does not include the library. <hr>

### global.js: 
Contains all of the globally used variables. Here we declare all the query selectors and element targeting. Due to scooping issues this file also contains code that deals with the styling templates used by the user of the app.<hr>

### note.js: 
Contains the class for the Note objects. Every note contains properties for Title, Content, if they are deleted or not etc. The note class also adds methods like ``remove( )``, ``favourite()``  and ``addTag()`` to each note object.<hr>

### database.js: 
Contains code that deals with the note object in relation to local storage and DOM rendering, also in app functionality such as searching and tagging. 

How we import notes:
 1. Get all the notes in to the ``database.notes`` array with ``importNotes()`` function.
 2. Inside the ``importNotes()`` function we loop through the array from Local Storage and create a new instance of the Note class and push them into the ``database.notes`` array. 
> **Why do we do this?** 
>When you run ``JSON.stringify()`` on an object with methods only the properties of that object are saved in the output. To add all the methods like ``remove()`` back in to the objects, we run a loop that passes every stringified note as an argument to the Note class.

The main object ``database`` has properties for ``notes``, ``tags`` and ``currentNote`` to keep track of the current opened etc. 

The ``database`` object also includes the ``init()`` method followed by: ``nukeNote()``, ``openNote()``, ``filter()``, ``newNote()``, ``saveNote()``, ``updateNote()`` and  ``storeNotes()``.

The method that is called the most of these are ``database.filter()``.

*Example*:
```javascript
	DOM.show(database.filter(favourite));
```
This examples runs the ``DOM.show`` method with the desired filter as an argument. ``database.filter()`` returns an array of notes that we want to be rendered in the DOM. The DOM.show() method first clear the DOM note list and then loops through that array to create a note new element that gets appended to the DOM note list. 

<hr>

### functions.js: 
Contains the bulk of function that interact with the app and with writing values to the note objects.<hr>

### app.js: 
Contains code that relates to user interaction with the app mainly eventlistener based functions.


## HTML: 
The app has a single page structure and the index.html file is the only html file in the project. Any element not found in this file is therefore injected by javascript.


## CSS: 
The project contains of four css files with separate areas of concern, there are also five css files accessed through CDN in index.html these are the quil css file as well as icons and fonts.<hr>

### normalize.css: 
this file makes sets a more consistent baseline for the rendering of the css styles.<hr>

### main.css: 
contains most of the css for the project. The file is split in clearly defined parts preceded by a comment that titles the part the css the following styles concern.<hr>

### fonts.css: 
Contains the styles for the different styling templates the user can select for their notes.<hr>

### print.css: 
contains styles for the printing of a note.
