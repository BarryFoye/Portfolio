// Back: 
// Gets proxy mode (default:system)
// Sets proxy mode
// Clears proxy mode
// Message receiving <- in and sending response ->
const MODE_FIXED_SERVERS = "fixed_servers";
const MODE_SYSTEM = "system";
const config_SOCKS_5 = {
    mode: "fixed_servers",
    rules: {
        proxyForHttp: {
            scheme: "socks5",
            host: "127.0.0.1",
            port: 9090
        },
        proxyForHttps: {
            scheme: "socks5",
            host: "127.0.0.1",
            port: 9090
        }
    }
};

const config_default = {
    mode: "system"
}

let current_mode = {};

chrome.runtime.onInstalled.addListener(function () {
    console.log("BACK LOADED");
    chrome.proxy.settings.get({
        incognito: false
    }, (details) => {
        current_mode = details.value.mode;
        // chrome.runtime.sendMessage({ "current_mode": current_mode }, (response) => {
        //     if (response) console.log("Backend received: " + JSON.stringify(response));
        // });
    });
});

//do something when a message comes in
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message === "toggle") {
        setMode(current_mode);
    }
    else if (message === "get") {
        chrome.proxy.settings.get({
            incognito: false
        }, (details) => {
            current_mode = details.value.mode;
        });
    }
    else if (message === "clear") {
        console.log("Clearing");
        resetModeToDefault();
    } else {
        console.log("Error");
        resetModeToDefault();
    }
    sendResponse({ "id": "bg_prox_tog", "requested_mode": message, "current_mode": current_mode, "sender": sender });
});


function setMode(curr_mode) {
    if (curr_mode === MODE_SYSTEM) {
        chrome.proxy.settings.set({ value: config_SOCKS_5, scope: 'regular' }, () => {
            console.log("SOCKS5 active!");
            current_mode = MODE_FIXED_SERVERS;
            chrome.runtime.sendMessage({ "current_mode": current_mode }, (response) => {
                if (response) console.log("Backend received: " + JSON.stringify(response));
            });
        });
    }
    else if (curr_mode === MODE_FIXED_SERVERS) {
        chrome.proxy.settings.set({ value: config_default, scope: 'regular' }, () => {
            console.log("Systems defaults active!");
            current_mode = MODE_SYSTEM;
            chrome.runtime.sendMessage({ "current_mode": current_mode }, (response) => {
                if (response) console.log("Backend received: " + JSON.stringify(response));
            });
        });

    }
    else {
        console.log("ERROR: Other proxy settings possibly set.\n\
        Setings have been restored to default");
        resetModeToDefault();
    }
}

function resetModeToDefault() {
    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
        chrome.runtime.sendMessage({ "current_mode": current_mode }, (response) => {
            if (response) console.log("Backend received: " + JSON.stringify(response));
        });
    });
    current_mode = MODE_SYSTEM;
}