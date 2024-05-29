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

let imgInp = document.getElementById("imgInp")
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
sactive=false;


let blur=0,brightness=100,contrast=100,grayscale=0,hueRotate=0,invert=0,opacity=0,saturate=100,sepia=0;
change=localStorage.getItem("change");
if(change){
    //console.log("ok ");
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

img.src = source;
img.onload = function () {
    load()
}

function bring(){
    let [file] = imgInp.files
    //console.log(document.getElementById("imgInp").files[0].path)
    if (file) {
        //console.log("file")
        img.src = document.getElementById("imgInp").files[0].path;
        //console.log(img.src);
        img.onload = function () {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            load(img);
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
        //console.log(width,height)
    }
    else{
        height=600
        width=600*ratio
        canvas.width=width;
        canvas.height=height;
        ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);
        //console.log(width,height)
    }
    localStorage.setItem("image",img.src);
}

function save(){
    cropimage();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.width=ow;
    canvas.height=oh;
    console.log(canvas.width,canvas.height);
    ctx.drawImage(img,ox*r,oy*r1,ow*r,oh*r1,0,0,ow,oh);
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
    //console.log(ctx.filter)
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
let movex=0,movey=0;
let pervmousex=mousenowx,pervmousey=mousenowy;
canvas.addEventListener("mousemove", function (e) {
    [mousenowx,mousenowy]=getMousePosition(canvas, e);
});


const path2 = new Path2D();
// I moved a bit the arc so that the filter is better visible


let drag1=false,drag2=false,drag3=false,drag4=false;
canvas.addEventListener("mousemove", function (e) {
    if(mousedown){
        // [mousenowx,mousenowy]=getMousePosition(canvas, e);
        if(ox+ow>mousenowx && mousenowx>ox && oy+5>mousenowy && mousenowy>oy){
            drag1=true;
        }
        if( oy+oh>mousenowy && mousenowy>oy+oh-5){
            drag2=true;
        }
        if(ox+5>mousenowx && mousenowx>ox && oy+oh>mousenowy && mousenowy>oy){
            drag3=true;
        }
        if(ox+ow-5<mousenowx && mousenowx<ox+ow && oy+oh>mousenowy && mousenowy>oy){
            drag4=true;
        }
        if(v1===true){
            pervmousex=mousenowx;
            pervmousey=mousenowy;
            v1=false;
        }
        movex=mousenowx-pervmousex;
        movey=mousenowy-pervmousey;
        pervmousex=mousenowx;
        pervmousey=mousenowy;
        
        if(drag1){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            console.log("ok")
            oh-=movey;
            oy+=movey;
            cropimage();

            ctx.fillRect(ox,oy,ow,5);

            ctx.fillRect(ox,oh-5+oy,ow,5);
            ctx.fillRect(ox,oy,5,oh);
            ctx.fillRect(ox+ow-5,oy,5,oh);
        }
        if(drag2){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            cropimage();
            // oh=height+movey;
            oh+=movey;

            ctx.fillRect(ox,oy,ow,5);

            ctx.fillRect(ox,oh-5+oy,ow,5);

            ctx.fillRect(ox,oy,5,oh);
            ctx.fillRect(ox+ow-5,oy,5,oh);
        }
        if(drag3){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            cropimage();

            ox+=movex;
            ow-=movex;

            ctx.fillRect(ox,oy,ow,5);
            ctx.fillRect(ox,oh-5+oy,ow,5);

            ctx.fillRect(ox,oy,5,oh);

            ctx.fillRect(ox+ow-5,oy,5,oh);
        }
        if(drag4){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            cropimage();

            ow+=movex;

            ctx.fillRect(ox,oy,ow,5);
            ctx.fillRect(ox,oh-5+oy,ow,5);
            ctx.fillRect(ox,oy,5,oh);

            ctx.fillRect(ox+ow-5,oy,5,oh);
        }
    }
    else{
        v1=true;
        drag1=false;
        drag2=false;
        drag3=false;
        drag4=false;
    }
});


window.onbeforeunload = function() { 
    if(sactive===false)
    localStorage.clear();
};

let ox=0,oy=0,ow=0,oh=0;
let r=0,r1=0,r2=0;

function cropimage(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.filter = `brightness(${100}%)`;
    // ctx.drawImage(img, 0, 0,width1,height1,ox,oy,ow,oh);

    ctx.filter = `brightness(${50}%)`;
    ctx.drawImage(img, 0, 0,width1,height1,0,0,width,height);

    ctx.filter = `none`;

    r=width1/width;
    r1=height1/height;
    
    ctx.drawImage(img,ox*r,oy*r1,ow*r,oh*r1,ox,oy,ow,oh);
}

function crop(){
    let width=canvas.width;
    let height=canvas.height;
    ctx.fillStyle = "red";
    ox=0;
    oy=0;
    ow=width;
    oh=height;
    ctx.fillRect(0,0,width,5);
    ctx.fillRect(0,height-5,width,5);
    ctx.fillRect(0,0,5,height);
    ctx.fillRect(width-5,0,width,height);
}
