const MODE_FIXED_SERVERS = "fixed_servers";
const MODE_SYSTEM = "system";

function toggle(event) {
    chrome.runtime.sendMessage("toggle", (response) => {
        console.log("Toggle Event: " + JSON.stringify("cm: " + response.current_mode + " rm: " + response.requested_mode));
    });
};
function clear(event) {
    chrome.runtime.sendMessage("clear", (response) => {
        console.log("Clear Event: " + JSON.stringify("cm: " + response.current_mode + " rm: " + response.requested_mode));
    });
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("FRONT LOADED");
    chrome.runtime.sendMessage("get", (response) => {
        console.log(JSON.stringify(response.current_mode));
        setColour(response.current_mode);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    let toggle_button = document.getElementById('t_socks');
    toggle_button.addEventListener('click', toggle);
});
document.addEventListener('DOMContentLoaded', () => {
    let clear_button = document.getElementById('c_socks');
    clear_button.addEventListener('click', clear);
});

//do something when a message comes in
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // let colour = "white";
    // if (message.current_mode === MODE_FIXED_SERVERS) {
    //     colour = "green";
    //     document.getElementById("t_socks").style.backgroundColor = colour;
    // } else {
    //     colour = "red";
    //     document.getElementById("t_socks").style.backgroundColor = colour;
    // }
    setColour(message.current_mode);
    sendResponse({ "id": "fg_prox_tog", "requested_mode": message, "sender": sender });
});

function setColour(mode) {
    let colour = "white";
    if (mode === MODE_FIXED_SERVERS) {
        colour = "green";
        document.getElementById("t_socks").style.backgroundColor = colour;
    } else {
        colour = "red";
        document.getElementById("t_socks").style.backgroundColor = colour;
    }
}