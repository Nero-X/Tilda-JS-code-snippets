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

let css = `
.disabled-button {
    pointer-events: none;
    opacity: .4;
}
`;

$(function() {
    let maxQuantity = 99;

    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    // Product card buttons
    waitForElms(".js-store-prod-btn2").then((elms) => {
        $(elms).on("click", function(event) {
            let productCard = $(this).parents(".t-store__card");
            let productUID = productCard.attr("data-product-uid");
            tcart.products.forEach(product => {
                if (product.uid == productUID && product.quantity >= maxQuantity - 1) {
                    event.preventDefault();
                    product.quantity = maxQuantity;
    
                    // delete standart popup
                    waitForElms(".t706__bubble-container").then((elms) => {
                        elms[0].innerHTML = "";
                    })
                   //$(".t706__bubble-container")[0].innerHTML = "";
    
                    // show popup
                    console.log("blocked");
    
                    // redraw & save
                    tcart__updateTotalProductsinCartObj();
                    tcart__reDrawCartIcon();
                    tcart__reDrawTotal();
                    tcart__saveLocalObj();
                }
            });
        })
    })
    
    // Cart plus buttons t706__product-plus
    let cartObserver = new MutationObserver((changes) => {
        for (const change of changes) {
            // изменение кол-ва товара
            if (change.target.classList.contains("t706__product-quantity")) {
                if (change.target.innerText >= maxQuantity) {
                    change.target.nextSibling.classList.add("disabled-button");
                }
                else change.target.nextSibling.classList.remove("disabled-button");
                break;
            };
        };
    });
    cartObserver.observe($(".t706")[0], {
        childList: true,
        characterData: true,
        subtree: true
    });
})