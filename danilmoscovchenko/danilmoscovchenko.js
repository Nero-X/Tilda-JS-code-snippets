$(function() {
    let style = document.createElement("style");
    style.innerHTML = `
    .t228 {
        backdrop-filter: blur(2px);
    }

    .flash-animation-effect {
        background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, .1)), to(rgba(255, 255, 255, .4)));
        background: -webkit-linear-gradient(left, rgba(255, 255, 255, .1), rgba(255, 255, 255, .4));
        background: -o-linear-gradient(left, rgba(255, 255, 255, .1), rgba(255, 255, 255, .4));
        background: linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(255, 255, 255, .4));
        width: 45px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 30px;
        -webkit-transform: skewX(-45deg);
        -ms-transform: skewX(-45deg);
        transform: skewX(-45deg);
    }

    .flash-animation-wrap {
        -webkit-animation-name: flash-md;
        animation-name: flash-md;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-transform: translateX(-85px);
        -ms-transform: translateX(-85px);
        transform: translateX(-85px);
        -webkit-animation-name: flash;
        animation-name: flash;
        -webkit-animation-duration: 3s;
        animation-duration: 3s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }
    `;
    document.head.appendChild(style);

    $("div[data-elem-type=button].t396__elem .tn-atom").append('<div class="flash-animation-wrap"><div class="flash-animation-effect"></div></div>');
    $("div.t396__elem[data-elem-type=button] .tn-atom, button.t-submit").css({
        "background": "linear-gradient(90deg, rgb(254,220,123), rgb(176,131,69))",
        "position": "relative",
        "overflow": "hidden"
    });
})