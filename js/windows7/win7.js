var
    oWin = document.getElementById('win'),
    aImgA = oWin.getElementsByTagName('a'),
    aUl = oWin.getElementsByTagName('ul')[0],
    startMenu = document.getElementById('startMenu'),
    startA = document.getElementById('start'),
    desk = document.getElementById('desk'),
    deskLi = desk.getElementsByTagName('li'),
    deskA = desk.getElementsByTagName('a'),
    contextMenus = document.getElementById('contextmenus'),
    aList = contextMenus.getElementsByTagName('li'),
    timeBtn = document.getElementById('taskbar').getElementsByTagName('span')[0],//任务栏时间
    oCalendar = document.getElementById('calendar'),//日历盒子
    arrbg = ['win7bg4.jpg', 'win7bg3.jpg', 'win7bg2.jpg', 'win7bg1.jpg'],
    onOff=Stop=true,
    prev;//存储桌面点击元素

//桌面图标点击添加样式
for (var i = 0; i < deskA.length; i++) {
    deskA[i].onclick = function (ev) {
        //隐藏右键菜单
        contextMenus.style.display = '';
        var ev = ev || event;
        ev.cancelBubble = true;
        //清除上一个添加当前
        if (prev) {
            prev.className = '';
        }
        this.className = 'onlicks';
        prev = this;
    }
    deskA[i].onblur = function () {
        this.className = '';
    }
}

//点击显示开始菜单
startA.onclick = function (ev) {
    //阻止事件冒泡
    var ev = ev || event;
    ev.cancelBubble = true;
    startMenu.style.display = startMenu.style.display == 'block' ? '' : 'block';
    //清除桌面选择图标焦点
    if (prev) {
        prev.className = '';
    }

}


//点击document时菜单也消失
document.onclick = function () {
    //隐藏日历和时钟
    oCalendar.style.display = '';
    //隐藏右键菜单
    contextMenus.style.display = '';
    //隐藏开始菜单
    startMenu.style.display = '';
    //清除桌面选择图标焦点
    if (prev) {
        prev.className = '';
    }

}

//阻止鼠标左键点击默认行为
document.onmousedown = function (ev) {
    return false
}


//阻止默认浏览器默认右键行为
document.oncontextmenu = function () {
    return false
}
//右键菜单功能
onContextMenu();
function onContextMenu(){
    var num1=num2=0;
//向桌面desk添加元素
    aList[4].onclick= function (ev) {
        e=ev||event;
        num1++;
        if(num1>1){
            name='新建文件夹'+'('+num1+')';
        }else{
            name='新建文件夹';
        }
        createdir(e,'file',name);

    }

    aList[5].onclick= function (ev) {
        e=ev||event;
        num2++;
        if(num2>1){
            name='新建文本'+'('+num2+')';
        }else{
            name='新建文本';
        }
        createdir(e,'text',name);

    }

    /*只在桌面位置显示*/
    oWin.oncontextmenu = function (ev) {
        ev = ev || event;
        contextMenus.style.left = ev.clientX + 'px';
        contextMenus.style.top = ev.clientY + 'px';
        contextMenus.style.display = 'block';
    }
//右键菜单刷新
    aList[0].onclick= function () {
        window.location.href='';
    }
    //打开静态页
    aList[6].onclick= function () {
        var win=window.open("http://web1511.github.io/yxs/index.html","_blank","width=1349px,height=720px",false);
    }
    //删除页面图标
    aList[7].onclick = function(){
        for(var i=0;i<deskA.length;i++){
            deskA[i].innerHTML = '';
        }
    }
//切换桌面背景图标
    var num = -1;
    aList[1].onclick = function () {
        num++;//每次点击num++
        num %= arrbg.length;//取模避免超出背景图数量
        setTimeout(function () {
            oWin.style.backgroundImage = "url(" + arrbg[num] + ")";
        }, 500)

    }

    /*移入高亮h2*/
    for (var i = 0; i < aList.length; i++) {
        //移入事件
        aList[i].onmousemove = function () {
            var aUl = this.children[1];
            var aH2 = this.children[0];
            if (aUl) {//移入li下有ul则显示
                aUl.style.display = 'block';
            }
            aH2.className = 'active';

        }
        //移出事件
        aList[i].onmouseout = function () {
            var aUl = this.children[1];
            var aH2 = this.children[0];
            if (aUl) {//移入li下有ul则显示
                aUl.style.display = '';
            }
            aH2.className = '';
        }
    }
}
//创建新文件
function createdir(ev,pictuer,name){
    var li=document.createElement('li');
    li.innerHTML='<a href="javascript:;"><img src="'+pictuer+'.png"><br>'+name+'</a>';
    desk.appendChild(li);
    ev.preventDefault();//阻止冒泡;
    createDesk();//调用函数生成桌面
}


//生成桌面
createDesk();
function createDesk() {
    for (var i = 0; i < deskLi.length; i++) {
        deskLi[i].oncontextmenu= function (ev) {
            ev=ev||event;
            contextMenus.style.display = '';
            ev.cancelBubble=true;  //阻止冒泡
            return false;//阻止默认行为
            //隐藏右键菜单

        }
        drag(deskLi[i]);
        move(
            deskLi[i],
            {
                top: {
                    target: i%5*100,
                    duration: 2000,
                    fx: 'easeBothStrong'
                },
                left:{
                    target:Math.floor(i/5)*100,
                    duration: 2000,
                    fx: 'easeBothStrong'
                }
            }
        );
    }
//拖拽（可设置移动范围target）
    function drag(obj, target) {
        obj.onmousedown = function (ev) {
            if(obj.onOff)return;//设置开关
            var ev = ev || event;
            var mTop = this.offsetTop;
            var mLeft = this.offsetLeft;
            var disX = ev.clientX - mLeft;
            var disY = ev.clientY - mTop;
            var eles = [];//存储碰撞到的元素
            var dragX, dragY, dragSqr;//存放碰撞的区域值
            var max = 0, //存放最大值
                index = 0;//存放下标
            //设置全局捕获
            if (obj.setCapture) {
                obj.setCapture();
            }
            document.onmousemove = function (ev) {
                target = target || document.body;
                var ev = ev || event;
                var x = ev.clientX - disX;
                var y = ev.clientY - disY;
                var maxH = target.clientHeight - obj.offsetHeight;
                var maxW = target.clientWidth - obj.offsetWidth;
                //整理桌面
                aList[2].onclick= function () {//当页面元素发生移动时，整理桌面可用
                    createDesk();//初始化桌面
                }
                for (var i = 0; i < deskLi.length; i++) {
                    //与桌面别的元素碰撞且不是自己时
                    if (collisionTest(deskLi[i], obj) && deskLi[i] != obj) {
                          deskA[i].className='onlicks';//给碰撞到的元素加样式
                    }else{
                        deskA[i].className='';
                    }
                }

                //判断边界
                if (x < -25) {//25是margin-let值
                    x = -25;
                }
                if (x > maxW - 20) {//20是margin-right值
                    x = maxW - 20;
                }
                if (y < -55) {
                    y = -55
                }
                if (y > maxH - 90) {//90是任务栏的宽+margin值
                    y = maxH - 90;
                }
                obj.style.left = x + 'px';
                obj.style.top = y + 'px';
            }
            document.onmouseup = function () {
                //抬起时碰撞检测
                for (var i = 0; i < deskLi.length; i++) {
                    //与桌面别的元素碰撞且不是自己时
                    if (collisionTest(deskLi[i], obj) && deskLi[i] != obj) {
                        eles.push(deskLi[i]);//把碰撞到的元素存进数组
                }
                }
                document.onmousemove = document.onmouseup = null;
                //释放全局捕获 releaseCapture();
                if (obj.releaseCapture) {
                    obj.releaseCapture();
                }
                //如果数组为空不执行运动
                if (eles.length == 0)return;
                //同时碰撞两个元素时，检测那个碰撞的区域更多
                if(!Stop)return;//其他元素与正在运动的元素碰撞时不执行运动
                if (eles.length > 1) {
                    for (var i = 0; i < eles.length; i++) {
                        //判断是在所碰撞元素的左边还是右边
                        if(obj.offsetLeft>eles[i].offsetLeft){//右边
                            dragX = eles[i].offsetWidth + eles[i].offsetLeft - obj.offsetLeft;
                        }else{//左边
                            dragX = obj.offsetWidth + obj.offsetLeft - eles[i].offsetLeft;
                        }
                        //判断是在所碰撞元素的上边还是下边
                        if(obj.offsetTop>eles[i].offsetTop){
                            dragY = eles[i].offsetHeight + eles[i].offsetTop - obj.offsetTop;
                        }else{
                            dragY = obj.offsetHeight + obj.offsetTop - eles[i].offsetTop;
                        }
                        dragSqr = dragX * dragX + dragY * dragY;
                        if (max < dragSqr) {
                            max = dragSqr;//最大值赋值给max
                            index = i;//取最大值的下标
                        }
                    }
                    dragMove(eles[index]);

                 } else {//只碰撞到一个元素时
                    dragMove(eles[0]);
                }

            }

            //碰撞运动
            function dragMove(dragEles) {
                obj.onOff=dragEles.onOff=true;//打开开关，当前正在运动的元素，不能再执行鼠标按下事件
                Stop=false;
                move(
                    obj,
                    {
                        left: {
                            target: dragEles.offsetLeft,
                            duration: 2000,
                            fx: 'backIn'
                        },
                        top: {
                            target: dragEles.offsetTop,
                            duration: 2000,
                            fx: 'backIn'
                        }
                    },
                    function () {
                        obj.onOff=dragEles.onOff=false;//运动结束关闭开关，元素可以再次被按下
                        Stop=true;//运动结束，打开开关。
                        for(var i=0;i<deskLi.length;i++){
                            deskA[i].className='';//运动清空碰撞到元素的样式
                        }

                    }
                );
                //运动碰撞到的li
                move(
                    dragEles,
                    {
                        left: {
                            target: mLeft,
                            duration: 2000,
                            fx: 'easeBoth'
                        },
                        top: {
                            target: mTop,
                            duration: 2000,
                            fx: 'backIn'
                        }
                    }
                )

            }
        }

        return false;//阻止默认行为
    }

}


//点击显示或隐藏日历和时钟
timeBtn.onclick = function (ev) {
    ev = ev || event;
    oCalendar.style.display = oCalendar.style.display == 'block' ? '' : 'block';
    showCalendar();
    ev.cancelBubble = true;//阻止冒泡
}
oCalendar.onclick = function (ev) {
    ev = ev || event;
    ev.cancelBubble = true;//阻止冒泡
}
showCalendar();//生成日历和时钟
function showCalendar() {
    //获取系统时间
    var
        oDate = new Date(),
        iYear = oDate.getFullYear(),//年
        currentMonth = iMonth = oDate.getMonth(),//获取月份从0开始
        iDay = oDate.getDate();//获取到一个月中的那一天
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];//星期从0开始

    //日历元素获取
    var aBtn = document.getElementById('calendarTop').getElementsByTagName('span');
    var aA = oCalendar.getElementsByTagName('a')[0];
    var aP = document.getElementsByTagName('p')[0];
    var aEm = oCalendar.getElementsByTagName('em')[0];
    var tab = document.getElementsByTagName('table')[0];
    var oHint = document.getElementById('hint');
    var tbodies = tab.tBodies[0];
    aA.innerHTML = iYear + "年" + (iMonth + 1) + "月" + iDay + '日';//月份从0开始需要加1
    //滚轮切换月份
    document.onmousewheel = mouseWhell;
    document.addEventListener('DOMMouseScroll', mouseWhell, false);//滚轮事件
    //滚轮函数
    function mouseWhell(ev) {
        ev = ev || event;
        var target = 0;
        if (ev.wheelDelta) {//判断向上还是向下
            target = ev.wheelDelta < 0 ? 10 : -10;
        } else {
            target = ev.detail < 0 ? -10 : 10;
        }
        if (target > 0) {//滚动向下，月份加
            createCalendar(++iMonth);
        } else {//滚动向上，月份减
            createCalendar(--iMonth);
        }
        return false;
    }

    //点击切换月份
    aBtn[0].onclick = function () {//月份减少
        createCalendar(--iMonth);
    }
    aBtn[1].onclick = function () {//月份增多
        createCalendar(++iMonth);
    }
    //移入aA移动转日历转到当前日期
    aA.onmousemove = function (ev) {
        ev = ev || event;
        //每次移动清除定时器
        clearTimeout(this.timer);
        //记录鼠标的位置
        disX = ev.clientX;
        disY = ev.clientY;
        //根据鼠标位置定位提示框并显示
        var srollt = document.body.scrollTop;//滚动条高度
        oHint.style.cssText = 'left:' + disX + 'px;top:' + (disY + 22 + srollt) + 'px';
        //设置定时器，放置移动过快闪烁
        this.timer = setTimeout(function () {
            if (onOff) {//加开关避免点击后再次显示
                oHint.style.display = 'block';
            }

        }, 500)

    }
    //移出aA隐藏提示
    aA.onmouseout = function () {
        //移出清除定时器
        clearTimeout(this.timer);
        oHint.style.display = '';
        onOff = true;//移出aA打开开关
    }
    aA.onclick = function () {
        //转到今日
        //重置变化的iMonth值，使其为当前月份
        iMonth = currentMonth;
        createCalendar(iMonth);
        oHint.style.display = '';
        onOff = false;//点击后关闭开关,避免提示 oHint再次显示
    }

  /*  //日历时间切换
    aEm.onclick = function () {

    }*/

    //调用生成日历
    createCalendar(iMonth);
    function createCalendar(Month) {
        var idate = new Date(iYear, Month, 1);//需要不断变化的日期对象
        var month = idate.getMonth();//把当月的月份数保存下来
        aEm.innerHTML = idate.getFullYear() + "年" + (month + 1) + "月";//月份从0开始需要加1;
        var str = '';//存放拼接的字符串
        var n = 1 - idate.getDay();
        idate.setDate(n);//算出日历起始日期；
        str += '<tr>';
        for (var i = 1; i <= 42; i++) {
            var date = idate.getDate();
            var year = idate.getFullYear();
            if (idate.getMonth() != month) {//判断是不是当月
                str += '<td style="color: grey">' + date + '</td>';
            }else {
                //如果是当前年份且为当月当天，则添加classname
                if (year == iYear && date == iDay && idate.getMonth() == currentMonth) {
                    str += '<td class="current">' + date + '</td>';
                } else {
                    str += '<td>' + date + '</td>';
                }
            }
            if (i % 7 == 0 && i < 42) {//取模为0则拼上剩下的<tr>
                str += '</tr><tr>';
            }
            idate.setDate(date + 1);//使日期对象往后走一天
        }
        str += '</tr>';
        tbodies.innerHTML = str;

    }

    //每秒循环调用一次
    setInterval(clock, 1000);
    clock();
    function clock() {
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        var x = 200;
        y = 200, r = 150;//坐标和半径
        oGC.clearRect(0, 0, oC.width, oC.height);//每次调用清除画布；
        //获取系统时间
        var oDate = new Date();
        var iH = oDate.getHours();
        var iMin = oDate.getMinutes();
        var iDay = oDate.getDate();//获取到一个月中的那一天
        var iSec = oDate.getSeconds();
        var iWeek = oDate.getDay();//获取星期几
        var oHValue = (-90 + iH * 30 + iMin / 2) * Math.PI / 180;//时针走的度数
        var oMinValue = (-90 + iMin * 6) * Math.PI / 180;//分针走的度数
        var oSenValue = (-90 + iSec * 6) * Math.PI / 180;//秒针走的度数
        var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];//星期从0开始
        //数字时钟
        aP.innerHTML = timeAddZero(iH) + ':' + timeAddZero(iMin) + ':' + timeAddZero(iSec) + '<span>' + arr[iWeek] + '</span>';

        timeBtn.innerHTML = timeAddZero(iH) + ':' + timeAddZero(iMin) + '<br>' + iYear + '/' + (currentMonth + 1) + '/' + iDay;

        //canvas画时钟
        oGC.beginPath();
        for (var i = 0; i < 60; i++) {
            oGC.moveTo(x, y);//起始坐标
            oGC.arc(x, y, r, 6 * i * Math.PI / 180, 6 * (i + 1) * Math.PI / 180, false);//顺时针画圆
        }
        oGC.closePath();
        /*  oGC.strokeStyle='grey';*/
        oGC.stroke();

        //画圆覆盖上一个圆
        oGC.fillStyle = 'white';//背景白色；
        oGC.beginPath();
        oGC.moveTo(x, y);
        oGC.arc(x, y, r * 19 / 20, 0, 360 * Math.PI / 180, false);
        oGC.closePath();
        oGC.fill();

        //画小时刻度
        oGC.lineWidth = 5;
        oGC.beginPath();
        for (var i = 0; i < 12; i++) {
            oGC.moveTo(x, y);
            oGC.arc(x, y, r, 30 * i * Math.PI / 180, 30 * (i + 1) * Math.PI / 180, false);
        }
        oGC.closePath();
        oGC.stroke();

        //画圆盖住多出的小时刻度
        oGC.fillStyle = 'white';
        oGC.beginPath();
        oGC.moveTo(x, y);
        oGC.arc(x, y, r * 18 / 20, 0, 360 * Math.PI / 180, false);
        oGC.closePath();
        oGC.fill();

        //画时针
        oGC.lineWidth = 4;//宽度为4
        oGC.beginPath();
        oGC.moveTo(x, y);
        oGC.arc(x, y, r * 10 / 20, oHValue, oHValue, false);
        oGC.closePath();
        oGC.stroke();

        //画分针
        oGC.lineWidth = 3;//宽度为3
        oGC.beginPath();
        oGC.moveTo(x, y);
        oGC.arc(x, y, r * 14 / 20, oMinValue, oMinValue, false);
        oGC.closePath();
        oGC.stroke();

        //画秒针
        oGC.lineWidth = 2;//宽度为2
        oGC.beginPath();
        oGC.moveTo(x, y);
        oGC.arc(x, y, r * 18 / 20, oSenValue, oSenValue, false);
        oGC.closePath();
        oGC.stroke();
    }
}


//检测碰撞函数
function collisionTest(ele1, ele2) {
    var
        L1 = ele1.offsetLeft,
        R1 = L1 + ele1.offsetWidth,
        T1 = ele1.offsetTop,
        B1 = T1 + ele1.offsetHeight,

        L2 = ele2.offsetLeft,
        R2 = L2 + ele2.offsetWidth,
        T2 = ele2.offsetTop,
        B2 = T2 + ele2.offsetHeight;
    return !(L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2);
}


//获取到指定元素的距离
function getPos(obj, target) {
    target = target || document.body;
    var pos = {l: 0, t: 0};
    //console.log(obj.offsetParent.offsetParent.offsetParent);
    //如果obj.offsetParent存在的话就循环往上查找
    while (obj.offsetParent) {
        //每次加上obj到obj.offsetParent的距离。
        pos.l += obj.offsetLeft;
        pos.t += obj.offsetTop;
        //加完之后八obj换成obj.offsetParent
        obj = obj.offsetParent;
        //加上边框的width
        pos.l += obj.clientLeft;
        pos.t += obj.clientTop;
        //if(obj===target)obj=null;
    }
    //返回当前传入的元素到最外层的距离。
    return pos;
}

//时间补零函数。
function timeAddZero(str) {
    return str < 10 ? '0' + str : '' + str;
}

/*获取样式表样式方法*/
function getStyle(obj, attr) {

    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//滚动条高度
function scrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}


