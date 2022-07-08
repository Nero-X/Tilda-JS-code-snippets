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

      #total-sum-wrap, .t706__product-title a, .t706__cartwin-totalamount-wrap {
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
        totalQuantity >= 20 && totalQuantity < 60 ? 10 :
        totalQuantity >= 60 && totalQuantity < 110 ? 12 :
        totalQuantity >= 110 && totalQuantity < 310 ? 15 :
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
    totalSumText.innerHTML = "Итого: <span class='total-sum'></span> р.";
    $(".t706__cartwin-prodamount").first().after(totalSumText).after(discountText);
}

function setDiscountAndSum() {
    let discount = calcDiscount();
    let sum = tcart.amount;
    let totalSum = sum - sum * discount / 100;
    $("#discount-percent").text(discount.toCurrencyString());
    $("#discounted").text((sum - totalSum).toCurrencyString());
    $(".total-sum").text(totalSum.toCurrencyString());
    $("button.t-submit").click(function() {
        tcart.amount = totalSum;
        tcart.total = calcTotalQuantity();
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
            input.value = Math.max(10, Number(input.value) - 9);
        });
        plus.addEventListener("click", function() {
            input.value = Math.max(10, Number(input.value) + 9);
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

$(function() {
    let cartObserver = new MutationObserver((changes) => {
        for (const change of changes) {
            // изменение списка
            if (change.target.classList.contains("t706__cartwin-totalamount")) {
                change.addedNodes[0].classList.add("total-sum");
                setDiscountAndSum();
                break;
            };
        };
    });
    cartObserver.observe($(".t706")[0], {
        childList: true,
        characterData: true,
        subtree: true
    });
    let storeObserver = new MutationObserver((changes) => {
        for (let change of changes) {
            // добавление товаров в каталог
            if (change.target.classList.contains("t951__grid-cont") &&
                change.addedNodes.length > 0 &&
                change.removedNodes.length == 0) {
                for (const elem of change.addedNodes) {
                    if (elem.classList.contains("js-product")) t_store__prod__quantity_plus_minus_10(elem);
                };
                removeColorSelect();
                removeLinksToOrder();
                break;
            };
        };
    });
    storeObserver.observe($(".t951")[0], {
        childList: true,
        subtree: true
    });
    insertDiscountText();
    changeStyles();
    waitForElms(".t-popup .t-store__prod__quantity").then((elms) => {
        t_store__prod__quantity_plus_minus_10(elms[0].parentNode);
    });
    removeColorSelect();
    removeLinksToOrder();

    // убрать вторую надпись о минимальном кол-ве в корзине
    waitForElms(".t706__cartwin-totalamount-wrap .t706__cartwin-prodamount-mincntorder").then((elms) => {
        elms[0].remove();
    });

    // изменить надпись на второй итоговой сумме
    waitForElms(".t706__cartwin-totalamount-label").then((elms) => {
        elms[0].innerHTML = "Итого: ";
    });
});

$(window).on("load", function() {
    // уменьшение кол-ва на 10
    tcart__product__minus = function(t) {
        var e = t.closest(".t706__product")
          , r = e.getAttribute("data-cart-product-i");
        !window.tcart.products[r] && (tcart__syncProductsObject__LStoObj(),
        null == window.tcart.products[r]) || (0 < window.tcart.products[r].quantity && (window.tcart.products[r].quantity -= 10), // -10
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

    // увеличение кол-ва на 10
    tcart__product__plus = function(t) {
        var e = t.closest(".t706__product")
          , r = e.getAttribute("data-cart-product-i");
        (window.tcart.products[r] || (tcart__syncProductsObject__LStoObj(),
        null != window.tcart.products[r])) && (window.tcart.products[r].quantity > 0 && void 0 !== window.tcart.products[r].inv && window.tcart.products[r].inv > 0 && window.tcart.products[r].inv == window.tcart.products[r].quantity ? alert(tcart_dict("limitReached")) : (window.tcart.products[r].quantity += 10, // +10
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

    // отображение общего кол-ва товаров на счётчике корзины
    tcart__reDrawCartIcon = function() {
        var t = window.tcart
          , e = document.querySelector(".t706__carticon")
          , r = document.querySelector('[data-menu-widgeticon-cart="yes"]');
        t.total = calcTotalQuantity(); // modified
        if (r)
            var o = r.querySelector(".js-carticon-counter");
        if (e) {
            var a = e.querySelector(".js-carticon-counter")
              , c = document.querySelector(".t706__carticon-text");
            1 == t.total && (e.style.opacity = 0,
            e.style.transition = "opacity .3s",
            e.style.opacity = 1)
        }
        if (void 0 !== t.products && t.products.length > 0 && t.total > 0 ? (e && e.classList.add("t706__carticon_showed"),
        a && (a.innerHTML = t.total),
        o && (o.innerHTML = t.total)) : (e && e.classList.remove("t706__carticon_showed"),
        a && (a.innerHTML = ""),
        o && (o.innerHTML = "")),
        a && ("" === tcart__showPrice(window.tcart.prodamount) ? c.style.display = "none" : (c.style.display = "block",
        c.innerHTML = "= " + tcart__showPrice(window.tcart.prodamount))),
        "y" === window.lazy || "yes" === document.querySelector("#allrecords").getAttribute("data-tilda-lazy"))
            try {
                tcart__onFuncLoad("t_lazyload_update", (function() {
                    t_lazyload_update()
                }
                ))
            } catch (t) {
                console.error("js lazyload not loaded")
            }
    };

    tcart__reDrawCartIcon();
})