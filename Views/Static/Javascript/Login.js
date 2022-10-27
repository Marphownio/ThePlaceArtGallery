//检测用户名的输入
function IDtest(){
    var loginMethods=document.getElementById("loginMethods");
    var IdObj=document.getElementById("IDinput");
    var IDwarninformationObj=document.getElementById('IdWhetherNull');
    var ID=IdObj.value;
    var patt1=/^[\w-_]{1,15}$/;//代表id用户名登录
    var patt2=/^[\w\._-]+@(([\w_-]+)\.+)+\w+$/;//代表邮箱登录
    if(ID==""){
        IDwarninformationObj.innerHTML="*请输入用户名或邮箱地址";
        return 0;
    }
    else if(patt1.test(ID)){//代表id用户名登录，状态数为1
        IDwarninformationObj.innerHTML="&nbsp;";
        loginMethods.value="1";
        return 1;
    }
    else if(patt2.test(ID)){//代表id邮箱登录，状态数为2
        IDwarninformationObj.innerHTML="&nbsp;";
        loginMethods.value="2";
        return 2;
    }
    else{
        IDwarninformationObj.innerHTML="*请输入正确的用户名或邮箱地址如A@B.C";
        return 0;
    }
}


//检测密码的输入与否
function PWtest(){
    var PWObj=document.getElementById("Passwordinput");
    var PWwarninformationObj=document.getElementById("PWWhetherNull");
    var PW=PWObj.value;
    var patt00=/\s+/;
    if(PW==""){
        PWwarninformationObj.innerHTML="*请输入密码";
        return false;
    }
    else if(patt00.test(PW)){
        PWwarninformationObj.innerHTML="*密码中不能包含空格";
        return false;
    }
    else{
        PWwarninformationObj.innerHTML="&nbsp;";
        return true;
    }
}

//生成随机验证码
function Random_generate_identifying_code(identifying_number) {
    var canvas_width=document.getElementById('canvas').clientWidth;
    var canvas_height=document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");//获取到canvas的对象
    var context = canvas.getContext("2d");//获取到canvas画图的环境
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var allCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
    var aCode = allCode.split(",");//不输入','号
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i <= 3; i++) {
        //Math.random()产生一个[0，1)之间的随机数
        //Math.floor()返回小于或等于一个给定数字的最大整数
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值,以确定验证码的值
        // Math.PI圆周率，也是弧度制中的108度
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度，以防旋转姿态过大
        var txt = aCode[j];//得到随机的一个内容
        identifying_number[i] = txt;
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";//确定字体的样式
        //translate()为画布添加水平的和垂直的偏移；rotate()添加旋转角度
        context.translate(x, y);
        context.rotate(deg);
        //为画布添加随机颜色
        context.fillStyle = randomColor();
        //context.fillText(text,x,y,maxWidth);text：画布上输出的文本。x,y为相对坐标
        context.fillText(txt, 0, 0);
        //将画布摆正，以进行下一个验证码的画入
        context.rotate(-deg);
        context.translate(-x, -y);
    }
    //验证码上随机显示6条线条
    for (var i = 0; i < 6; i++) { 
        context.strokeStyle = randomColor();//随机确定当前的笔触颜色
        context.beginPath();//用beginPath()方法开始一条路径
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);//随机确定一个起始点
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);//随机确定一个结束点
        context.stroke();//用stroke()方法结束该路径
    }
    //验证码上显示30个小点
    for (var i = 0; i < 30; i++) { 
        context.strokeStyle = randomColor();//随机确定当前的笔触颜色
        context.beginPath();//用beginPath()方法开始本路径
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;//随机获得点的坐标
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();//用stroke()方法结束该路径
    }
}

//得到随机的颜色值的函数
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

//验证码的生成与检测
//页面加载完成后即生成验证码
window.onload=function(){
    var identifying_number = [];
    Random_generate_identifying_code(identifying_number);
    var reGenerateObj=document.getElementById("canvas");
    reGenerateObj.onclick=function(){
        Random_generate_identifying_code(identifying_number);
    }
    var submitObj=document.getElementById("submit_btn");
    submitObj.onclick=function(){//先检查是否输入邮箱或者是用户名以及密码
        if(IDtest()==0||PWtest()==false){
            return false;
        }
        //若输入，即检查验证码
        var identifynumberObj=document.getElementById("IdentifyingCode");
        var identifynumber=identifynumberObj.value;
        var targetnumber = identifying_number.join("");//将数组元素转换为字符串
        if(identifynumber==""){//未输入验证码
            alert("请输入验证码后再登录！");
            return false;
        }
        else if(targetnumber==identifynumber){
            return true;//验证码输入正确
        }
        else{//验证码输入错误
            alert('验证码错误！\n你输入的是:  '+identifynumber+"\n正确的是:  "+targetnumber+'\n请重新输入！');//页面提示正确与错误的验证码
            Random_generate_identifying_code(identifying_number);
            identifynumberObj.value="";
            return false;
        }
    }
}

