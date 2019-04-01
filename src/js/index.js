
/*
this file does following things:
    [-] Creates swimlanes dynamically according to configuration mapping that we get from config.js
    [-] Wires up front-end validation events
    [-] Wires up cancel button inside modal
    [-] Wires up the vanilla JS datepicker. See - https://www.npmjs.com/package/js-datepicker
        [--] Main reasons choosing this library
            [---] Relatively popular
            [---] No dependencies
            [---] Vanilla JS love simplicity if you can :)
    [-] Wires up the title field validation
TODO: As a developer, I would like to create a test suite and write some tests
in order to make sure that the code is covered and working.
    [-] Implement test suite
    [-] Write tests
*/


import {SwimlaneMapping} from './config';
import {CreateSwimlaneAndSwimlaneButtons, WireUpDatePicker, WireUpTitleField, WireUpCancelButton} from './init';

for (let i = 0; i < SwimlaneMapping.length; i++) {
    let swimlaneClassName = i === SwimlaneMapping.length - 1 ? 'swimlane last' :  'swimlane notlast';
    
    CreateSwimlaneAndSwimlaneButtons( 
        SwimlaneMapping[i].id, 
        SwimlaneMapping[i].title, 
        swimlaneClassName,
        SwimlaneMapping[i].buttonExists,
        SwimlaneMapping[i].buttonText, 
        SwimlaneMapping[i].buttonClass
    );   
}

WireUpCancelButton();
WireUpDatePicker('#duedateinput');
WireUpTitleField()