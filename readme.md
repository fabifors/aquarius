### Quire - A simple and elegant notetaking app
The project is an in browser rich text editor built upon the open source Quill wysiwyg editor architecture. The app works without a back-end and instead utilizing local storage as storage method. I lets the user create notes, format and style them and save and organize a collection of notes.

The code is has documentation through out and any part that isn't self explanatory will likely be preceded by a comment that explains the following codes purpose. Below you will find an index of the different files in the project.


###Javascript.

The code is structured in a object oriented manner and split in to six javascript files with their own distinct area of concern. The are implemented in index.html in the following order.

quill.js: this file contains the modifications and initializing of the quill rich text editor. The actual script for Quil is linked by a CDN on line 204 in index.html.

global.js: contains all the globally used variables, do to scooping issues this file also contains code that deals with the styling templates used by the user of the app.

note.js: contains the class construct for the note objects that the app uses.

database.js: contains code that deals with the note object in relation to local storage and DOM rendering, also in app functionality such as searching and tagging.

Functions.js: contains the bulk of function that interact with the app and with writing values to the note objects.

App.js: contains code that relates to user interaction with the app mainly eventlistener based functions.


Html: the app has a single page structure and the index.html file is the only html file in the project. Any element not found in this file is therefore injected by javascript.


Css: the project contains four css files with separate areas of concern, there are also five css files accessed through CDN in index.html these are the quil css file as well as icons and fonts.

normalize.css: this file makes sets a more consistent baseline for the rendering of the css styles.

Main.css: contains most of the css for the project. The file is split in clearly defined parts preceded by a comment that titles the part the css the following styles concern.

Fonts.css: contains the styles for the different styling templates the user can select for their notes.

Print.css: contains styles for the printing of a note.
