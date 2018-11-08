// Initialize Quill editor
var quill = new Quill('#editor', {
    theme: 'snow'
});

function noteConstructor(content) {
  let note = {
    id: guid(),
    dateTime: new Date(),
    favorite: false,
    deleted: false,
    title: noteTitle(),
    tags: [],
    content: content
  };
  return note;
}

function storeNote() {
  let content = quill.getContents();
  localStorage.setItem('note',JSON.stringify(noteConstructor(content)));
  console.log()
  quill.setContents('');
}

function getNote() {
  let storage = localStorage.getItem('note');
  let content = JSON.parse(storage);
  console.log("content",content);
  quill.setContents(content.content);
  console.log("note", localStorage.getItem('note'));
}

function noteTitle() {
  let title = quill.getContents().ops[0].insert;
  console.log("title",title);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
