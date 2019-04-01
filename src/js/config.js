/*
This file has the configuration of swimlanes that we need to draw on the page:
    [-] Metadata about swimlanes
    [-] Metadata about swimlane create task buttons
    [-] Metadata about tasks that can be created inside swimlanes
    [-] Metadata about task buttons
This file also contains constants in order to prevent typos.

TODO: As a user, I would like to add and remove swimlanes
in order to customize the workflow according to my needs
    [-] Make a UI to edit the confirguration below.
*/

export const ADD = 'add';
export const EDIT = 'edit';
export const DELETE = 'delete';
export const MOVE = 'move';

export const BACKWARD = 'backward';
export const FORWARD = 'forward';

export const SwimlaneMapping = [
    {
        id: 1,
        title: 'Backlog',
        buttonExists: true,
        buttonText: 'Create Task',
        buttonClass: 'bg__blue',
        dueDateClass: 'swimlane__task__duedate purple',
        iconClassName: 'swimlane__task__duedateicon fas fa-calendar-day',
        taskButtons: [{
            text: 'Start',
            behavior: FORWARD,
            class: 'taskbutton taskbutton__full taskbutton__purple'
        }]
    },
    {
        id: 2,
        title: 'In Progress',
        buttonExists: true,
        buttonText: 'Create Task',
        buttonClass: 'bg__purple',
        dueDateClass: 'swimlane__task__duedate purple',
        iconClassName: 'swimlane__task__duedateicon fas fa-calendar-day',
        taskButtons: [{
            text: 'Backlog',
            behavior: BACKWARD,
            class: 'taskbutton taskbutton__half taskbutton__half__left taskbutton__blue'
        },
        {
            text: 'Complete',
            behavior: FORWARD,
            class: 'taskbutton taskbutton__half taskbutton__half__right taskbutton__green'
        }]
    },
    {
        id: 3,
        title: 'Completed',
        buttonExists: false,
        dueDateClass: 'swimlane__task__duedate green',
        iconClassName: 'swimlane__task__duedateicon fas fa-check',
        taskButtons: [{
            text: 'Undo',
            behavior: BACKWARD,
            class: 'taskbutton taskbutton__full taskbutton__blue'
        }]
    }
]