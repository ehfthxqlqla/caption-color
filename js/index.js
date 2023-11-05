const caption = document.querySelector(".caption"),
ctxMenu =  document.querySelector(".context"),
colorPickInput = document.querySelector("#colorpick"),
colorInQuery = new URLSearchParams(window.location.search)

let color = ``

caption.style.color = `#${colorInQuery.get("color")}`
color = `#${colorInQuery.get("color")}`

if (!colorInQuery.get("color")) {
    color = `#ffffff`
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
    caption.style.color = e.target.value
})

const share = () => {
    navigator.clipboard.writeText(`https://ehfthxqlqla.github.io/caption-color/?color=${color.replace("#", "")}`).then(() => {alert(`성공!`)})
}
