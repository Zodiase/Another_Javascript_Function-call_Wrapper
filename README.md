Another_Javascript_Function-call_Wrapper
========================================

A wrapper for Javascript to make function calls more expressive.


## An Example

Original Plain Code

`````Javascript
document.body.addEventListener('click', function (event) {
    console.log(event.type, event.screenX, event.screenY);
});
document.body.addEventListener('mousedown', function (event) {
    console.log(event.type, event.screenX, event.screenY);
});
document.body.addEventListener('mouseup', function (event) {
    console.log(event.type, event.screenX, event.screenY);
});
`````

Wrapped with jQuery

`````Javascript
$(document.body).on('click mousedown mouseup', function (event) {
    console.log(event.type, event.screenX, event.screenY);
});
`````

Helper Function for more Expressive Code

`````Javascript
function handleEvents(eventName, target, handler) {
    $(target).on(eventName, target, handler, handler);
}

handleEvents('click mousedown mouseup', document.body, function (event) {
    console.log(event.type, event.screenX, event.screenY);
});
`````

Helper Function for more Expressive Code

`````Javascript
function handleEvents(eventName, target, handler) {
    $(target).on(eventName, target, handler, handler);
}

handleEvents('click mousedown mouseup', document.body, function (event) {
    console.log(event.type, event.screenX, event.screenY);
});
`````

Helper Function done with *`core_wrap`*

`````Javascript
function handleEvents( eventName, target, handler ) {
    // Filter arguments.
    switch ( typeof eventName ) {
        case 'string':
            break;
        case 'object':
            // flatten object to string
            eventName = flatten( 'values' ).ofObject( eventName ).toString();
            break;
        default:
            eventName = '';
    }
    
    // Generate package.
    return core_wrap( arguments, {
        'select': function ( eventName ) {
            return eventName;
        },
        'on': function ( target ) {
            return target;
        },
        'by': function ( handler ) {
            return handler;
        },
    },  function ( eventName, target, handler ) {
        $( target ).on( eventName, handler );
    } );
}

handleEvents('click mousedown mouseup')
    .on(document.body)
    .by(function (event) {
        console.log(event.type, event.screenX, event.screenY);
    });

// or

handleEvents('click mousedown mouseup')
    .by(function (event) {
        console.log(event.type, event.screenX, event.screenY);
    })
    .on(document.body);

// or

handleEvents().select('click mousedown mouseup')
    .by(function (event) {
        console.log(event.type, event.screenX, event.screenY);
    })
    .on(document.body);
`````
