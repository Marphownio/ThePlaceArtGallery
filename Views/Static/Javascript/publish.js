//图片上传部分
var typeArray = new Array(".tiff",".png",".jpeg",".jpg");
var fileNameObj = document.getElementsByClassName("filename");
var fileNameObj2 = document.getElementsByClassName("filename2");
var hidenBtnObj = document.getElementsByClassName("hidenbtn");
var allowSubmit = false;
var imgs = document.getElementsByClassName("imgs");
var typeExp = /\.[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
var regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function showimg(fileObj){
    var maxsize=15*1024*1024;//限制只能上传15M以内的文件
    var inform1=document.getElementById("warninform1");//获取图片上传验证信息的对象
    var file = fileObj.files[0];//得到上传图片
    if(fileObj.value){//确认图片有效
        var typeStore = fileObj.value.match(typeExp);
        for (var i = 0; i < typeArray.length; i++) {
            if (typeArray[i] == typeStore){
                allowSubmit = true;
                break;
            }//判断上传文件的格式是否为".tiff",".png",".jpeg",".jpg"中的任意一种
        }
        if(allowSubmit!=true){//格式不合适
            alert("请上传格式为.tiff、.png、.jpeg、.jpg的图片");
            return false;
        }
        else if(file.size>maxsize){//大小超出
            alert("上传图片大小不能超过15MB！");
            return false;
        }
        else{
            var valueStore = fileObj.value.match(regExp);//获取文件名，即文件路径最后一个“/”后的字符串
            fileNameObj[0].style.display="block";
            fileNameObj2[0].innerHTML =": "+ valueStore;//显示文件名
            inform1.style.display="none";//取消未上传文件提示
        }
    }
    if(file){
        var reader = new FileReader();//读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
        reader.onload = function(){//文件读取完毕
            var result = reader.result;
            imgs[0].style.display="block";//预览图片
            imgs[0].src = result;//得到文件路径
            imgs[1].style.display="none";//隐藏加号图片
        }
        reader.readAsDataURL(file);  
        return true;
    }
    else{
        alert("文件上传失败！");//处理异常情况
        return false;
    }
}
function uploadActive(){
    hidenBtnObj[0].click();//绑定预览框与文件上传input
}


//表单验证部分，这里是提示信息数组
var warningObj = document.getElementsByClassName("publishwarning");
//名称的检查
function nametest(){
    var artnameObj = document.getElementById("publish_name");
    var artname=artnameObj.value;
    if(artname==""){
        warningObj[0].style.display="inline";
        warningObj[0].innerHTML="*请输入艺术品名";
        return false;
    }
    else{
        warningObj[0].style.display="none";
        warningObj[0].innerHTML="";
        return true;
    }
}
//作者检查
function artisttest(){
    var artistObj = document.getElementById("publish_artist");
    var artist=artistObj.value;
    if(artist==""){
        warningObj[1].style.display="inline";
        warningObj[1].innerHTML="*请输入作者姓名";
        return false;
    }
    else{
        warningObj[1].style.display="none";
        warningObj[1].innerHTML="";
        return true;
    }
}
//创作年份检查
function yeartest(){
    var yearObj = document.getElementById("publish_year");
    var year=yearObj.value;
    var patt1=/^[123456789]{1}[1234567890]{0,3}$/;//四位数的年份
    var patt2=/^[0]{1}$/;//0
    var patt3=/^\-[123456789]{1}[1234567890]{0,}$/;//负数年份
    if(year==""){
        warningObj[2].style.display="inline";
        warningObj[2].innerHTML="*请输入创作年份";
        return false;
    }
    else if(year>2022){
        warningObj[2].style.display="inline";
        warningObj[2].innerHTML="*年份需小于2022";
        return false;
    }
    else if(!patt1.test(year)&&!patt2.test(year)&&!patt3.test(year)){
        warningObj[2].style.display="inline";
        warningObj[2].innerHTML="*请输入整数年份";
        return false;
    }
    else{
        warningObj[2].style.display="none";
        warningObj[2].innerHTML="";
        return true;
    }
}
//艺术流派检查
function styletest(){
    var styleObj = document.getElementById("publish_type");
    var xObj = document.getElementById("detailinfor");
    var style=styleObj.value;
    if(style==""){
        xObj.style.display="none";
        warningObj[3].style.display="inline";
        warningObj[3].innerHTML="*请输入艺术流派";
        return false;
    }
    else{
        xObj.style.display="inline";
        warningObj[3].style.display="none";
        warningObj[3].innerHTML="";
        return true;
    }
}
//价格检查
function pricetest(){
    var priceObj = document.getElementById("publish_price");
    var price=priceObj.value;
    var patt4=/^[123456789]{1}[1234567890]{0,}$/;//正整数
    if(price==""){
        warningObj[4].style.display="inline";
        warningObj[4].innerHTML="*请输入售价";
        return false;
    }
    else if(!patt4.test(price)){
        warningObj[4].style.display="inline";
        warningObj[4].innerHTML="*售价需为正整数";
        return false;
    }
    else{
        warningObj[4].style.display="none";
        warningObj[4].innerHTML="";
        return true;
    }
}
//长度检查
function lengthtest(){
    var lengthObj = document.getElementById("publish_length");
    var length=lengthObj.value;
    if(length==""){
        warningObj[5].style.display="inline";
        warningObj[5].innerHTML="*请输入长度";
        return false;
    }
    else if(length<=0){
        warningObj[5].style.display="inline";
        warningObj[5].innerHTML="*长度需为正";
        return false;
    }
    else{
        warningObj[5].style.display="none";
        warningObj[5].innerHTML="";
        return true;
    }
}
//宽度检查
function widthtest(){
    var widthObj = document.getElementById("publish_width");
    var width=widthObj.value;
    if(width==""){
        warningObj[6].style.display="inline";
        warningObj[6].innerHTML="*请输入宽度";
        return false;
    }
    else if(width<=0){
        warningObj[6].style.display="inline";
        warningObj[6].innerHTML="*宽度需为正";
        return false;
    }
    else{
        warningObj[6].style.display="none";
        warningObj[6].innerHTML="";
        return true;
    }
}
//简介输入检查
function introtest(){
    var introObj = document.getElementById("publish_intro");
    var intro=introObj.value;
    if(intro==""){
        warningObj[7].style.display="inline";
        warningObj[7].innerHTML="*请输入艺术品简介";
        return false;
    }
    else{
        warningObj[7].style.display="none";
        warningObj[7].innerHTML="";
        return true;
    }
}
//图片上传检查
function filrtest(){
    var fileObj = document.getElementById("imgbtn");
    var file=fileObj.value;
    var inform=document.getElementById("warninform1");
    if(file){
        inform.style.display="none";
        inform.innerHTML=""
        return true;
    }
    else{
        inform.style.display="block";
        inform.innerHTML="*请选择艺术品图片"
        return false;
    } 
}
//发布作品时，对所有表项填写检查
function publishtest(){
    if(!filrtest()||!nametest()||!artisttest()
    ||!yeartest()||!styletest()
    ||!pricetest()||!lengthtest()
    ||!widthtest()||!introtest()){
        alert("请在正确填写所有表单必填信息后再发布！");
        return false;
    }
    else{
        if(window.confirm("确认发布艺术品吗？")){
            return true;
        }
        else return false;
    }
}
//发出AJAX异步请求，从而预填充表单信息
function getInformToUpate(productId){
    let url="?p=product&m=getProductInfromToUpadte&productId="+productId;
    xmlHttp=new XMLHttpRequest();
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange=function () {
        if (xmlHttp.readyState ==4 && xmlHttp.status ==200){
            let result = xmlHttp.responseText;
            result = JSON.parse(result);
            document.getElementById('publish_name').value = result.productName;
            document.getElementById('publish_artist').value = result.productArtist;
            document.getElementById('publish_year').value = result.productCreatedYear;
            document.getElementById('publish_type').value = result.productType;
            document.getElementById('publish_subject').value = result.productSubject;
            document.getElementById('publish_times').value = result.productCreatedTimes;
            document.getElementById('publish_price').value = result.productPrice;
            document.getElementById('publish_length').value = result.productLength;
            document.getElementById('publish_width').value = result.productWidth;
            document.getElementById('publish_intro').value = result.productIntroduction;
        }
    }
}
//修改作品信息时，对除了图片外的所有表项填写检查
function modifyTest(){
    if(!nametest()||!artisttest()
        ||!yeartest()||!styletest()
        ||!pricetest()||!lengthtest()
        ||!widthtest()||!introtest()){
        alert("请在正确填写所有修改信息后再提交！");
        return false;
    }
    else{
        if(window.confirm("确认修改该艺术品信息吗？")){
            return true;
        }
        else return false;
    }
}


