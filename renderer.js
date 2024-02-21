/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

var img = new Image()
imgInp.onchange = evt => {
    var [file] = imgInp.files
    if (file) {
        blah.src = file.path;
        img.src = blah.src;
        console.log(blah.naturalWidth, blah.naturalHeight);
        
    }
}

function fun(){
    console.log('asdf');
}