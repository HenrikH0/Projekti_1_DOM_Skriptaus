const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("todoList");
const error = document.getElementById("error");
const counter = document.getElementById("counter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

render();

form.addEventListener("submit", function(e){
    e.preventDefault();

    const text = input.value.trim();

    if(text.length < 3){
        error.textContent = "Kirjoita vähintään 3 merkkiä.";
        input.classList.add("error");
        return;
    }

    error.textContent = "";
    input.classList.remove("error");

    todos.push({
        text: text,
        done: false
    });

    save();
    input.value="";
});

function render(filter="all"){

    list.innerHTML="";

    let activeCount = 0;

    todos.forEach((todo,index)=>{

        if(!todo.done){
            activeCount++;
        }

        if(filter==="active" && todo.done) return;
        if(filter==="done" && !todo.done) return;

        const li=document.createElement("li");

        if(todo.done){
            li.classList.add("done");
        }

        const span=document.createElement("span");
        span.textContent=todo.text;

        const buttons=document.createElement("div");
        buttons.className="task-buttons";

        const doneBtn=document.createElement("button");
        doneBtn.textContent="✔";

        doneBtn.onclick=function(){
            todo.done=!todo.done;
            save();
        };

        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="🗑";

        deleteBtn.onclick=function(){
            todos.splice(index,1);
            save();
        };

        buttons.appendChild(doneBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttons);

        list.appendChild(li);

    });

    counter.textContent=activeCount;
}

function save(){
    localStorage.setItem("todos",JSON.stringify(todos));
    render();
}

document.getElementById("showAll").onclick=function(){
    render("all");
}

document.getElementById("showActive").onclick=function(){
    render("active");
}

document.getElementById("showDone").onclick=function(){
    render("done");
}