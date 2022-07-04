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

function removeEmptyFilterDiv(filterWrapper) {
    if(filterWrapper.children.length > 0) return false;
    else {
        $(".t951__sidebar")[0].remove();
        $(".t951__grid-cont")[0].style.maxWidth = "initial";
        return true;
    };
}

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

function waitForElm(selector, parent = document) {
    return new Promise(resolve => {
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
    });
}

$(function() {
    waitForElm(".t-store__filter__options").then((elm) => {
        if(!removeEmptyFilterDiv(elm)) {
            let checkboxes = $(".t-store__filter__checkbox_simple .js-store-filter-opt-chb");
            colorFilters(checkboxes);
            sortFilters();
            checkboxes.on("change", sortFilters);
        };
    });
})