function openTopUpDialog(){
    let payBoxObj=document.getElementById('payBox');
    payBoxObj.style.transform="translateY(-600px)";
    payBoxObj.style.opacity="1";
}
function closeTopUpDialog(){
    let payBoxObj=document.getElementById('payBox');
    payBoxObj.style.transform="translateY(-300px)";
    payBoxObj.style.opacity="0";
}
function topUpTest(){
    let topupObj = document.getElementById('payInput');
    let topUp = topupObj.value;
    let warnObj = document.getElementById('warnin');
    // let patt=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;//人民币金额匹配
    let patt = /^[1-9]\d*$/;
    if(topUp==""){
        warnObj.innerHTML="*请输入充值金额！";
        return false;
    }
    else if(!patt.test(topUp)){
        warnObj.innerHTML="*请输入正整数金额数目！";
        return false;
    }
    else{
        warnObj.innerHTML="&nbsp;";
        return true;
    }
}
window.onload=function(){
    let submit_btn=document.getElementById('submit_btn');
    submit_btn.onclick=function(){
        if(topUpTest()===true){
            return true;
        }
        else return false;
    }
}