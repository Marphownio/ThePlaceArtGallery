<?php
function getProductInMyCart(){
    session_start();
    $userName = $_SESSION['currentUserName'];
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getMyProductInCart = "select * from shoppingcart where userName='$userName'";
    $result = $mysqli->query($getMyProductInCart);
    $number = mysqli_num_rows($result);
    if($number==0){
        echo '<tr><td colspan="7" id="snullResult">啊哦！购物车目前还是空空的呢:(<br>快去商品页面逛一逛吧！</td></tr>';
        return false;
    }
    $goodsNumber = 0;
    $flag = 0;
    $goodsPriceTotal = 0;
    while($data = mysqli_fetch_assoc($result)){
        echo '<tr class="trclass1">';
        echo '<td class="tdtwoimg" rowspan="2"><img src="?p=user&m=imgView&a='.$data['productId'].'"></td>';
        echo '<td class="tdtwoname">名称：<a title="点击进入艺术品详情页" href="/productDetails?productId='.$data['productId'].'">'.$data['productName'].'</a></td>';
        echo '<td class="tdthree" rowspan="2">'.$data['productIntroduction'].'</td>';
        echo '<td class="tdfour" rowspan="2">'.$data['productUploaderName'].'</td>';
        echo '<td class="tdfive" rowspan="2">￥'.$data['productPrice'].'</td>';
        if($data['ifSold']==0){
            $goodsPriceTotal +=$data['productPrice'];
            $goodsNumber++;
        }
        if($data['ifSold']==1){
            $warningMsg = '该艺术品已售出，请您从购物车中删除';
        }
        if($data['ifModified']==1&&$data['ifSold']==0){
            $flag = 1;
            $warningMsg = '该艺术品信息存在变动';
        }
        if($data['ifModified']==0&&$data['ifSold']==0){
            $warningMsg = '未售出';
        }
        echo '<td class="tdsix" rowspan="2">'.$warningMsg.'</td>';
        echo '<td class="tdseven" rowspan="2"><button onclick="javascript:deleteCurrentProduct('.$data['productId'].')" class="del">删除</button></td></tr><tr class="trclass2"><td class="tdtwoartist">艺术家：'.$data['productArtist'].'</td></tr>';
        echo '<tr> <td colspan="7" id="lines"></td></tr>';
    }
    echo '<tr><td  colspan="7" class="talast">可购买商品一共'.$goodsNumber.'件; 共计花费'.$goodsPriceTotal.'元;</td></tr>';
    if($goodsNumber!=0){
        echo '<tr><td   colspan="7" class="btnRow"><input type="submit" onclick="openDialog('.$goodsNumber.','.$goodsPriceTotal.')" id="nowbuy" value="￥'.$goodsPriceTotal.'立即下单"/>';
    }
    if($flag){
        echo '<button id="cleanBtn" onclick="cleanChangeWMsg()">已读变动消息</button>';
    }
    echo "</td></tr>";

}
function removeProductInCart(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $productId = $_POST['productId'];
    $userName = $_SESSION['currentUserName'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $delete = "delete from shoppingcart where userName = '$userName' and productId = '$productId'";
    if($mysqli->query($delete)){
        echo 'SUCCESS';
    }
    else echo "FAILED";
    $mysqli->close();
}
function cleanChangeWMsg(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $userName = $_SESSION['currentUserName'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    $update = "update shoppingcart set ifModified = 0 where userName = '$userName'";
    if($mysqli->query($update)){
        echo 'SUCCESS';
    }
    else echo "FAILED";
    $mysqli->close();
}
