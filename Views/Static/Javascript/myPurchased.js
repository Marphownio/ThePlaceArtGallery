window.onload=function (){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            document.getElementById('purchasedResult').innerHTML=requestForResult.responseText;
        }
    }
    requestForResult.open('get',"?p=myPurchased&m=getPurchasedInform");
    requestForResult.send(null);
}