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
div[class*="situation-button-arrow-"] .tn-atom__img {
    transition: transform .3s;
}
div .situation-button-text {
    pointer-events: none;
}
span.gradient {
    color: transparent;
    background-image: linear-gradient(0.912turn, rgba(238, 69, 231, 1) 0%, rgba(128, 52, 248, 1) 100%);
    -webkit-background-clip: text;
}
`;

function selectSituationButton(index, textBlocks, buttonBlocks, buttonArrows){
    $(buttonBlocks[index]).find(".tn-atom").css("background", "none");
    $(buttonArrows[index]).find(".tn-atom__img").css("transform", "rotate(180deg)");
    $(textBlocks[index]).find(".tn-atom").css("opacity", "1");
}

function deselectAllSituationButtons(textBlocks, buttonBlocks, buttonArrows){
    $(buttonBlocks).find(".tn-atom").css("background", "");
    $(buttonArrows).find(".tn-atom__img").css("transform", "");
    $(textBlocks).find(".tn-atom").css("opacity", "0");
}

$(function() {
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    // text gradient
    let spans = [
        ["#rec869953924", "говорят: “здоров”"],
        ["#rec869953924", "плохо себя чувствуешь"],
        ["#rec870668587", "без эмоций"],
        ["#rec870670813", "Методики"],
        ["#rec871079669", "одна коррекция"],
        ["#rec859540749", "Елена Кирий"],
        ["#rec871037305", "принимаю в&nbsp;Краснодаре"],
        ["#rec870670647", "Пространство"],
        ["#rec870670647", "безопасности"],
        ["#rec870424746", "истории"],
        ["#rec870421978", "ловцы солнца и&nbsp;пирсинг"],
        ["#rec870327040", "ответ на"],
        ["#rec870327040", "вопрос"],
        ["#rec870323912", "Контакты"]
    ];
    spans.forEach(element => {
        let html = $(element[0]).html();
        let index = html.indexOf(element[1]);
        if (index > -1) {
            html = `${html.slice(0, index)}<span class="gradient">${element[1]}</span>${html.slice(index + element[1].length)}`;
            $(element[0]).html(html);
        }
    });

    // collect elements
    let textBlocksDict = {};
    let buttonBlocksDict= {};
    let buttonArrowsDict = {};
    waitForElms('div[class^="t396__elem tn-elem situation-"]').then((elms) => {
        $(elms).each((index, element) => {
            let situationClassNameArr = element.className.match(/situation-\S+/)[0].split("-");
            if (situationClassNameArr[1] == "text") {
                textBlocksDict[situationClassNameArr[2]] = element;
            }
            else if (situationClassNameArr[2] >= "0" && situationClassNameArr[2] <= 9) {
                buttonBlocksDict[situationClassNameArr[2]] = element;
            }
            else if (situationClassNameArr[2] == "arrow") {
                buttonArrowsDict[situationClassNameArr[3]] = element;
            }
        });

        // sort
        let textBlocks = [];
        let buttonBlocks= [];
        let buttonArrows = [];
        var keys = Object.keys(buttonBlocksDict);
        keys.sort();
        for (var i=0; i<keys.length; i++) { 
            var key = keys[i];
            textBlocks.push(textBlocksDict[key]);
            buttonBlocks.push(buttonBlocksDict[key]);
            buttonArrows.push(buttonArrowsDict[key]);
        }

        //assign styles
        $(buttonBlocks).css("cursor", "pointer");
        selectSituationButton(0, textBlocks, buttonBlocks, buttonArrows);

        // assign events
        $(buttonBlocks).each((index, element) => {
            $(element).on("click", function() {
                deselectAllSituationButtons(textBlocks, buttonBlocks, buttonArrows);
                selectSituationButton(index, textBlocks, buttonBlocks, buttonArrows);
            })
        })
    });
})
