var body = document.getElementsByTagName('body');
var a = Math.floor(Math.random()*100) + "% " + (Math.floor(Math.random()*90) + 10) + "%";
var b = "150px";
for (var x = 0; x < 50; x++) {
    a = a + "," + Math.floor(Math.random()*100) + "% " + (Math.floor(Math.random()*90) + 10) + "%";
    if (x % 4 === 0) {
        b = b + "," + Math.floor(Math.random() * 100) + "px";
        //alert(background);
    } else if (x % 2) {
        b = b + "," + (Math.floor(Math.random() * 50) + 5) + "px";
    } else {
        b = b + "," + (Math.floor(Math.random() * 10) + 5) + "px";
    }
}
body[0].style.backgroundPosition = a;
body[0].style.backgroundSize = b;
window.onload = function() {
    var heartChild = document.getElementById('heartchild');
    var header = document.getElementById('header');
    header.className = "header";
    for (var i = 0; i < 36; i++) {
        var child = document.createElement('div');
        child.style.transform = "rotatey(" + i * 10 + "deg) rotatez(44.5deg) translatex(14.8vw)";
        heartChild.appendChild(child);
    }
};