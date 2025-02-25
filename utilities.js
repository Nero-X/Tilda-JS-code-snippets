function waitForElm(selector, token = null, timeout = null, parent = document) {
    return new Promise((resolve, reject) => {
        if (parent.querySelector(selector)) {
            return resolve(parent.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (parent.querySelector(selector)) {
                resolve(parent.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(parent, {
            childList: true,
            subtree: true
        });

        if (timeout) setTimeout(function() {
            observer.disconnect();
            reject(new Error("Timeout"));
        }, timeout);

        if (token) token.cancel = function() {
            observer.disconnect();
            reject(new Error("Cancelled"));
        };
    });
}

function waitForElms(selector, parent = document) {
    return new Promise(resolve => {
        if (parent.querySelector(selector)) {
            return resolve(parent.querySelectorAll(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (parent.querySelector(selector)) {
                resolve(parent.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(parent, {
            childList: true,
            subtree: true
        });
    });
}

function waitUntil(conditionFunc, timeout) {
    const poll = resolve => {
        if(conditionFunc()) resolve();
        else setTimeout(_ => poll(resolve), timeout);
    }
    
    return new Promise(poll);
}