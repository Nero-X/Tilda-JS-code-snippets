Number.prototype.toCurrencyString = function() {
    return this.toLocaleString('ru-RU', {
        useGrouping: true,
        maximumFractionDigits: 2
    })
}

function changeStyles() {
    let style = document.createElement("style");
    style.innerHTML = `
      .t706__cartwin-prodamount-wrap {
        font-weight: initial;
        font-size: 14px;
        color: #8B8B8B
      }

      #total-sum-wrap, .t706__product-title a {
        font-weight: initial;
        font-size: initial;
        color: #2e251c !important
      }
    `;
    document.head.appendChild(style);
}

function calcTotalQuantity() {
    let totalQuantity = 0;
    for (let product of tcart.products) {
        if (!product.deleted) totalQuantity += product.quantity * product.portion;
    };
    return totalQuantity;
}
  
function calcDiscount() {
    let totalQuantity = calcTotalQuantity();
    let discount =
        totalQuantity >= 20 && totalQuantity <= 50 ? 10 :
        totalQuantity >= 60 && totalQuantity <= 100 ? 12 :
        totalQuantity >= 110 && totalQuantity <= 300 ? 15 :
        totalQuantity >= 310 ? 20 : 0;
    return discount;
}

function calcSum() {
    let sum = 0;
    for (let product of tcart.products) {
        sum += product.quantity * product.price;
    }
    return sum;
}

function insertDiscountText() {
    let discountText = document.createElement("div");
    discountText.id = "discount-wrap";
    discountText.innerHTML = "Скидка <span id='discount-percent'>0</span>%: -<span id='discounted'>0</span> р.";
    let totalSumText = document.createElement("div");
    totalSumText.id = "total-sum-wrap";
    totalSumText.innerHTML = "Итого: <span id='total-sum'></span> р.";
    $(".t706__cartwin-prodamount").first().after(totalSumText).after(discountText);
}

function setDiscountAndSum() {
    let discount = calcDiscount();
    let sum = tcart.amount;
    let totalSum = sum - sum * discount / 100;
    $("#discount-percent").text(discount.toCurrencyString());
    $("#discounted").text((sum - totalSum).toCurrencyString());
    $("#total-sum").text(totalSum.toCurrencyString());
    $("button.t-submit").click(function() {
        tcart.amount = totalSum;
    });
}

function t_store__prod__quantity_plus_minus_10(prodElem) {
    var e = $(prodElem).find(".t-store__prod__quantity");
    if (e) {
        let input = $(prodElem).find(".t-store__prod__quantity-input")[0];
        let minus = $(prodElem).find(".t-store__prod__quantity__minus-wrapper")[0];
        let plus = $(prodElem).find(".t-store__prod__quantity__plus-wrapper")[0];
        let button = $(prodElem).find(".js-store-prod-btn")[0];
        input.value = 10;
        minus.addEventListener("click", function() {
            input.value = Math.max(10, input.value - 9);
        });
        plus.addEventListener("click", function() {
            input.value = Math.max(10, input.value + 9);
        });
        input.addEventListener("change", function() {
            input.value = Math.max(10, input.value);
        });
        button?.addEventListener("click", function() {
            input.value = Math.max(10, input.value);
        });
    };
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

function removeColorSelect() {
    waitForElms("div.t-product__option[data-edition-option-id=Цвет]").then((elms) => {
        $(elms).remove();
    });
}

function removeLinksToOrder() {
    waitForElms("a[href='#order']:not([class])").then((elms) => {
        $(elms).each(function() {
            $(this).before(this.children);
        }).remove();
    });
}

function updateCartTotalQuantityAndIconCounter() {
    tcart.total = calcTotalQuantity();
    tcart__reDrawCartIcon();
}

$(function() {
    insertDiscountText();
    changeStyles();
    waitForElm(".t-popup .t-store__prod__quantity").then((elm) => {
        t_store__prod__quantity_plus_minus_10(elm.parentNode);
    });
    removeColorSelect();
    removeLinksToOrder();
    let cartObserver = new MutationObserver((changes) => {
        for (const change of changes) {
            // редактирование кол-ва
            if (change.addedNodes.length > 0 && change.addedNodes[0].classList?.contains("t706__product-quantity-inp")) {
                updateCartTotalQuantityAndIconCounter();
            }
            // изменение списка
            else if (change.target.classList.contains("t706__product-quantity") ||
                change.target.classList.contains("t706__cartwin-products")) {
                setDiscountAndSum();
                updateCartTotalQuantityAndIconCounter();
                break;
            };
        };
    });
    cartObserver.observe($(".t706__cartwin-products")[0], {
        childList: true,
        characterData: true,
        subtree: true
    });
    let storeObserver = new MutationObserver((changes) => {
        for (let change of changes) {
            // добавление товаров в каталог
            if (change.target.classList.contains("t951__grid-cont")) {
                for (const elem of change.addedNodes) {
                    if (elem.classList.contains("js-product")) t_store__prod__quantity_plus_minus_10(elem);
                };
                removeColorSelect();
                removeLinksToOrder();
            };
        };
    });
    storeObserver.observe($(".t951")[0], {
        childList: true,
        subtree: true
    });

    // tcart__product__minus_10
    tcart__product__minus = function(t) {
        var e = t.closest(".t706__product")
          , r = e.getAttribute("data-cart-product-i");
        !window.tcart.products[r] && (tcart__syncProductsObject__LStoObj(),
        null == window.tcart.products[r]) || (0 < window.tcart.products[r].quantity && (window.tcart.products[r].quantity -= 10),
        window.tcart.products[r].amount = tcart__roundPrice(window.tcart.products[r].price * window.tcart.products[r].quantity),
        0 < window.tcart.products[r].amount && (e.querySelector(".t706__product-amount").innerHTML = tcart__showPrice(window.tcart.products[r].amount)),
        0 < window.tcart.products[r].amount && "y" === window.tcart.products[r].single && void 0 !== window.tcart.products[r].portion && (e.querySelector(".t706__product-portion").innerHTML = tcart__showWeight(window.tcart.products[r].quantity * window.tcart.products[r].portion, window.tcart.products[r].unit)),
        e.querySelector(".t706__product-quantity").innerHTML = window.tcart.products[r].quantity,
        0 >= window.tcart.products[r].quantity && tcart__product__del(t),
        tcart__updateTotalProductsinCartObj(),
        tcart__reDrawCartIcon(),
        tcart__reDrawTotal(),
        tcart__saveLocalObj())
    };

    // tcart__product__plus_10
    tcart__product__plus = function(t) {
        var e = t.closest(".t706__product")
          , r = e.getAttribute("data-cart-product-i");
        (window.tcart.products[r] || (tcart__syncProductsObject__LStoObj(),
        null != window.tcart.products[r])) && (window.tcart.products[r].quantity > 0 && void 0 !== window.tcart.products[r].inv && window.tcart.products[r].inv > 0 && window.tcart.products[r].inv == window.tcart.products[r].quantity ? alert(tcart_dict("limitReached")) : (window.tcart.products[r].quantity += 10,
        window.tcart.products[r].amount = window.tcart.products[r].price * window.tcart.products[r].quantity,
        window.tcart.products[r].amount = tcart__roundPrice(window.tcart.products[r].amount),
        e.querySelector(".t706__product-quantity").innerHTML = window.tcart.products[r].quantity,
        "y" === window.tcart.products[r].single && void 0 !== window.tcart.products[r].portion && (e.querySelector(".t706__product-portion").innerHTML = tcart__showWeight(window.tcart.products[r].quantity * window.tcart.products[r].portion, window.tcart.products[r].unit)),
        window.tcart.products[r].amount > 0 ? e.querySelector(".t706__product-amount").innerHTML = tcart__showPrice(window.tcart.products[r].amount) : e.querySelector(".t706__product-amount").innerHTML = "",
        tcart__updateTotalProductsinCartObj(),
        tcart__reDrawCartIcon(),
        tcart__reDrawTotal(),
        tcart__saveLocalObj()))
    };
})