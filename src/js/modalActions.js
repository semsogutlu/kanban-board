/*
this file controls the modal actions
    [-] Opens modal
    [-] Opens modal with exisiting task info to edit or delete
    [-] Closes Modal
*/

import {CreateTask, EditTask, DeleteTask} from './taskActions'


/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
*/
export function OpenModal (swimlaneId) {
    const modal = document.querySelector('.modal');
    const submitBtn = document.querySelector('#submit');

    modal.style.display = 'block';
    submitBtn.onclick = CreateTask.bind(null, swimlaneId)
    
}

/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] task: existing task list - object array
*/
export function OpenModalEdit (swimlaneId, task) {

    const modal = document.querySelector('.modal');
    const submitBtn = document.querySelector('#submit');
    const deleteBtn = document.querySelector('#delete');
    const titleField = document.querySelector('#titleinput');
    const descriptionField = document.querySelector('#descriptioninput');
    const dueDateField = document.querySelector('#duedateinput');

    deleteBtn.style.display = 'inline-block';
    modal.style.display = 'block';
    titleField.value = task.title;
    descriptionField.value = task.description;
    dueDateField.value = task.dueDate;
    submitBtn.textContent = 'Save';
    submitBtn.disabled = false;
    submitBtn.onclick = EditTask.bind(null, swimlaneId, task.id);
    deleteBtn.onclick = DeleteTask.bind(null, swimlaneId, task.id);
    
}

export function CloseModal () {
    
    const modal = document.querySelector('.modal');

    modal.style.display = 'none';
}