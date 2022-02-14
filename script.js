// local storage function

const updateLocalStorage = () => {
// get all the data entered in textareas
      const textareaData = document.querySelectorAll('textarea');
// since by using querySelectorAll, we get data in form of array, thus, make an array to store data.
      const notesInput = [];

      textareaData.forEach((currentNote)=>{
      notesInput.push(currentNote.value);
      })
// localStorage.setItem() is used to store some data in local storage and .getItem is used to get stored data from local storage
      localStorage.setItem('notesInput', JSON.stringify(notesInput));
}

// taking reference of add button
      const add = document.querySelector('#add');

      const addNewNode = (text = '') => {
      const notes = document.querySelector('.notes');

// on clicking add button, a note div is created dynamically
      const note = document.createElement('div');
      note.classList.add('note');
      const htmlData = `
      <div class="operation">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>  `;

// adding the upper written HTML to the note div.
      note.insertAdjacentHTML('afterbegin', htmlData);

// adding dynamically created note div in the notes div created in index.html
      notes.appendChild(note);

// getting references of all options within note div
      const edit = note.querySelector('.edit');
      const del = note.querySelector('.delete');
      const main = note.querySelector('.main');
      const textarea = note.querySelector('textarea');

// deleting the note on clicking del button
      del.addEventListener('click', () => {
            note.remove()
            updateLocalStorage();
      })

// toggle using edit button
      textarea.value = text;
      main.innerHTML = text;
      edit.addEventListener('click', () => {
      main.classList.toggle('hidden');
      textarea.classList.toggle('hidden');
})

// get element that is entered in textarea and store it in main div as well
      textarea.addEventListener('change', (event) => {
      const input = event.target.value;
      main.innerHTML = input;

      updateLocalStorage();
})
}

// getting data from local storage
      const notesInLS = JSON.parse(localStorage.getItem     ('notesInput'));
      if(notesInLS){notesInLS.forEach((note)=>addNewNode(note))}

      add.addEventListener('click', ()=>addNewNode());