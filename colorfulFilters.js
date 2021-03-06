let colors = {
    Золото: "#ffd700",
    Серебро: "#c0c0c0",
    Лиловый: "#d397ca",
    Белый: "#fffcfa",
    Красный: "#BF1F1F",
    Крафт: "#AC663E",
    Бирюзовый: "#0EC6BB",
    Розовый: "#FF89DE",
    Салатовый: "#A0E768",
    Чёрный: "#2e251c"
};

function colorFilters(checkboxes) {
    checkboxes.each(function() {
        const color = colors[this.name];
        if (color) $(this.nextSibling).css("cssText", "background-color: " + color + "!important");
    });
}

function sortFilters() {
    let checkboxes = $(".t-store__filter__checkbox_simple .js-store-filter-opt-chb");
    checkboxes.each(function() {
        const color = colors[this.name];
        if (color == colors.Золото || color == colors.Серебро) {
            checkboxes.not(":checked").first().parent().before($(this).parent());
        };
    });
}

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

var token = {};

$(function() {
    waitForElm(".t-store__filter__options", token).then(() => {
        let colorCheckboxes = $(".t-store__filter__checkbox_simple .js-store-filter-opt-chb");
        colorFilters(colorCheckboxes);
        sortFilters();

        // применять сортировку фильтров при каждом изменении
        $("input.t-checkbox").on("change", sortFilters);
    }).catch(() => {
        $(".t951__sidebar").remove();
        $(".t951__grid-cont").css("maxWidth", "initial");
    });
});

$(window).on("load", function() {
    setTimeout(() => {
        token.cancel();
    }, 2000);
})