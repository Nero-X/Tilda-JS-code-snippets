$(function(){
    let style = document.createElement("style");
    style.innerHTML = `
    .blue-border {
        border-width: 3px;
        border-radius: 2px;
        border-color: #212370;
        border-style: solid;
    }
    `;
    document.head.appendChild(style);

    $(".t859__inner-col, .t-popup__container, .t651__wrapper, .t214__blockimg, .t774__wrapper").addClass("blue-border");
})