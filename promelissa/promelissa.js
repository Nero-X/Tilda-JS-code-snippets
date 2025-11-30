let css = `
    .popup-horizontal
    {
        display: flex;
        align-items: center;
        max-width: 1200px;
    }

    .popup-horizontal img
    {
        width: 50% !important;
    }

    .popup-horizontal button
    {
        background-image: url(https://optim.tildacdn.com/tild3330-3665-4636-a661-356561313666/-/format/webp/Vector_1.png.webp);
        background-size: 25%;
        background-repeat: no-repeat;
        background-position-x: center;
    }
`;

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

if (document.readyState !== 'loading') {
    transformPopup();
  } else {
    document.addEventListener('DOMContentLoaded', transformPopup);
  }

function appendStyle(css)
{
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
}

function transformPopup()
{
    appendStyle(css);
    waitForElm("#rec1108298891 .t-popup__container").then((elm) => {
        elm.classList.add("popup-horizontal");
    })
}