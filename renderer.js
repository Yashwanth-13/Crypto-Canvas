/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
let imgInp = document.getElementById("imgInp")
let blah = document.getElementById("blah")
let img = new Image()
imgInp.onchange = evt => {
    let [file] = imgInp.files
    if (file) {
        blah.src = file.path;
        img.src = blah.src;
        console.log(blah.naturalWidth, blah.naturalHeight);
        
    }
}
function download() {
    let canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    let ctx = canvas.getContext("2d");
    ctx.filter = "invert(0%)";
    ctx.drawImage(img, 0, 0);
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "image.png";
    a.click();
}