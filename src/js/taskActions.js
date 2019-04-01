/*
this file wires up the task actions
    [-] Creates Task
    [-] Edits Task
    [-] Moves Task
    [-] Deletes Task    
*/

import {ADD, EDIT, DELETE, MOVE} from './config'
import {Observable, TaskOperations} from './taskObserver'

const taskObserver = new Observable();

taskObserver.subscribe(TaskOperations);

/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
*/
export function CreateTask (swimlaneId) {
    taskObserver.notify(swimlaneId, null, null, ADD);
}

/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] taskId: Id of the task that is going to be edited - integer
*/
export function EditTask (swimlaneId, taskId) {
    taskObserver.notify(swimlaneId, taskId, null, EDIT);
}

/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] futureSwimlaneId: target swimlane to move task - integer
    [-] taskId: Id of the task that is going to be edited - integer
*/
export function MoveTask (swimlaneId, futureSwimlaneId, taskId) {
    taskObserver.notify(swimlaneId, taskId, futureSwimlaneId, MOVE);
}

/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] taskId: Id of the task that is going to be edited - integer
*/
export function DeleteTask (swimlaneId, taskId) {
    taskObserver.notify(swimlaneId, taskId, null, DELETE);
}
