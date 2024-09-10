const addBtn = document.querySelector("#addBTN");
const main = document.querySelector("#main");

// Event listener for adding a new note
addBtn.addEventListener("click", function() {
    addNote();
    // Add click animation class
    addBtn.classList.add("clicked");
    // Remove the class after the animation ends
    setTimeout(() => {
        addBtn.classList.remove("clicked");
    }, 200); // Duration of the animation (in milliseconds)
});

// Save notes to localStorage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

// Function to add a new note
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("fadeInScale");
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

    const textarea = note.querySelector("textarea");

    // Add border highlight when textarea is focused
    textarea.addEventListener("focus", function() {
        note.classList.add("active");
    });

    // Remove highlight when textarea loses focus
    textarea.addEventListener("blur", function() {
        note.classList.remove("active");
    });

    // Trash icon event listener
    note.querySelector(".trash").addEventListener("click", function() {
        note.remove();
        saveNotes();
    });

    // Save icon event listener
    note.querySelector(".save").addEventListener("click", function() {
        saveNotes();
    });

    // Save notes when textarea loses focus
    textarea.addEventListener("focusout", function() {
        saveNotes();
    });

    // Append the new note to the main container
    main.appendChild(note);
    saveNotes();
};

// Immediately invoked function to load saved notes from localStorage
(function() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
        addNote();
    } else {
        lsNotes.forEach((lsNote) => {
            addNote(lsNote);
        });
    }
})();
