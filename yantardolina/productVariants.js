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

$(function() {
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    let verBtns = $(".t396 .t396__elem[class*=ver]");
    let buyBtns = $(".t1093 .v-order");

    verBtns.on("click", function() {
        verBtns.removeClass("ver-selected");
        $(this).addClass("ver-selected");
    });

    buyBtns.on("click", function() {
        let popup = $(this).closest(".t1093");
        let product = {
            name: popup.find(".t396__elem.name").text(),
            url: "https://yantardolina.ru/oil",
            img: popup.find(".t396__elem.v-img1 img").attr('src'),
            options: [{
                option: "Объём",
                price: 0,
                variant: verBtns.filter(".ver-selected").text()
            }],
            uid: generateGUID(10),
            price: ""
        }
        tcart__addProduct(product)
    });
})
