let css = `
* { box-sizing: border-box; }

.video-background {
  background: #000;
  width: 100%;
  height: 100%;
}

.video-foreground,
.video-background iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@media (min-aspect-ratio: 16/9) {
  .video-foreground { height: 300%; top: -100%; }
}

@media (max-aspect-ratio: 16/9) {
  .video-foreground { width: 300%; left: -100%; }
}
`

let html = `
<div class="video-background">
    <div class="video-foreground">
        <iframe src="https://www.youtube.com/embed/YstUooVIXmw?controls=0&amp;showinfo=0&amp;rel=0&amp;autoplay=1&amp;loop=1" title="YouTube video player" frameborder="0" allow="autoplay; clipboard-write; encrypted-media;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
    </div>
</div>
`

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

$(function() {
    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    waitForElm("#rec771087890 .js-product-img").then((elm) => {
        elm.outerHTML = html;
    });
})