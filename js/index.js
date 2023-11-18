const caption = document.querySelector(".caption"),
ctxMenu =  document.querySelector(".context"),
colorPickInput = document.querySelector("#colorpick"),
colorInQuery = new URLSearchParams(window.location.search)

const pickTextColorBasedOnBgColorAdvanced = (bgColor, lightColor, darkColor) => {
    const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor,
    r = parseInt(color.substring(0, 2), 16),
    g = parseInt(color.substring(2, 4), 16),
    b = parseInt(color.substring(4, 6), 16),
    uicolors = [r / 255, g / 255, b / 255],
    c = uicolors.map((col) => {
        if (col <= 0.03928) {
            return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? darkColor : lightColor;
}

let color = ``,
outline = ``;

color = `#${colorInQuery.get("color")}`;

caption.style.color = pickTextColorBasedOnBgColorAdvanced(color, `#ffffff`, `#000000`)
caption.style.textShadow = `-2px 0px #${colorInQuery.get("color")}, 0px 2px #${colorInQuery.get("color")}, 2px 0px #${colorInQuery.get("color")}, 0px -2px #${colorInQuery.get("color")}`;

if (!colorInQuery.get("color")) {
    color = `#ffffff`
    outline = `#000000`
}

window.addEventListener("contextmenu", function(e) {
    e.preventDefault()

    ctxMenu.style.display = 'block';
    ctxMenu.style.top = `${e.pageY}px`;
    ctxMenu.style.left = `${e.pageX}px`;
})

document.querySelector(".close").addEventListener("click", function(e) {
    ctxMenu.style.display = 'none';
    ctxMenu.style.top = null;
    ctxMenu.style.left = null;
})

colorPickInput.addEventListener("input", function(e) {
    color = e.target.value
    outline = e.target.value
    caption.style.textShadow = `-2px 0px ${outline}, 0px 2px ${outline}, 2px 0px ${outline}, 0px -2px ${outline}`
    caption.style.color = pickTextColorBasedOnBgColorAdvanced(color, `#ffffff`, `#000000`)
})

const share = () => {
    navigator.clipboard.writeText(`https://ehfthxqlqla.github.io/caption-color/?color=${color.replace("#", "")}`).then(() => {alert(`성공!`)})
}
