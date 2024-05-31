/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


let mouseup=true;
let mousedown=false;
let mousenowx=0,mousenowy=0;
let x=0,y=0;

let frompop=new Image();
let imgInp = document.getElementById("imgInp")
let imgpop1 = document.getElementById("imgpop1")
let canvas= document.getElementById("canvas")
let ctx= canvas.getContext("2d")
let img = new Image(),imgpop = new Image();
let width1=0,height1=0
let width=0,height=0
let popwidth=0,popheight=0
let ratio=0;
let sactive=false
let change=false
canvas.style.background = "black";
sactive=false
let picturebox=document.getElementById("picture-box");
let returns=localStorage.getItem("returns");

let blur=0,brightness=100,contrast=100,grayscale=0,hueRotate=0,invert=0,opacity=0,saturate=100,sepia=0;
change=localStorage.getItem("change");
if(change){
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


change=false
let source=localStorage.getItem("image")
canvas.height=400;
canvas.width=750;



canvas.height=525;
canvas.width=850;
if(returns==1){
    img.src = source;
    img.onload = function () {
        load()
    }
}
else if(returns==2){
    frompop=localStorage.getItem("destinationImage");
    
    img.src = frompop;
    img.onload = function () {
        load()
    }
}
function bring(){
    let [file] = imgInp.files
    if (file) {
        img.src = document.getElementById("imgInp").files[0].path;
        img.onload = function () {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            load(img)
        }
    }
}
function load(){
    width = img.naturalWidth;
    height = img.naturalHeight;
    height1=height;
    width1=width;
    ratio=width/height
    if(ratio>1){
        width=800;
        height=800/ratio;
        canvas.width=width;
        canvas.height=height;
        loadfilter();
        ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
    }
    else{
        height=600
        width=600*ratio
        canvas.width=width;
        canvas.height=height;
        loadfilter();
        ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
    }
    localStorage.setItem("image",img.src);
}
function download() {
    if (!img.src) {
        alert("No Image to download")
        return
    }
    let canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    let ctx = canvas.getContext("2d");
    ctx.filter = "blur("+blur+"px)"+"brightness("+brightness+"%)"+"contrast("+contrast+"%)"+
        "grayscale("+grayscale+"%)"+"invert("+invert+"%)"+ "hue-rotate("+hueRotate+"deg)"+
        "saturate("+saturate+"%)"+"sepia("+sepia+"%)";
    ctx.drawImage(img, 0, 0);
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "image.png";
    a.click();
    
}


function applyFilter(){
    localStorage.setItem("returns",1);
    sactive=true;
    window.location.href='Filters.html';
}
function cropImage(){
    localStorage.setItem("returns",1);
    sactive=true;
    window.location.href='Crop.html';
}
 function save(){
    localStorage.setItem("returns",1);
    sactive=true;
    localStorage.setItem("image",img.src);
    window.location.href='Editor.html';
}
 function back(){
    if (img.src) {
        localStorage.setItem("returns",1);
        sactive=true
        localStorage.setItem("image",img.src);
    }
    window.location.href='Editor.html';
}
function effects(){
    localStorage.setItem("returns",1);
    picturebox.style.width="20%";
    sactive=true;
    window.location.href='Effects.html';
}
function pictureonpicture(){
    localStorage.setItem("returns",1);
    sactive=true;
    window.location.href='POP.html';
}
function secondpic(){
    let [file] = imgpop1.files
    if (file) {
        imgpop.src = document.getElementById("imgpop1").files[0].path;
        imgpop.onload = function () {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            load(); 
            popwidth = imgpop.naturalWidth;
            popheight = imgpop.naturalHeight;
                height1=popheight
                width1=popwidth
                ratio=popwidth/popheight
                if(ratio>1){
                    popwidth=800;
                    popheight=800/ratio;
                    ctx.drawImage(imgpop, 0, 0,width1,height1,x,y,popwidth,popheight);
                }
                else{
                    popheight=600
                    popwidth=600*ratio
                    ctx.drawImage(imgpop, 0, 0,width1,height1,x,y,popwidth,popheight);
                }
            
        }
    }

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
    localStorage.setItem("change",true);
    ctx.filter = "blur("+blur+"px)"+"brightness("+brightness+"%)"+"contrast("+contrast+"%)"+"grayscale("+grayscale+"%)"+"invert("+invert+"%)"+ "hue-rotate("+hueRotate+"deg)"+"saturate("+saturate+"%)"+"sepia("+sepia+"%)";
    ctx.drawImage(img, 0, 0,width,height);
}
 function reset(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.filter="brightness(100%)";
    ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x,y];
}

canvas.addEventListener("mouseup", function (e) {
    mouseup=true;
    mousedown=false;
}); 

canvas.addEventListener("mousedown", function (e) {
    mouseup=false;
    mousedown=true;
}); 
let v1=false;
let pervmousex=mousenowx,pervmousey=mousenowy;
canvas.addEventListener("mousemove", function (e) {
    if(mousedown){
        [mousenowx,mousenowy]=getMousePosition(canvas, e);
        if(mousenowx<x+popwidth && mousenowy<y+popheight && mousenowx>x && mousenowy>y){
            //the error is due to the diff btw mousenow and prevmouse changing if mousedown becomes false and true again
            if(v1===true){
                pervmousex=mousenowx;
                pervmousey=mousenowy;
                v1=false;
            }
            x+=mousenowx-pervmousex;
            y+=mousenowy-pervmousey;
            secondpic();
            pervmousex=mousenowx;
            pervmousey=mousenowy;
            
        }
    }
    else{
        v1=true
    }
});


window.onbeforeunload = function() { 
    if(sactive===false)
    localStorage.clear();
};
let imageee=new Image();
function popsave(){
    let imageee = canvas.toDataURL();
    let destinationImage = new Image();
    destinationImage.src = imageee;
    destinationImage.onload = function(){
        localStorage.setItem("destinationImage",destinationImage.src);
    };
    localStorage.setItem("returns",2);
    sactive=true;
    window.location.href='Editor.html';
}

function share(){
    var share=document.getElementById("share");
    share.style.display="none";
    var sharebox=document.getElementById("sharebox");
    sharebox.style.display="flex";
}

var temp=1.1;
function minimum(a,b){
    if(a>b)
        return b;
    else  return a;
}

function warm() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data=imageData.data;
    var r,b,g;
  for (var i = 0; i < data.length; i+=4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    data[i] =minimum(r*temp,255);
    data[i+1] =minimum(g*temp,255);
  }
    // Update the canvas with the new data
    ctx.putImageData(imageData, 0, 0);
}
  

function cool() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data=imageData.data;
    var r,b,g;
  for (var i = 0; i < data.length; i+=4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    data[i+2] =minimum(b*temp,255);
  }
    // Update the canvas with the new data
    ctx.putImageData(imageData, 0, 0);
  }
  
function bmw() {
    ctx.filter="grayscale(100%)"
    ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
} 

function red_er() {
    ctx.filter="sepia(100%)"
    ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
}
    