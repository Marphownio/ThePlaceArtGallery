window.onload=function(){
    //第一个轮播组件
    var minObj = document.querySelectorAll('.min');
    //获取文档中class=min的所有元素，返回 NodeList 对象。
    var imagesObj = document.querySelector('#images');
    //获取文档中id=iaages的所有元素，返回 NodeList 对象。
    var index = 0;  
    var time;
    //position()右移动一张
    function position(){
        imagesObj.style.left = (index * -100) + "%"
    }
    //index增加
    function add(){
        if(index >= minObj.length-1){
            index = 0;
        }
        else index++;
    }
    //计时器
    function timer(){
        time = setInterval(()=>{
        add();
        position();
        },4000);//每4秒
    }
    minObj[0].addEventListener('click',()=>{
        index = 0;
        position();
        clearInterval(time); //清除记时再重新开始
        timer();}
    );
    minObj[1].addEventListener('click',()=>{
        index = 1;
        position();
        clearInterval(time); //清除记时再重新开始
        timer();}
    );
    minObj[2].addEventListener('click',()=>{
        index = 2;
        position();
        clearInterval(time); //清除记时再重新开始
        timer();}
    );
    minObj[3].addEventListener('click',()=>{
        index = 3;
        position();
        clearInterval(time); //清除记时再重新开始
        timer();}
    );
    minObj[4].addEventListener('click',()=>{
        index = 4;
        position();
        clearInterval(time); //清除记时再重新开始
        timer();}
    );
    minObj[5].addEventListener('click',()=>{
        index =5;
        position();
        clearInterval(time); //清除记时再重新开始
        timer();}
    );
    timer();
}

