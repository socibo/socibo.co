var sendKey = function(key, element, ctrlKey, altKey, shiftKey, metaKey){
    var event = document.createEvent('KeyboardEvent'); // create a key event
    var initMethod = typeof event.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    // define the event
    event[initMethod]("keypress",       // typeArg,
		       true,             // canBubbleArg,
		       true,             // cancelableArg,
		       null,             // viewArg,  Specifies UIEvent.view. This value may be null.
		       ctrlKey,            // ctrlKeyArg,
		       altKey,            // altKeyArg,
		       shiftKey,            // shiftKeyArg,
		       metaKey,            // metaKeyArg,
		       key,               // keyCodeArg,
		       0);              // charCodeArg);

    element.dispatchEvent(event);
}

var sendChar = function(character, element, ctrlKey, altKey, shiftKey, metaKey){
    var event = document.createEvent('KeyboardEvent'); // create a key event
    var initMethod = typeof event.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    // define the event
    event[initMethod]("keypress",       // typeArg,
		       true,             // canBubbleArg,
		       true,             // cancelableArg,
		       window,             // viewArg,  Specifies UIEvent.view. This value may be null.
		       ctrlKey,            // ctrlKeyArg,
		       altKey,            // altKeyArg,
		       shiftKey,            // shiftKeyArg,
		       metaKey,            // metaKeyArg,
		       0,               // keyCodeArg,
		       character); // charCodeArg

    element.dispatchEvent(event);
}


Podium = {};
Podium.keydown = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
	get : function() {
	    return this.keyCodeVal;
	}
    });
    Object.defineProperty(oEvent, 'which', {
	get : function() {
	    return this.keyCodeVal;
	}
    });

    if (oEvent.initKeyboardEvent) {
	oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
	oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
	alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}



function __triggerKeyboardEvent(el, keyCode)
{
    var eventObj = document.createEventObject ?
	document.createEventObject() : document.createEvent("Events");

    if(eventObj.initEvent){
	eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);

}

function traceEvent(e){
    $(".logs").prepend(jQuery("<li>").html(
	"Key = " + e.keyCode
    ).fadeIn());

    console.log(e);
}

function triggerKeyboardEvent(el, keyCode){
    var keyboardEvent = document.createEvent("KeyboardEvent");

    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


    keyboardEvent[initMethod](
	"keydown",
	true,      // bubbles oOooOOo0
	true,      // cancelable
	window,    // view
	false,     // ctrlKeyArg
	false,     // altKeyArg
	false,     // shiftKeyArg
	false,     // metaKeyArg
	keyCode,
	0          // charCode
    );

    el.dispatchEvent(keyboardEvent);
}
