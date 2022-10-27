function showResult(url){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            document.getElementById("result").innerHTML = requestForResult.responseText;
        }
    }

    requestForResult.open('get',url);
    requestForResult.send(null);
}
window.onload = function() {
    const url0 = window.document.location.href.toString();
    let index = url0.indexOf('?');
    let url1 = "?p=search&";
    let url2 = url0.substring(index+1);
    showResult(url1+url2);
    document.getElementById("search-btn").addEventListener("click",searchFunction);
    document.getElementById("showbytitle").addEventListener("click",showbytitle);
    document.getElementById("showbyviews").addEventListener("click",showbyviews);
    document.getElementById("showbyprice").addEventListener("click",showbyprice);
    document.getElementById("bytitle").addEventListener("click",searchByTitle);
    document.getElementById("byname").addEventListener("click",searchByName);
}
function searchFunction(){
    let searchBy;
    let sortBy;
    let content = document.getElementById("searchInput").value;
    if(document.getElementById("bytitle").checked){
        searchBy='1';
    }
    else if(document.getElementById("byname").checked){
        searchBy='2';
    }
    if(document.getElementById("showbytitle").checked){
        sortBy='1';
    }
    else if(document.getElementById("showbyviews").checked){
        sortBy='2';
    }
    else if(document.getElementById("showbyprice").checked){
        sortBy='3';
    }
    const url0 = window.document.location.pathname;
    let url = url0+"?sortBy="+sortBy+"&searchBy="+searchBy+"&content="+content;
    window.location.href=url;
}
function showbytitle(){
    let searchBy;
    let sortBy = '1';
    let content = document.getElementById("searchInput").value;
    if(document.getElementById("bytitle").checked){
        searchBy='1';
    }
    else if(document.getElementById("byname").checked){
        searchBy='2';
    }
    const url0 = window.document.location.pathname;
    let url = url0+"?sortBy="+sortBy+"&searchBy="+searchBy+"&content="+content;
    window.location.href=url;
}
function showbyviews(){
    let searchBy;
    let sortBy = '2';
    let content = document.getElementById("searchInput").value;
    if(document.getElementById("bytitle").checked){
        searchBy='1';
    }
    else if(document.getElementById("byname").checked){
        searchBy='2';
    }
    const url0 = window.document.location.pathname;
    let url = url0+"?sortBy="+sortBy+"&searchBy="+searchBy+"&content="+content;
    window.location.href=url;
}
function showbyprice(){
    let searchBy;
    let sortBy = '3';
    let content = document.getElementById("searchInput").value;
    if(document.getElementById("bytitle").checked){
        searchBy='1';
    }
    else if(document.getElementById("byname").checked){
        searchBy='2';
    }
    const url0 = window.document.location.pathname;
    let url = url0+"?sortBy="+sortBy+"&searchBy="+searchBy+"&content="+content;
    window.location.href=url;
}
function searchByTitle(){
    let searchBy=1;
    let sortBy;
    let content = document.getElementById("searchInput").value;
    if(document.getElementById("showbytitle").checked){
        sortBy='1';
    }
    else if(document.getElementById("showbyviews").checked){
        sortBy='2';
    }
    else if(document.getElementById("showbyprice").checked){
        sortBy='3';
    }
    const url0 = window.document.location.pathname;
    let url = url0+"?sortBy="+sortBy+"&searchBy="+searchBy+"&content="+content;
    window.location.href=url;
}
function searchByName(){
    let searchBy=2;
    let sortBy;
    let content = document.getElementById("searchInput").value;
    if(document.getElementById("showbytitle").checked){
        sortBy='1';
    }
    else if(document.getElementById("showbyviews").checked){
        sortBy='2';
    }
    else if(document.getElementById("showbyprice").checked){
        sortBy='3';
    }
    const url0 = window.document.location.pathname;
    let url = url0+"?sortBy="+sortBy+"&searchBy="+searchBy+"&content="+content;
    window.location.href=url;
}
function searchAddToShoppingCart(productId){
    if(!confirm("您确定要加入该艺术品到购物车吗？")){
        return false;
    }
    let requestForResult = new XMLHttpRequest();
    let url="?p=product&m=addToShoppingCart";
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText==="UNLOGED"){
                alert("请先登录后再将商品加入购物车！");
                window.location.href="/login";
            }
            if(requestForResult.responseText==="SOLD"){
                alert("该商品已经出售啦，无法加入购物车哦！");
            }
            if(requestForResult.responseText==="CONFLICT"){
                alert("您无法将自己发布的艺术品添加进购物车哦！");
            }
            if(requestForResult.responseText==="EXISTED"){
                alert("该商品已存在于您的购物车！");
            }
            if(requestForResult.responseText==="FAILED"){
                alert("添加失败！请再次尝试");
            }
            if(requestForResult.responseText==="SUCCESS"){
                if(confirm("添加成功！是否跳转至购物车查看？")){
                    window.location.href="/myShoppingCart";
                };
            }
        }
    }
    requestForResult.open('post',url);
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('productId='+productId);
}