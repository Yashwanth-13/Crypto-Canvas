/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const img = new Image()
imgInp.onchange = evt => {
    var [file] = imgInp.files
    if (file) {
        blah.src = file.path;
        img.src = blah.src;
        console.log(img.naturalWidth, img.naturalHeight);
        blah.width=800;
        blah.height=img.naturalHeight/(img.naturalWidth/800);
        
    }
}

