const notescontainer = document.querySelector(".notes-container");
const createbutton = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
const resetButton = document.querySelector("h1");

function clearNotes(){
    notescontainer.innerHTML = "";
    localStorage.removeItem("notes");
}

function showNotes(){
    notescontainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes", notescontainer.innerHTML);
}

createbutton.addEventListener("click", () => {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    inputbox.appendChild(img);
    notescontainer.appendChild(inputbox);
});

notescontainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        const inputbox = e.target.parentElement;
        inputbox.classList.add("delete-animation");
        setTimeout(() => {
            inputbox.remove();
            updateStorage();
        }, 500);
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        });
    }
});

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

resetButton.addEventListener("click", () => {
    clearNotes();
});