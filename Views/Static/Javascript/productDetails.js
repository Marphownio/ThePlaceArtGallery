function addToShoppingCart(productId){
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
function getCommentsByProductId(productId){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            document.getElementById('commentstable').innerHTML=requestForResult.responseText;
        }
    }
    requestForResult.open('post',"?p=comment&m=getCommentsByProductId");
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('productId='+productId);
}
let productId;
window.onload = function (){
    productId = window.document.location.search.split("?productId=")[1];
    getCommentsByProductId(productId);
    let smallBox = document.getElementById('smallBox');
    let bigImg = document.getElementById('productimg');
    let context = smallBox.getContext('2d');
    bigImg.onmouseenter = function (){//当鼠标进入大图片框显示放大框
        smallBox.style.display="block";
        bigImg.style.objectFit="cover";
    }
    bigImg.onmouseleave =function (){//当鼠标移出大图片框隐藏放大框
        smallBox.style.display="none";
        bigImg.style.objectFit="contain";
    }
    bigImg.onmousemove = function (event){//当鼠标在大图片框中移动时
        smallBox.style.left = bigImg.offsetLeft + bigImg.offsetWidth + 1 + "px";//将放大框x轴坐标固定在大图片右边
        smallBox.style.top = event.clientY-102  + "px";                         //放大框中心的y轴坐标与鼠标同高
        let pointX = event.pageX-bigImg.offsetLeft;                              //获取鼠标到大图片框的x轴偏移量
        let pointY = event.pageY-bigImg.offsetTop;                               //获取鼠标到大图片框的y轴偏移量
        //drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight,destX, destY, destWidth, destHeight)
        context.drawImage(bigImg,pointX*2,pointY*1.3,75,75,0,0,150,150);
    }
}
function toComment(){
    if(!confirm("您确认要发布吗？")){
        return false;
    }
    let commentContent = document.getElementById('comment').value;
    if(commentContent==""){
        alert("请输入内容后再点击发布哦！");
        return false;
    }
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText==="SUCCESS"){
                alert("评论发布成功！");
                getCommentsByProductId(productId);
                document.getElementById('comment').value="";
            }
            else{
                alert("评论发布失败！请重新尝试！");
            }
        }
    }
    requestForResult.open('post',"?p=comment&m=uploadComment");
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('commentContent='+commentContent+'&productId='+productId);
}
function toLike(commentId){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText==="UNLOGGED"){
                alert("请先登录后再点赞哦！");
                window.location.href="/login";
            }
            else if(requestForResult.responseText==="FAILED"){
                alert("点赞失败！请重新尝试！");
            }
            else if(requestForResult.responseText==="SUCCESS"){
                getCommentsByProductId(productId);
            }
        }
    }
    requestForResult.open('post',"?p=comment&m=toLike");
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('commentId='+commentId);
}
function toDeleteComment(commentId){
    if(!confirm("您确认要删除该条评论吗？")){
        return false;
    }
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
                if(requestForResult.responseText==="UNLOGGED"){
                    alert("请先登录！");
                    window.location.href="/login";
                }
                else if(requestForResult.responseText==="FAILED"){
                    alert("删除失败！请重新尝试！");
                }
                else if(requestForResult.responseText==="SUCCESS"){
                    alert("删除成功！");
                    getCommentsByProductId(productId);
                }
        }
    }
    requestForResult.open('post',"?p=comment&m=toDeleteComment");
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('commentId='+commentId);
}
function toCancleLike(commentId){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            if(requestForResult.responseText==="UNLOGGED"){
                alert("请先登录！");
                window.location.href="/login";
            }
            else if(requestForResult.responseText==="FAILED"){
                alert("取消失败！请重新尝试！");
            }
            else if(requestForResult.responseText==="SUCCESS"){
                getCommentsByProductId(productId);
            }
        }
    }
    requestForResult.open('post',"?p=comment&m=toDislike");
    requestForResult.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requestForResult.send('commentId='+commentId);
}

