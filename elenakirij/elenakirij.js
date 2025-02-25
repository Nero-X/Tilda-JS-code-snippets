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

let css = `
div[class*="situation-button-arrow-"] {
    transition: transform 1s;
}
.situation-button-text {
    pointer-events: none;
}
`;

$(function() {
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    let textBlocks, buttonBlocks, buttonArrows = [];
    waitForElms('div[class^="t396__elem tn-elem situation-"]').then((elms) => {
        $(elms).each((index, element) => {
            switch (this.className.match(/situation-/)) {
                case value:
                    
                    break;
            
                default:
                    break;
            }
        })
        let textRegex = /situation-text-\d+/;
        let elmsArray = Array.from(elms);
        textBlocks = elmsArray.sort((a, b) => a.className.match(textRegex)[0].split('-').slice(-1) - b.className.match(textRegex)[0].split('-').slice(-1));
    });





    waitForElms('div[class^="t396__elem tn-elem situation-text-"]').then((elms) => {
        let textRegex = /situation-text-\d+/;
        let elmsArray = Array.from(elms);
        textBlocks = elmsArray.sort((a, b) => a.className.match(textRegex)[0].split('-').slice(-1) - b.className.match(textRegex)[0].split('-').slice(-1));
    });
    waitForElms('div[class^="t396__elem tn-elem situation-button-"]').then((elms) => {
        let buttonRegex = /situation-button-\d+/;
        let elmsArray = Array.from(elms);
        console.log(elmsArray);
        buttonBlocks = elmsArray.sort((a, b) => a.className.match(buttonRegex)[0].split('-').slice(-1) - b.className.match(buttonRegex)[0].split('-').slice(-1));
    });
    waitForElms('div[class^="t396__elem tn-elem situation-button-arrow-"]').then((elms) => {
        let arrowRegex = /situation-button-arrow-\d+/;
        let elmsArray = Array.from(elms);
        buttonArrows = elmsArray.sort((a, b) => a.className.match(arrowRegex)[0].split('-').slice(-1) - b.className.match(arrowRegex)[0].split('-').slice(-1));
    });

    waitUntil(() => textBlocks !== undefined && buttonBlocks !== undefined && buttonArrows !== undefined, 1000).then(() => {
        $(buttonBlocks).each((index, element) => {
            $(element).on("click", function() {
                $(buttonBlocks).find(".tn-atom").css("background", "");
                $(buttonArrows).find(".tn-atom__img").css("transform", "");
                $(textBlocks).find(".tn-atom").css("opacity", "0");
    
                $(element).find(".tn-atom").css("background", "none");
                $(buttonArrows[index]).find(".tn-atom__img").css("transform", "rotate(180deg)");
                $(textBlocks[index]).find(".tn-atom").css("opacity", "1");
            })
        })
    })
})