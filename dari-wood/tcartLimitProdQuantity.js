// Максимальное суммарное кол-во товаров в корзине
const CartMaxTotal = 99;

// Функция, вызываемая при превышении CartMaxTotal 
function onlimitQuantity(){
    t390_showPopup("870829788");
}

$(function() {
    t_onFuncLoad("tcart__addProduct", function() {
        tcart__addProduct = function(t) {
            var e = Math.floor(Date.now() / 1e3)
              , r = document.querySelector(".t706__carticon");
            tcart__syncProductsObject__LStoObj();
            var o = window.tcart.products || [];
    
            // Ограничение суммарного кол-ва товаров в заказе
            if (tcart.total + (t.quantity || 1) > CartMaxTotal) {
                onlimitQuantity();
                return;
            }
    
            if (window.tcart__quantityProductsByUid = {},
            window.tcart__quantityProductsByUid[t.uid] || (window.tcart__quantityProductsByUid[t.uid] = 0),
            o.forEach((function(e) {
                e.uid && t.uid && e.uid === t.uid && (window.tcart__quantityProductsByUid[t.uid] += parseInt(e.quantity, 10))
            }
            )),
            t.quantity && (window.tcart__quantityProductsByUid[t.uid] += parseInt(t.quantity, 10)),
            parseInt(window.tcart__quantityProductsByUid[t.uid]) > parseInt(t.inv, 10))
                return alert(tcart_dict("limitReached")),
                !1;
            var a = !1
              , n = !1;
            if (o.length > 0 && Array.prototype.forEach.call(o, (function(r, o) {
                var i = "y"
                  , c = "";
                if ("y" == window.tcart_oneproduct) {
                    if (r.name == t.name && r.price == t.price) {
                        if (null == r.options && null == t.options && null == r.sku && null == t.sku)
                            return a = !0,
                            !1;
                        if (null == r.options && null == t.options && null != r.sku && null != t.sku && r.sku == t.sku)
                            return a = !0,
                            !1;
                        if ("object" == typeof r.options && "object" == typeof t.options && (Array.prototype.forEach.call(r.options, (function(e, r) {
                            if ("object" == typeof e && "object" == typeof t.options[r]) {
                                if (e.option !== t.options[r].option || e.variant !== t.options[r].variant || e.price !== t.options[r].price)
                                    return i = !1
                            } else if (null == e || null == t.options[r])
                                return i = !1
                        }
                        )),
                        r.sku === t.sku && (c = "y"),
                        "y" === i && "y" === c))
                            return parseInt(window.tcart.products[o].quantity, 10) === parseInt(t.inv, 10) && alert(tcart_dict("limitReached")),
                            a = !0,
                            !1
                    }
                } else {
                    if (t.options && r.options && Object.keys(t.options).length !== Object.keys(r.options).length)
                        return i = !1;
                    if (r.name == t.name && r.price == t.price && r.portion == t.portion && r.single == t.single) {
                        if ("object" == typeof r.options && "object" == typeof t.options && Array.prototype.forEach.call(r.options, (function(e, r) {
                            if ("object" == typeof e && "object" == typeof t.options[r]) {
                                if (e.option !== t.options[r].option || e.variant !== t.options[r].variant || e.price !== t.options[r].price)
                                    return i = !1
                            } else if (void 0 === e || void 0 === t.options[r])
                                return i = !1
                        }
                        )),
                        r.sku === t.sku)
                            c = "y";
                        else if (r.uid && t.uid && r.uid === t.uid) {
                            n = !0,
                            a = !0;
                            var d = parseInt(t.inv, 10), s;
                            if ((s = parseInt(window.tcart.products[o].quantity, 10)) === d)
                                return void alert(tcart_dict("limitReached"));
                            window.tcart.products[o].quantity++
                        }
                        if ("y" === i && "y" === c) {
                            var d = parseInt(t.inv, 10), u = parseInt(t.quantity, 10), s;
                            if ((s = parseInt(window.tcart.products[o].quantity, 10)) === d)
                                return alert(tcart_dict("limitReached")),
                                a = !0,
                                !1;
                            if (void 0 !== t.quantity)
                                if (s + u > d)
                                    alert(tcart_dict("limitReached")),
                                    a = !0,
                                    window.tcart.products[o].quantity = d;
                                else {
                                    var l = parseInt(window.tcart.products[o].quantity, 10) + u;
                                    window.tcart.products[o].quantity = l,
                                    tcart__showBubble(t.name + " " + tcart_dict("youAdd"))
                                }
                            else
                                window.tcart.products[o].quantity++,
                                tcart__showBubble(t.name + " " + tcart_dict("youAdd"));
                            return window.tcart.products[o].amount = window.tcart.products[o].price * window.tcart.products[o].quantity,
                            window.tcart.products[o].amount = tcart__roundPrice(window.tcart.products[o].amount),
                            window.tcart.products[o].ts = e,
                            a = !0,
                            !1
                        }
                    } else if (r.uid && t.uid && r.uid === t.uid && ("object" == typeof r.options && "object" == typeof t.options ? Array.prototype.forEach.call(r.options, (function(e, r) {
                        if ("object" == typeof e && "object" == typeof t.options[r]) {
                            if (e.option !== t.options[r].option || e.variant !== t.options[r].variant)
                                return i = !1
                        } else if (void 0 === e || void 0 === t.options[r])
                            return i = !1
                    }
                    )) : i = "y",
                    "y" === i)) {
                        var d = parseInt(t.inv, 10), u = parseInt(t.quantity, 10), s;
                        if ((s = parseInt(window.tcart.products[o].quantity, 10)) === d)
                            return alert(tcart_dict("limitReached")),
                            n = !0,
                            a = !0,
                            !1;
                        if (void 0 !== t.quantity)
                            if (s + u > d)
                                alert(tcart_dict("limitReached")),
                                n = !0,
                                a = !0,
                                window.tcart.products[o].quantity = d;
                            else {
                                var l = parseInt(window.tcart.products[o].quantity, 10) + u;
                                window.tcart.products[o].quantity = l
                            }
                        else
                            window.tcart.products[o].quantity++;
                        return window.tcart.products[o].price = 0,
                        window.tcart.products[o].amount = 0,
                        window.tcart.products[o].ts = e,
                        n = !0,
                        a = !0,
                        !1
                    }
                }
            }
            )),
            !a) {
                if (void 0 === t.quantity ? (t.quantity = 1,
                t.amount = t.price) : t.amount = tcart__roundPrice(t.price * t.quantity),
                t.ts = e,
                "" === t.pack_m || 0 === parseInt(t.pack_m, 10)) {
                    var i = !1
                      , c = 0;
                    ["GRM", "KGM", "TNE"].forEach((function(e, r) {
                        e === t.unit && (i = !0,
                        c = r)
                    }
                    )),
                    i && (t.pack_m = t.portion * Math.pow(1e3, c))
                }
                window.tcart.products.push(t),
                tcart__showBubble(t.name + " " + tcart_dict("youAdd"))
            }
            tcart__updateTotalProductsinCartObj(),
            tcart__reDrawCartIcon(),
            tcart__saveLocalObj(),
            n && tcart__updateProductsPrice(!0);
            var d = document.querySelector(".t706")
              , s = document.querySelectorAll(".t-menuwidgeticons__link_cart");
            "yes" === d.getAttribute("data-opencart-onorder") ? setTimeout((function() {
                tcart__openCart()
            }
            ), 10) : (r || s.length) && (r && (r.classList.add("t706__carticon_neworder"),
            setTimeout((function() {
                r.classList.remove("t706__carticon_neworder")
            }
            ), 500)),
            s.length && Array.prototype.forEach.call(s, (function(t) {
                t.classList.add("t706__carticon_neworder"),
                setTimeout((function() {
                    t.classList.remove("t706__carticon_neworder")
                }
                ), 500)
            }
            )))
        }
    })
    
    t_onFuncLoad("tcart__product__plus", function() {
        tcart__product__plus = function(t) {
            // Ограничение суммарного кол-ва единиц товаров в заказе
            if (tcart.total + 1 > CartMaxTotal) {
                onlimitQuantity();
                return;
            }
    
            var e = t.closest(".t706__product")
              , r = e.getAttribute("data-cart-product-i");
            (window.tcart.products[r] || (tcart__syncProductsObject__LStoObj(),
            null != window.tcart.products[r])) && (window.tcart.products[r].quantity > 0 && void 0 !== window.tcart.products[r].inv && window.tcart.products[r].inv > 0 && window.tcart.products[r].inv == window.tcart.products[r].quantity ? alert(tcart_dict("limitReached")) : (window.tcart.products[r].quantity++,
            window.tcart.products[r].amount = window.tcart.products[r].price * window.tcart.products[r].quantity,
            window.tcart.products[r].amount = tcart__roundPrice(window.tcart.products[r].amount),
            e.querySelector(".t706__product-quantity").innerHTML = window.tcart.products[r].quantity,
            "y" === window.tcart.products[r].single && void 0 !== window.tcart.products[r].portion && (e.querySelector(".t706__product-portion").innerHTML = tcart__showWeight(window.tcart.products[r].quantity * window.tcart.products[r].portion, window.tcart.products[r].unit)),
            window.tcart.products[r].amount > 0 ? e.querySelector(".t706__product-amount").innerHTML = tcart__showPrice(window.tcart.products[r].amount) : e.querySelector(".t706__product-amount").innerHTML = "",
            tcart__updateTotalProductsinCartObj(),
            tcart__reDrawCartIcon(),
            tcart__reDrawTotal(),
            tcart__saveLocalObj()))
        }
    })
    
    t_onFuncLoad("tcart__product__editquantity", function() {
        tcart__product__editquantity = function(t) {
            var e = "";
            if (!t.querySelector(".t706__product-quantity-inp")) {
                var r = t.closest(".t706__product")
                  , o = r.getAttribute("data-cart-product-i")
                  , a = parseInt(t.textContent, 10)
                  , n = '<input type="text" name="tilda-tmp-cart-qnt" class="t706__product-quantity-inp" value="' + (e = 0 == a || a > 0 ? a : 1) + '" style="width:30px">';
                
                // Сохранить предыдущее кол-во
                var oldQuantity = a;
    
                t.innerHTML = n,
                t.classList.add("t706__product-quantity_editing");
                var i = t.querySelector(".t706__product-quantity-inp");
                i.addEventListener("focus", (function() {
                    var t = this;
                    setTimeout((function() {
                        t.selectionStart = t.selectionEnd = 1e4
                    }
                    ), 0)
                }
                )),
                i.focus(),
                i.addEventListener("focusout", (function() {
                    var e = ""
                      , a = parseInt(i.value, 10);
    
                    // Ограничение суммарного кол-ва единиц товаров в заказе
                    if (tcart.total - oldQuantity + a > CartMaxTotal) onlimitQuantity();
                    else tcart__product__updateQuantity(t, r, o, e = a > 0 ? a : 1);
    
                    t.textContent = window.tcart.products[o].quantity,
                    t.classList.remove("t706__product-quantity_editing")
                }
                ))
            }
        }
    })
})
