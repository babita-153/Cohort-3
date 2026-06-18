const form=document.querySelector("form");
const allTaskDiv=document.querySelector("#alltasks")
const task=document.querySelector(".task");
const theme=document.querySelector(".theme");
const main=document.querySelector("main");
const nav=document.querySelector(".navbar");



const taskArr=[];


const ui=()=>{
      allTaskDiv.innerHTML=""
      taskArr.forEach((elem,index)=>{
         allTaskDiv.innerHTML+=`<div class="task">
           <p><b>Id:</b> <span id="idx">${elem.id}</span></p>
           <h3>Title: <span id="title">${elem.title}</span></h3>
           <h3>Type: <span id="Type">${elem.type}</span></h3>
           <div class="btns">
            <button id="edit" onclick="editTask(${elem.id})">Edit</button>
            <button id="complete" onclick="completeTask(${elem.id}, this)">Complete</button>
            <button id="delete" onclick="deleteTask(${elem.id})">Delete</button>
           </div>
         </div>`
    })
}
let updateIdx=null
form.addEventListener("submit",(events)=>{
   events.preventDefault();
   let title=events.target[0].value;
   let type=events.target[1].value;
   if(title.trim()===""||type.trim()===""){
    alert("please fill all details!")
    return
   }
   const obj={
    id:Date.now(),
    title,
    type
   }
   if(updateIdx!==null){
    taskArr[updateIdx]=obj;
    updateIdx=null
   }
   else{
     taskArr.push(obj)
   }
  
   ui();
   form.reset();
   console.log(events)
})

function editTask(idx){
   const task=taskArr.find((el)=>{
    return el.id===idx;
   });
   updateIdx=taskArr.findIndex((elem)=>{
    return elem.id===idx;
   })
   form[0].value=task.title;
   form[1].value=task.type;
 
}

function completeTask(id,button){
button.style.backgroundColor="green"

}

function deleteTask(id){
  let idx=taskArr.findIndex((el)=>{
    return el.id===id
  })
  taskArr.splice(idx,1);
  ui()
}

theme.addEventListener("click",()=>{
  nav.classList.toggle("dark-nav");
 
 if( main.classList.toggle("dark-theme")){
  theme.textContent="Light Theme"
 }
 else{
  theme.textContent="Dark Theme"
 }
  task.classList.toggle("dark-task");
  allTaskDiv.classList.toggle("dark-theme")
})
 

main.addEventListener("click",()=>{
  console.log("main  click")
})