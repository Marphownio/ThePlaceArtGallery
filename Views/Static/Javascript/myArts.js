function confirm_function(){
    window.confirm("确认删除该艺术品吗？");
    alert("删除成功！")
    return;
}
// function openTopUpDialog(){
//     let payBoxObj=document.getElementById('payBox');
//     payBoxObj.style.transform="translateY(-600px)";
//     payBoxObj.style.opacity="1";
// }
function openDeleteDialog(productId){
    let deleteBoxObj=document.getElementById('deleteBox');
    deleteBoxObj.style.transform="translateY(-600px)";
    deleteBoxObj.style.opacity="1";
    document.getElementById('productId').value=productId;
}
// function closeTopUpDialog(){
//     let payBoxObj=document.getElementById('payBox');
//     payBoxObj.style.transform="translateY(-300px)";
//     payBoxObj.style.opacity="0";
// }
function closeDeleteDialog(){
    let payBoxObj=document.getElementById('deleteBox');
    payBoxObj.style.transform="translateY(-300px)";
    payBoxObj.style.opacity="0";
}
// function topUpTest(){
//     let topupObj = document.getElementById('payInput');
//     let topUp = topupObj.value;
//     let warnObj = document.getElementById('warnin');
//     // let patt=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;//人民币金额匹配
//     let patt = /^[1-9]\d*$/;
//     if(topUp==""){
//         warnObj.innerHTML="*请输入充值金额！";
//         return false;
//     }
//     else if(!patt.test(topUp)){
//         warnObj.innerHTML="*请输入正整数金额数目！";
//         return false;
//     }
//     else{
//         warnObj.innerHTML="&nbsp;";
//         return true;
//     }
// }
function toDelete(){
    let productId = document.getElementById('productId').value;
    window.location.href="/?p=product&m=delete&productId="+productId;
}
function publish(){
    window.location.href="/publish";
}
function productModify(productId){
    window.location.href="/productModify?productId="+productId;
}
// window.onload=function(){
//     let submit_btn=document.getElementById('submit_btn');
//     submit_btn.onclick=function(){
//         if(topUpTest()===true){
//             return true;
//         }
//         else return false;
//     }
// }
// function showpage(url) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             document.getElementById("result").innerHTML = xhr.responseText;
//         }
//     }
//     xhr.open('get',url);
//     xhr.send(null);
// }
