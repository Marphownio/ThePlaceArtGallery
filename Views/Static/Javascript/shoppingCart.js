window.onload=function (){
    getAllProductInMyShoppingCart();
}
function getAllProductInMyShoppingCart(){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            document.getElementById('allProductInCart').innerHTML=requestForResult.responseText;
        }
    }
    requestForResult.open('get','?p=myShoppingCart&m=getProductInMyCart');
    requestForResult.send(null);
}
function deleteCurrentProduct(productId){
    if(!confirm("您确定要从购物车中删除该艺术品吗？")){
        return false;
    }
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText=='SUCCESS'){
                alert("删除成功！");
                getAllProductInMyShoppingCart();
            }
            else{
                alert("删除失败！请再次尝试！");
            }
        }
    }
    requestForResult.open('post','?p=myShoppingCart&m=removeProductInCart');
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('productId='+productId);
}
function openDialog(number,price){
    document.getElementById('diaNumber').innerText=number;
    document.getElementById('diaPrice').innerText=price;
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            let arr = eval(requestForResult.responseText);
            if(arr[0]<price){
                document.getElementById('diaAccount').innerText=arr[0]+"(您的余额不足)";
                document.getElementById('toBuysubmitbtn').style.display="none";
            }
            else {
                document.getElementById('topUpBtn').style.display="none";
                document.getElementById('diaAccount').innerText=arr[0];
            }
            document.getElementById('diaPhoneNumber').innerText=arr[1];
            document.getElementById('diaAddress').innerText=arr[2];
        }
    }
    requestForResult.open('get','?p=user&m=shoppingCartGet');
    requestForResult.send(null);
    let dialog = document.getElementById('toBuyBox');
    dialog.style.opacity="1";
    dialog.style.transform="translateY(-500px)";
}
function closeDialog(){
    let dialog = document.getElementById('toBuyBox');
    dialog.style.opacity="0";
    dialog.style.transform="translateY(-1000px)";
}
function toTopUp(){
    window.location.href="/profile/myInfor";
}
function toBuy(){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText=="SUCCESS"){
                alert("下单成功!");
                window.location.href="/profile/myPurchased";
            }
        }
    }
    requestForResult.open('get','?p=product&m=buy');
    requestForResult.send(null);
}
function cleanChangeWMsg(){
    if(!confirm("您确定要将所有信息变动提示清除吗？")){
        return false;
    }
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText=="SUCCESS"){
                alert("已清空信息变动提示!");
            }
            else{
                alert("清空信息变动失败!请重试！");
            }
        }
        getAllProductInMyShoppingCart();
    }
    requestForResult.open('get','?p=myShoppingCart&m=cleanChangeWMsg');
    requestForResult.send(null);
}