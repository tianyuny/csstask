window.onload = function() {
    //var myHeart = document.getElementById('heart');
    var heartChild = document.getElementById('heartchild');
    var header = document.getElementById('header');
    header.className = "header"
    for (var i = 0; i < 36; i++) {
        //var heart = document.createElement('div');
        //heart.className = "heart";
        //heart.style.transform = "rotatey("+i*10+"deg) rotatez(44.5deg) translatex(19.6vw)";
        //myHeart.appendChild(heart);
        var child = document.createElement('div');
        child.style.transform = "rotatey("+i*10+"deg) rotatez(44.5deg) translatex(14.8vw)";
        heartChild.appendChild(child);

    }
};