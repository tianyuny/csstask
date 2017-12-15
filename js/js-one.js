window.onload = function(){
    if (!document.getElementById) return false;
    if (!document.createElement) return false;
    if (!document.getElementById('magic-box')) return false;
    var boxParent = document.getElementById('magic-box');
    initialize(boxParent);
    var start = boxParent.nextSibling;
    var speed = start.nextSibling;
    var add = speed.firstChild;
    var sub = speed.lastChild;
    var user = document.getElementById('user');
    var form = document.getElementById('form');
    var formSubit = form.getElementsByTagName('button')[0];
    formSubit.onclick = function(){
        form.style.display = "none";
        return box(boxParent);
    };
    start.onclick = function() {
        var text = this.lastChild;
        if (text.nodeValue === "开始") {
            this.className = addClass(this.className, 'active');
            text.nodeValue = "停止";
            startChange(boxParent);
            speed.style.display = "block";
        } else {
            this.className = this.className.replace('active', '');
            text.nodeValue = "开始";
            init(boxParent);
            boxParent.v = 1;
            speed.style.display = "none";
        }
    };
    add.onclick = function() {
        boxParent.v = boxParent.v / 2;
    };
    sub.onclick = function() {
        boxParent.v = boxParent.v * 2;
    };
    user.onclick = function() {
        form.style.display = "block";
    }
};
function initialize(fatherBox) {
    fatherBox.innerHTML = "";
    var userDefinedButton = document.createElement('button');
    var userDefinedText = document.createTextNode('自定义');
    userDefinedButton.appendChild(userDefinedText);
    userDefinedButton.setAttribute('id','user');
    var form = document.createElement('form');
    form.setAttribute('id', 'form');
    var cols = document.createElement('input');
    cols.setAttribute('maxlength', '2');
    cols.setAttribute('size', '5');
    cols.setAttribute('type','text');
    cols.setAttribute('id','cols');
    cols.setAttribute('value','3');
    var rows = document.createElement('input');
    rows.setAttribute('maxlength', '2');
    rows.setAttribute('size', '5');
    rows.setAttribute('type','text');
    rows.setAttribute('id','rows');
    rows.setAttribute('value','3');
    var alter = document.createElement('input');
    alter.setAttribute('maxlength', '5');
    alter.setAttribute('size', '5');
    alter.setAttribute('type','text');
    alter.setAttribute('id','alter');
    alter.setAttribute('value','3');
    var text = [document.createTextNode('列 : '),document.createTextNode('行 : '),document.createTextNode('变化数 : ')];
    var p = [document.createElement('p'),document.createElement('p'),document.createElement('p')];
    p[0].appendChild(text[0]);
    p[1].appendChild(text[1]);
    p[2].appendChild(text[2]);
    var submit = document.createElement('button');
    var submitText = document.createTextNode('确定');
    submit.appendChild(submitText);
    form.appendChild(p[0]);
    form.appendChild(cols);
    form.appendChild(p[1]);
    form.appendChild(rows);
    form.appendChild(p[2]);
    form.appendChild(alter);
    form.appendChild(submit);
    fatherBox.parentNode.insertBefore(form, fatherBox);
    fatherBox.parentNode.insertBefore(userDefinedButton, form);
    var start = document.createElement('button');
    var startText = document.createTextNode('开始');
    start.appendChild(startText);
    start.setAttribute('class','start');
    insertAfter(start,fatherBox);
    var speed = document.createElement('div');
    speed.setAttribute('id', 'speed');
    var add = document.createElement('button');
    var addText = document.createTextNode('加速');
    add.appendChild(addText);
    var sub = document.createElement('button');
    var subText = document.createTextNode('减速');
    sub.appendChild(subText);
    add.setAttribute('id', 'add');
    sub.setAttribute('id', 'sub');
    speed.appendChild(add);
    speed.appendChild(sub);
    insertAfter(speed, start);
    fatherBox.v = 1;
    box(fatherBox);
}
function box(fatherBox) {
    var input = document.getElementsByTagName('input');
    var x = input[0].value;
    var y = input[1].value;
    fatherBox.change = input[2].value;
    fatherBox.boxlenght = x * y;
    var a = 99.999/x;
    var width = a * 0.90 + "%";
    var margin = a * 0.05 + "%";
    fatherBox.innerHTML = "";
    for (var i = 0; i < fatherBox.boxlenght; i++) {
        var div = document.createElement('div');
        div.style.width = width;
        div.style.paddingBottom = width;
        div.style.margin = margin;
        fatherBox.appendChild(div);
    }
    fatherBox.c = fatherBox.getElementsByTagName('div')[0].style.backgroundColor;
    return false;
}
function insertAfter(newnode,targetnode) {
    var parent = targetnode.parentNode;
    if (targetnode === parent.lastChild) {
        parent.appendChild(newnode);
    } else {
        parent.insertBefore(newnode, targetnode.nextSibling);
    }
}
function startChange(boxParent) {
    var box = boxParent.getElementsByTagName('div');
    var changeBox = boxParent.change;
    var max = boxParent.boxlenght;
    if (changeBox > max) changeBox = max;
    var r = [];
    init(boxParent);
    for (var i = 0; i < changeBox; i++) {
        r[i] = Math.floor(box.length * Math.random());
        for (var y = 0; y < i; y++) {
            if (r[i] === r[y]) {
                r[i] = Math.floor(box.length * Math.random());
                y = -1;
            }
        }
        box[r[i]].style.backgroundColor = randomColor();
    }
    var t = 1000 * boxParent.v;
    boxParent.r = r;
    boxParent.t = setTimeout(function(){startChange(boxParent)},t);
}
function init(boxParent) {
    if(boxParent.r) {
        clearTimeout(boxParent.t);
        var box = boxParent.getElementsByTagName('div');
        var r = boxParent.r;
        for (var i = 0; i < r.length; i++) {
            box[r[i]].style.backgroundColor = boxParent.c;
        }
    }
}
function randomColor() {
    return "rgb(" + Math.floor(260 * Math.random()) + ","
        + Math.floor(260 * Math.random()) + ","+ Math.floor(260 * Math.random()) + ")";
}
function addClass(sting,className) {
    if (typeof sting === "string") {
        sting = sting + " " + className;
    } else {
        sting = className;
    }
    return sting;
}