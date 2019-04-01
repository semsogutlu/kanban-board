/*
This file is used for wiring up the observer subscriptions.
Every time a task created/deleted/edited or moved notify function gets triggered.

for more info about observer pattern click here:
https://pawelgrzybek.com/the-observer-pattern-in-javascript-explained/

TODO: As a developer, I would like to wire a backend service or indexedDB
in order to maintain the task statuses after browser gets closed.
    [-] Wire up indexedDB or backend.
*/


import {ADD, EDIT, DELETE, MOVE} from './config'
import {RenderSwimlane} from './render';


export class Observable {
    constructor() {
      this.observer = ''
      this.tasks = [];
    }
    subscribe(f) {
      this.observer = f;
    }
  
    notify(swimlaneId, taskId, futureSwimlaneId, actionType) {
        this.observer(this.tasks, swimlaneId, taskId, futureSwimlaneId, actionType)
    }
}

/*
Parameters:
    [-] tasks: Array that keeps track of the task list - objectArray
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] OPTIONAL - taskId: Id of the task that is going to be edited/deleted - integer
    [-] OPTIONAL - futureSwimlaneId: target swimlane to move task - integer
    [-] actionType: add edit move or delete - string
*/
export function TaskOperations (tasks, swimlaneId, taskId, futureSwimlaneId, actionType) {
    
    switch (actionType) {
        case ADD:
            AddTask(tasks, swimlaneId);
            break;
        case EDIT:
            EditTask(tasks, swimlaneId, taskId);
            break;
        case MOVE:
            MoveTask(tasks, swimlaneId, taskId, futureSwimlaneId)
            break;
        case DELETE:
            DeleteTask(tasks, swimlaneId, taskId);
            break;
    }
}

/*
Parameters:
    [-] tasks: Array that keeps track of the task list - objectArray
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
*/
const AddTask = (tasks, swimlaneId) => {

    const titleField = document.querySelector('#titleinput');
    const descriptionField = document.querySelector('#titleinput');
    const dueDateField = document.querySelector('#duedateinput');
    
    tasks.push({
        id: new Date().getTime(),
        swimlaneId,
        title: titleField.value,
        description: descriptionField.value,
        dueDate: dueDateField.value
    })

    RenderSwimlane(swimlaneId, tasks);

    CloseModal(titleField, descriptionField, dueDateField);
} 

/*
Parameters:
    [-] tasks: Array that keeps track of the task list - objectArray
    [-] swimlaneId: Id of the swimlane element that's gonna be edited - integer
    [-] taskId: Id of the task that is going to be edited - integer
*/
const EditTask = (tasks, swimlaneId, taskId) => {

    const titleField = document.querySelector('#titleinput');
    const descriptionField = document.querySelector('#titleinput');
    const dueDateField = document.querySelector('#duedateinput');

    let taskToBeEdited;
    for( let i = 0; i < tasks.length; i++){ 
        if ( tasks[i].id === taskId) {
            taskToBeEdited = tasks.splice(i, 1)[0]; 
        }
    }

    taskToBeEdited.title = titleField.value;
    taskToBeEdited.description = descriptionField.value;
    taskToBeEdited.dueDate = dueDateField.value;
    tasks.push(taskToBeEdited)


    tasks.sort((a,b) => a.id > b.id ? 1 : -1);

    RenderSwimlane(swimlaneId, tasks);

    CloseModal();
} 

/*
Parameters:
    [-] tasks: Array that keeps track of the task list - objectArray
    [-] swimlaneId: Id of the source swimlane element  - integer
    [-] taskId: Id of the task that is going to be edited - integer
    [-] futureSwimlaneId: Id of the target swimlane element  - integer
*/
const MoveTask = (tasks, swimlaneId, taskId, futureSwimlaneId) => {

    let taskToBeMoved;

    for( let i = 0; i < tasks.length; i++){ 
        if ( tasks[i].id === taskId) {
            taskToBeMoved = tasks.splice(i, 1)[0]; 
        }
    }

    taskToBeMoved.swimlaneId = futureSwimlaneId;
    tasks.push(taskToBeMoved)


    tasks.sort((a,b) => a.id > b.id ? 1 : -1);
    
    //render source swimlane
    RenderSwimlane(swimlaneId, tasks);
    //render target swimlane
    RenderSwimlane(futureSwimlaneId, tasks);
} 

/*
Parameters:
    [-] tasks: Array that keeps track of the task list - objectArray
    [-] swimlaneId: Id of the swimlane element that's gonna be deleted - integer
    [-] taskId: Id of the task that is going to be deleted - integer
*/
const DeleteTask = (tasks, swimlaneId, taskId) => {

    for( let i = 0; i < tasks.length; i++){ 
        if ( tasks[i].id === taskId) {
            tasks.splice(i, 1); 
        }
    }

    RenderSwimlane(swimlaneId, tasks);
    CloseModal();
} 


const CloseModal = () => {
    
    const titleField = document.querySelector('#titleinput');
    const descriptionField = document.querySelector('#descriptioninput');
    const dueDateField = document.querySelector('#duedateinput');
    const modal = document.querySelector('.modal');
    const deleteBtn = document.querySelector('#delete');
    const submitBtn = document.querySelector('#submit');

    titleField.value = '';
    descriptionField.value = '';
    dueDateField.value = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Create';
    deleteBtn.style.display = 'none';
    modal.style.display = 'none';
}