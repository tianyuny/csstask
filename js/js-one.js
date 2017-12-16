window.onload = function(){
    if (!document.getElementById) return false;
    if (!document.createElement) return false;
    if (!document.getElementById('magic-box')) return false;
    var boxParent = document.getElementById('magic-box');
    //页面初始化,创建标签
    initialize(boxParent);
    //获取创建的标签
    var start = boxParent.nextSibling;
    var speed = start.nextSibling;
    var add = speed.firstChild;
    var sub = speed.lastChild;
    var user = document.getElementById('user');
    var form = document.getElementById('form');
    var formSubit = form.getElementsByTagName('button')[0];
   //点击开始按钮事件
    start.onclick = function() {
        //获得按钮文本
        var text = this.lastChild;
        if (text.nodeValue === "开始") {
            //用编写的addClass函数添加按钮类名
            this.className = addClass(this.className, 'active');
            //重写文本值
            text.nodeValue = "停止";
            //启动颜色变化函数
            startChange(boxParent);
            //显示变化速度按钮
            speed.style.display = "block";
        } else {
            //清除指定类名
            this.className = this.className.replace('active', '');
            text.nodeValue = "开始";
            //格子颜色复位
            init(boxParent);
            //变化速度复位
            boxParent.v = 1;
            speed.style.display = "none";
        }
    };
    //加速按钮
    add.onclick = function() {
        boxParent.v = boxParent.v / 2;
    };
    //减速按钮
    sub.onclick = function() {
        boxParent.v = boxParent.v * 2;
    };
    //自定义按钮
    user.onclick = function() {
        form.style.display = "block";
    };
    //自定义提交按钮
    formSubit.onclick = function(){
        //存储用户数据到本地
        var input = form.getElementsByTagName('input');
        localStorage.setItem('cols', input[0].value);
        localStorage.setItem('rows', input[1].value);
        localStorage.setItem('alter', input[2].value);
        form.style.display = "none";
        //调用格子函数
        return box(boxParent);
    };
};
//页面初始化函数
function initialize(fatherBox) {
    fatherBox.innerHTML = "";
    var x,
        y,
        al;
    //调取用户数据
    if (localStorage.getItem('cols')) {
        x = localStorage.getItem('cols');
        y = localStorage.getItem('rows');
        al = localStorage.getItem('alter');
    } else {
        x = "3";
        y = "3";
        al = "3";
    }
    //创建用户自定义按钮
    var userDefinedButton = document.createElement('button');
    var userDefinedText = document.createTextNode('自定义');
    userDefinedButton.appendChild(userDefinedText);
    userDefinedButton.setAttribute('id','user');
    //创建表单
    var form = document.createElement('form');
    form.setAttribute('id', 'form');
    //用于输入格子列数
    var cols = document.createElement('input');
    cols.setAttribute('maxlength', '2');
    cols.setAttribute('size', '5');
    cols.setAttribute('type','text');
    cols.setAttribute('id','cols');
    cols.setAttribute('value',x);
    //用于输入格子行数
    var rows = document.createElement('input');
    rows.setAttribute('maxlength', '2');
    rows.setAttribute('size', '5');
    rows.setAttribute('type','text');
    rows.setAttribute('id','rows');
    rows.setAttribute('value', y);
    //用于输入要变化的格子数
    var alter = document.createElement('input');
    alter.setAttribute('maxlength', '5');
    alter.setAttribute('size', '5');
    alter.setAttribute('type','text');
    alter.setAttribute('id','alter');
    alter.setAttribute('value', al);
    //用于功能描述
    var text = [document.createTextNode('列 : '),document.createTextNode('行 : '),document.createTextNode('变化数 : ')];
    var p = [document.createElement('p'),document.createElement('p'),document.createElement('p')];
    p[0].appendChild(text[0]);
    p[1].appendChild(text[1]);
    p[2].appendChild(text[2]);
    //创建提交按钮
    var submit = document.createElement('button');
    var submitText = document.createTextNode('确定');
    submit.appendChild(submitText);
    //元素添加到表单
    form.appendChild(p[0]);
    form.appendChild(cols);
    form.appendChild(p[1]);
    form.appendChild(rows);
    form.appendChild(p[2]);
    form.appendChild(alter);
    form.appendChild(submit);
    fatherBox.parentNode.insertBefore(form, fatherBox);
    fatherBox.parentNode.insertBefore(userDefinedButton, form);
    //创建启动动画按钮
    var start = document.createElement('button');
    var startText = document.createTextNode('开始');
    start.appendChild(startText);
    start.setAttribute('class','start');
    insertAfter(start,fatherBox);
    //创建速度变化按钮
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
    //变化速度初始化
    fatherBox.v = 1;
    //启用创建格子函数
    box(fatherBox);
}
//创建格子函数
function box(fatherBox) {
    var input = document.getElementsByTagName('input');
    //将列数赋给变量
    var x = input[0].value;
    //将行数赋给变量
    var y = input[1].value;
    var all = x * y;
    //用属性作为变量存储需要跨域传送的值
    //存储要变化的格子数
    fatherBox.change = input[2].value;
    var a = 99.999/x;
    var width = a * 0.90 + "%";
    var margin = a * 0.05 + "%";
    //格子清零
    fatherBox.innerHTML = "";
    for (var i = 0; i < all; i++) {
        var div = document.createElement('div');
        div.style.width = width;
        div.style.paddingBottom = width;
        div.style.margin = margin;
        fatherBox.appendChild(div);
    }
    //获取格子初始颜色值用于跨域传送
    fatherBox.c = fatherBox.getElementsByTagName('div')[0].style.backgroundColor;
    //清除变化格子的位置
    fatherBox.r = undefined;
    //返回false阻止表单提交刷新页面
    return false;
}
//在目标元素之后添加新元素
function insertAfter(newnode,targetnode) {
    var parent = targetnode.parentNode;
    if (targetnode === parent.lastChild) {
        parent.appendChild(newnode);
    } else {
        parent.insertBefore(newnode, targetnode.nextSibling);
    }
}
//格子随机变化颜色函数
function startChange(boxParent) {
    var box = boxParent.getElementsByTagName('div');
    //需要变化的格子数
    var changeBox = boxParent.change;
    //格子颜色复位
    init(boxParent);
    //如果需要变化颜色的格子数大于格子总数，取格子总数
    if (changeBox > box.length) changeBox = box.length;
    //用于存储变化颜色格子位置
    var r = [];
    //** 这是新的获取随机格子的方法
    //数组a的值代表格子的位置
    var a = [];
    for (var i = 0; i < box.length; i++) {
        a[i] = i;
    }
    for (var y = 0; y < changeBox; y++) {
        //下面两行代码获取随机格子位置
        var m = Math.floor(a.length * Math.random());
        r[y] = a[m];
        //从数组中删除已获取的位置
        a.splice(m,1);
        box[r[y]].style.backgroundColor = randomColor();
    }
    /** 这是弃用的获取随机格子的方法
    for (var i = 0; i < changeBox; i++) {
        r[i] = Math.floor(box.length * Math.random());
        //避免随机数出现重复
        for (var y = 0; y < i; y++) {
            if (r[i] === r[y]) {
                r[i] = Math.floor(box.length * Math.random());
                y = -1;
            }
        }
        box[r[i]].style.backgroundColor = randomColor();
    }
     **/
    //用属性传递以变化颜色的格子位置
    boxParent.r = r;
    //循环时间
    var t = 1000 * boxParent.v;
    //定时循环，并赋给属性以跨域停止
    boxParent.t = setTimeout(function(){startChange(boxParent);},t);
}
//格子颜色初始化
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
//获取随机颜色
function randomColor() {
    return "rgb(" + Math.floor(260 * Math.random()) + ","
        + Math.floor(260 * Math.random()) + ","+ Math.floor(260 * Math.random()) + ")";
}
//添加类名
function addClass(sting,className) {
    if (typeof sting === "string") {
        sting = sting + " " + className;
    } else {
        sting = className;
    }
    return sting;
}