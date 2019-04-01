/*
Initial wiring up - under the hood
This file does the following:
    [-] Create swimlanes
    [-] Create buttons if swimlane has button
    [-] Wires up the cancel button inside the modal
    [-] Wires up the datepicker inside the modal
    [-] Wires up the eventlisteners for input and duedate fields
*/

import {OpenModal, CloseModal} from './modalActions';
import datepicker from 'js-datepicker';

/*
Parameters:
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] swimlaneTitle: Text of the swimlane element that's gonna get created - string
    [-] swimlaneClassname: Class of the swimlane element that's gonna get created - string
    [-] buttonExists: A flag that indicates if swimlane has a button or not - boolean
    [-] OPTIONAL - buttonText: Text of the button that's gonna get created - string
    [-] OPTIONAL - buttonClass: Class of the button that's gonna get created - string
*/
export function CreateSwimlaneAndSwimlaneButtons (
    swimlaneId, swimlaneTitle, swimlaneClassname, buttonExists, buttonText, buttonClass) { 

        const wrapper = document.querySelector('.wrapper');
        
        const swimlane = document.createElement('div');
        const swimlaneHeader = document.createElement('div');

        swimlane.className = swimlaneClassname;
        
        swimlane.id = swimlaneId,
        swimlaneHeader.className = 'swimlane__title headerfont';
        swimlaneHeader.textContent = swimlaneTitle;
        swimlane.insertBefore(swimlaneHeader, swimlane.lastChild);

        if(buttonExists) {
            CreateButton(`createbutton headerfont ${buttonClass}`, swimlaneId, swimlane, buttonText)
        }
        else {
            
            const dummyDiv = document.createElement('div');

            dummyDiv.className = 'dummydiv';
            swimlane.appendChild(dummyDiv);
        }

        wrapper.appendChild(swimlane);
}

/*
Parameters:
    [-] query: query to find element(s) to add event listeners for date picker widget - string
    [-] createBtn: create button inside modal to control the validation
    [-] elems: elems array for validatation
*/
export function WireUpDatePicker (query) {
    const submitBtn = document.querySelector('#submit');
    const elems = [document.querySelector('#titleinput'), document.querySelector('#duedateinput')];

    const options = {year: 'numeric', month: 'short', day: 'numeric' };
    datepicker(query, 
    {
        formatter: (input, date) => {
          const value = date.toLocaleDateString('en-US', options);
          input.value = value;
        },
        onSelect: Validation.bind(null, submitBtn, elems)
    });
}

export function WireUpCancelButton () {

    const cancelBtn = document.querySelector('#cancel');

    cancelBtn.onclick = CloseModal.bind();
}

/*
Parameters:
    [-] submitBtn: create button inside modal to control the validation - object
    [-] elems: elems array for validatation - object array
*/
export function WireUpTitleField () {
    const submitBtn = document.querySelector('#submit');
    const elems = [document.querySelector('#titleinput'), document.querySelector('#duedateinput')];

    elems[0].oninput = Validation.bind(null, submitBtn, elems);
}

/*
Parameters:
    [-] submitBtn: create button inside modal to control the validation - object
    [-] elems: elems array for validatation - object array 
*/
const Validation = (submitBtn, elems) => {

    for(let i = 0; i < elems.length; i++) {
        if(!elems[i].value.length > 0) {
            submitBtn.disabled = true;
            return;
        }
    }

    submitBtn.disabled = false;
}

/*
Parameters:
    [-] buttonClassname: Class of the button element that's gonna get created - string
    [-] swimlaneId: Id of the swimlane element that's gonna get created - integer
    [-] swimlane: Swimlane div element that we append button - object
    [-] buttonText: Text of the button that's gonna get created - string
*/
const CreateButton = (buttonClassname, swimlaneId, swimlane, buttonText) => {
    
    const createBtn = document.createElement('button');

    createBtn.className = buttonClassname;
    createBtn.textContent = buttonText;
    createBtn.onclick = OpenModal.bind(null, swimlaneId);
    swimlane.appendChild(createBtn);
}

