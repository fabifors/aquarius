/* 
This is the heart of the app: the Note class. Each time a note is recieved from localstorage, the note is passed as an object into the constructor. It creates an object with methods, otherwise known as an instance of the class Note. The methods are simple to keep the state of the app away from the object itself. Almost every method toggles or makes very small changes to the rest of the app when called. For example Note.restore() only sets the note.deleted value to false. The re-render of the DOM is then handled by the click event on the notes remove button. So the note does not trigger anything itself. It just updates it's own data and lets the app react to that change. 
*/

class Note {
    // Gets the same structure as the objects that is passed through
    constructor(obj) {
        this.id = obj.id;
        this.lastModified = obj.lastModified;
        this.created = obj.created;
        this.favourite = obj.favourite;
        this.deleted = obj.deleted;
        this.title = obj.title;
        this.tags = obj.tags;
        this.template = obj.template;
        this.content = obj.content;
    }

    // Remove toggles the remove state. If the note is already removed, it runts database.nukeNote() after a prompt.
    remove() {
        if (this.deleted === false) {
            this.deleted = true;
        } else if (this.deleted === true && DOM.current === 'deleted') {
            let input;
            do {
                input = prompt(`Do you really wanna remove "${this.title}" completely? y/n`).toLowerCase();
                if (input === 'y') {
                    console.log(this.id);
                    database.nukeNote(this.id);
                    break;
                }
                if (input === 'n') {
                    alert('Okey, no deletion made');
                    break;
                }
            } while (input === 'y' || input === 'n')
        }
    }

    // Sets the notes deleted state to false
    restore() {
        this.deleted = false;
    }

    // Toggles the favourite state
    setFavourite() {
        this.favourite = !this.favourite;
    }

    // Adds a tag thats passed as an argument of the method call. 
    addTag(tag) {
        // If tag exsist, do not add it. Else push to note.tags array
        if (this.tags.includes(tag)) {
            console.error(`Found tag: ${tag} in note taglist. Can't add.`);
        } else {
            this.tags.push(tag);
            console.log(`Added tag: "${tag}" to note: (${this.title})`)
        }
    }

    // Removes a specific tag from the notes own tags array
    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }
}