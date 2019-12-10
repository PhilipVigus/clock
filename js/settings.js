'use strict';

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
} else {
    // Too bad, no localStorage for us
    alert("Not OK");
}

// populate the page with either stored values or defaults
retrieveStoredValues();

// function copied from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {

    let storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function retrieveStoredValues() {

    if (!localStorage.getItem("clock-dig-format") || localStorage.getItem("clock-dig-format") === "12h") {
        // the setting isn't present, or it was found to be 12h
        document.getElementsByName("time-format")[0].checked = true;
    } else {
        // the setting was found to be 24h
        document.getElementsByName("time-format")[1].checked = true;
    }
}

function saveValuesToLocalStorage() {

    // store the time format value according to which radio button is checked
    if (document.getElementsByName("time-format")[0].checked === true) {
        localStorage.setItem("clock-dig-format", "12h");
    } else {
        localStorage.setItem("clock-dig-format", "24h");
    }
}

// wipes all of the data storage for this domain
function clearStoredValues() {
    localStorage.clear();
    retrieveStoredValues();
}
