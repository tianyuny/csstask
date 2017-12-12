window.onload = function() {
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");
    var box = document.getElementsByClassName("box");
    var quantity = 9;  //存储变化格子的数量
    var newBox = [-1];  //存储随机格子编号，初值-1表示没有颜色变化
    var bgColor = box[0].style.getPropertyValue("background-color");
    var t; //函数循环变量
    start.onclick = function() {
        active(this,stop,t);
        bg();
        t = window.setInterval(bg,1000);
        function bg() {
            rest(box,newBox,bgColor);
            bgstart(box,newBox,quantity);
        }
    };
    stop.onclick = function() {
        active(this,start,t);
        rest(box,newBox,bgColor);
        newBox[0] = -1;
    };
};


function bgstart(box,newBox,quantity) {  //颜色变化函数
    var boxLong = box.length;
    for (var i = 0; i < quantity; i++) {
        newBox[i] = Math.floor(boxLong * Math.random());
        for (var y = 0; y < i; y++) {
            if (newBox[i] === newBox[y]) {
                //发现重复，重取随机值
                newBox[i] = Math.floor(boxLong * Math.random());
                //重新比对初始化，注意这里必须是-1，后面y++后变为0
                y = -1;
            }
        }
        randomColor(box[newBox[i]]);
    }
}
function active(obj1,obj2,t) {  //点击按钮通用
    //停止定时循环
    window.clearInterval(t);
    //清除元素类名
    obj2.setAttribute("class",null);
    //添加元素类名
    obj1.setAttribute("class","active");
}
function randomColor(a) {     //获取随机颜色
    var color = "rgb(" + Math.round(100 * Math.random()) + "%,"
        + Math.round(100 * Math.random()) + "%," + Math.round(100 * Math.random()) + "%)";
    a.style.setProperty("background-color",color);
}
function rest(box,newBox,bgColor) {  //格子颜色复位
    if (newBox[0] === -1) return;
    var newBoxlong = newBox.length;
    for (var x = 0; x < newBoxlong; x++) {
        box[newBox[x]].style.setProperty("background-color",bgColor);
    }
}