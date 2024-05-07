/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
let imgInp = document.getElementById("imgInp")
let blah = document.getElementById("blah")
let canvas= document.getElementById("canvas")
let ctx= canvas.getContext("2d")
let img = new Image()
let width1=0,height1=0
let width=0,height=0
let ratio=0;
let sactive=false
canvas.style.background = "black";
sactive=false

let blur=0,brightness=100,contrast=100,grayscale=0,hueRotate=0,invert=0,opacity=0,saturate=100,sepia=0;
if(localStorage.getItem("blur")>0){
    console.log("ok ");
    blur=localStorage.getItem("blur");
    brightness=localStorage.getItem("brightness");
    contrast=localStorage.getItem("contrast");
    grayscale=localStorage.getItem("grayscale");
    hueRotate=localStorage.getItem("hueRotate");
    invert=localStorage.getItem("invert");
    opacity=localStorage.getItem("opacity");
    saturate=localStorage.getItem("saturate");
    sepia=localStorage.getItem("sepia");
}
loadfilter();

let source=localStorage.getItem("image")
console.log(source)
if(source){
    console.log(sactive);
    img.src = source;
    img.onload = function () {
        load()
    }
}

function bring(){
    let [file] = imgInp.files
    console.log("change")
    if (file) {
        console.log("file")
        blah.src = file.path;
        img.src = blah.src;
        console.log(img.src);
        img.onload = function () {
            load()
        }
    }
}
function load(){
    width = img.naturalWidth;
    height = img.naturalHeight;
    console.log(width,height);
    if(height!=600 && width!=800){
        height1=height
        width1=width
        ratio=width/height
        if(ratio>1){
            width=800
            height=800/ratio
            ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
            console.log(width,height)
        }
        else{
            height=600
            width=600*ratio
            ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
            console.log(width,height)
        }
    }
}
function download() {
    let canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    let ctx = canvas.getContext("2d");
    ctx.filter = "blur("+blur+"px)"+"brightness("+brightness+"%)"+"contrast("+contrast+"%)"+"grayscale("+grayscale+"%)"+"invert("+invert+"%)"+ "hue-rotate("+hueRotate+"deg)"+"saturate("+saturate+"%)"+"sepia("+sepia+"%)";
    console.log(blur,brightness,contrast,grayscale,hueRotate,invert,opacity,saturate,sepia);
    ctx.drawImage(img, 0, 0);
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "image.png";
    a.click();
}

function applyFilter(){
    sactive=true;
    window.location.href='Filters.html';
}
function cropImage(){
    sactive=true;
    window.location.href='Crop.html';
}
function crop(){

}
function rotate(){

}
function mirror(){

}
function save(){
    sactive=true;
    localStorage.setItem("image",img.src);
    window.location.href='Editor.html';
}
function effects(){
    sactive=true;
    window.location.href='Effects.html';
}
function pictureonpicture(){
    sactive=true;
    window.location.href='POP.html';
}
function text(){
    sactive=true;
    window.location.href='Text.html';
}
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Selected Image" style="max-width: 100%; max-height: 200px;">`;
        };
        reader.readAsDataURL(file);
    }
}
function submitText(){
    
}

function blur1(){
    blur=document.getElementById("blur").value;
    loadfilter();
}
function brightness1(){
    brightness=document.getElementById("brightness").value;
loadfilter()}
function contrast1(){
    contrast=document.getElementById("contrast").value;
loadfilter()}
function grayscale1(){
    grayscale=document.getElementById("grayscale").value;
loadfilter()}
function huerotate1(){
    hueRotate=document.getElementById("hue-rotate").value;
loadfilter()}
function invert1(){
    invert=document.getElementById("invert").value;
loadfilter()}
function opacity1(){
    opacity=document.getElementById("opacity").value;
loadfilter()}
function saturate1(){
    saturate=document.getElementById("saturate").value;
loadfilter()}
function sepia1(){
    sepia=document.getElementById("sepia").value;
loadfilter()}
function loadfilter(){
    localStorage.setItem("blur",blur);
    localStorage.setItem("sepia",sepia);
    localStorage.setItem("saturate",saturate);
    localStorage.setItem("opacity",opacity);
    localStorage.setItem("invert",invert);
    localStorage.setItem("hueRotate",hueRotate);
    localStorage.setItem("grayscale",grayscale);
    localStorage.setItem("contrast",contrast);
    localStorage.setItem("brightness",brightness);
    ctx.filter = "blur("+blur+"px)"+"brightness("+brightness+"%)"+"contrast("+contrast+"%)"+"grayscale("+grayscale+"%)"+"invert("+invert+"%)"+ "hue-rotate("+hueRotate+"deg)"+"saturate("+saturate+"%)"+"sepia("+sepia+"%)";
    ctx.drawImage(img, 0, 0,width,height);
    console.log(ctx.filter)
}
function reset(){
    blur=0,brightness=100,contrast=100,grayscale=0,hueRotate=0,invert=0,opacity=0,saturate=100,sepia=0;
    document.getElementById("blur").value=0;
    document.getElementById("brightness").value=100;
    document.getElementById("contrast").value=100;
    document.getElementById("grayscale").value=0;
    document.getElementById("hue-rotate").value=0;
    document.getElementById("invert").value=0;
    document.getElementById("opacity").value=0;
    document.getElementById("saturate").value=100;
    document.getElementById("sepia").value=0;

    loadfilter();
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);
}

canvas.addEventListener("mouseup", function (e) {
    getMousePosition(canvas, e);
}); 

canvas.addEventListener("mousedown", function (e) {
    getMousePosition(canvas, e);
}); 

window.onbeforeunload = function() { 
    if(sactive===false)
    localStorage.clear();
};