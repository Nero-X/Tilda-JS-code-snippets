let css = `
    .ver-selected div {
        border-width: thick !important;
    }
`;

function generateGUID(nDigits, base = 10) {
    var guid = "";
    for (var i = 0; i < nDigits; i++) {
      guid += Math.floor(Math.random() * base).toString(base);
    }
    return guid;
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

$(function() {
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    let lang = location.pathname.startsWith('/eng') ? "eng" : "ru";
    let nextBlockId = lang == "eng" ? "#rec804637228" : "#rec801295923";

    waitUntil(() => typeof t_cart__browserLang === "string").then(function() {
        t_cart__browserLang = lang.toUpperCase().slice(0, 2);
    })

    waitUntil(() => typeof t396_isBlockVisible === "function" && t396_isBlockVisible($(nextBlockId)[0]), 500).then(function() {
        let verBtns = $(".t396 .t396__elem[class*=ver]");
        verBtns.on("click", function() {
            verBtns.removeClass("ver-selected");
            $(this).addClass("ver-selected");
        });

        $(".t1093 .v-order").on("click", function(event) {
            event.preventDefault();
            let popup = $(this).closest(".t1093");
            let product = {
                name: popup.find(".t396__elem.name").text(),
                url: location.href,
                img: popup.find(".t396__elem.v-img1 img").attr('src'),
                options: [{
                    option: lang == "ru" ? "Объём" : "Volume",
                    price: 0,
                    variant: popup.find(".ver-selected").text()
                }],
                //uid: generateGUID(10),
                price: ""
            }
            tcart__addProduct(product)
        });
    })
})
