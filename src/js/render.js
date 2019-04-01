/*
This file is responsible for re rendering swimlanes when task action happen
*/

import { SwimlaneMapping, FORWARD } from './config';
import { OpenModalEdit } from './modalActions';
import { MoveTask } from './taskActions';


/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] tasks: Array that keeps track of the task list - objectArray
*/
export function RenderSwimlane (swimlaneId, tasks) {

    const swimlane = document.querySelector(`#\\3${swimlaneId}`);
    const activeSwimlane = SwimlaneMapping.filter(x => x.id == swimlaneId)[0];

    let activeTasks = swimlane.querySelectorAll('.swimlane__task');

    if(activeTasks) {
        activeTasks.forEach(activeTask => {
            activeTask.parentNode.removeChild(activeTask);
        });
    }
    
    tasks.forEach(task => {
        if(task.swimlaneId === swimlaneId) {

            //Create task div
            const taskDiv = document.createElement('div');
            taskDiv.className = 'swimlane__task';

            //Create wrapper div
            const taskMetaWrapper = document.createElement('div');
            taskMetaWrapper.id = task.id;

            //Create task header
            const taskHeader = document.createElement('div');
            taskHeader.className = 'swimlane__task__header';
            taskHeader.textContent = task.title;
            
            //Create task description
            const taskDescription = document.createElement('div');
            taskDescription.className = 'swimlane__task__description';
            taskDescription.textContent = task.description;

            //Create due date field
            const dueDateWrapper = document.createElement('div');
            dueDateWrapper.className = activeSwimlane.dueDateClass;
            
            const icon = document.createElement('i');
            icon.className = activeSwimlane.iconClassName;
            
            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = task.dueDate;
            
            dueDateWrapper.appendChild(icon);
            dueDateWrapper.appendChild(dueDateSpan);


            //Append elements
            taskMetaWrapper.appendChild(taskHeader);
            taskMetaWrapper.appendChild(taskDescription);
            taskMetaWrapper.appendChild(dueDateWrapper);

            //wiring wrapper div for editing
            taskMetaWrapper.onclick = OpenModalEdit.bind(null, swimlaneId, task);

            taskDiv.appendChild(taskMetaWrapper);

            swimlane.insertBefore(taskDiv, swimlane.lastChild);  

            //Create buttons
            activeSwimlane.taskButtons.forEach(taskbutton => {
                const button = document.createElement('button');
                button.className = taskbutton.class;
                button.textContent = taskbutton.text;

                //Figure out future swimlane
                let futureSwimlaneId = taskbutton.behavior === FORWARD ? swimlaneId + 1 : swimlaneId - 1
                
                //Wiring up move buttons
                button.onclick = MoveTask.bind(null, swimlaneId, futureSwimlaneId, task.id);
                taskDiv.appendChild(button);
            })

            swimlane.insertBefore(taskDiv, swimlane.lastChild);
        }
    })

}