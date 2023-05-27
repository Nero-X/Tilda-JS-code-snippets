$(function(){
    let style = document.createElement("style");
    style.innerHTML = `
    .blue-border {
        border-width: 3px;
        border-radius: 2px;
        border-color: #2428b6;
        border-style: solid;
    }
    `;
    document.head.appendChild(style);

    $(".t859__inner-col, .t1014__wrapper, .t651__wrapper, .t214__blockimg, .t774__wrapper").addClass("blue-border");
})