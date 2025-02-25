let css = `
/* Define keyframes for sliding in and fading in */
@keyframes slideFadeInOut {
  0% {
    left: 60vw;
    opacity: 0;
  }
  25% {
    left: 40vw;
    opacity: 1;
  }
  75% {
    left: 20vw;
    opacity: 1;
  }
    100% {
    left: 0vw;
    opacity: 0;
  }
}

/* Apply the animation only on mobile devices */
@media (max-width: 768px) {
  #rec859546056 .t396__elem {
    opacity: 0; /* Initially hidden */
  }

  #rec859546056 .t396__elem.animation {
    animation: slideFadeInOut 3s linear;
  }

  #rec859546854 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
`

function shuffle(arr) {
    let newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

$(function() {
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    let movingBlocks = $("#rec859546056 .t396__elem");
    movingBlocks = shuffle(movingBlocks.toArray());
    $(movingBlocks).each((index, element) => {
        $(element).css("animation-delay", index * 1 + "s");
        $(element).addClass("animation");
    })
})