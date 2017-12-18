window.onload = function() {
    var heartChild = document.getElementById('heartchild');
    var header = document.getElementById('header');
    var body = document.getElementsByTagName('body');
    var a = "10% 40%";
    var b = "150px";
    header.className = "header";
    for (var i = 0; i < 36; i++) {
        var child = document.createElement('div');
        child.style.transform = "rotatey(" + i * 10 + "deg) rotatez(44.5deg) translatex(14.8vw)";
        heartChild.appendChild(child);
        a = a + "," + Math.floor(Math.random()*100) + "% " + (Math.floor(Math.random()*90) + 10) + "%";
        if (i%4 === 0) {
            b = b + "," + Math.floor(Math.random()*100) + "px";
            //alert(background);
        } else if (i%2 === 0){
            b = b + "," + (Math.floor(Math.random()*50) + 5) + "px";
        }
    }
    body[0].style.backgroundPosition = a;
    body[0].style.backgroundSize = b;
};