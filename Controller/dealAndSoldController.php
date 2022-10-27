<?php
function getPurchasedInform(){
    session_start();
    $userName = $_SESSION['currentUserName'];
    if(!isset($userName)){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    $getMyOrders = "select * from productdeal where productBuyerName = '$userName'";
    $result = $mysqli->query($getMyOrders);
    $number = mysqli_num_rows($result);
    if($number==0){
        echo '<tr><td colspan="6" id="nullArtWorks">您当前还没有订单呢:(<br>先去商品页面逛一逛吧！</td></tr>';
        $mysqli->close();
        exit;
    }
    $i=0;
    while($data = mysqli_fetch_assoc($result)){
        $i++;
        echo '<tr><td class="buy_clo1" rowspan="2">'.$i.'</td>';
        echo '<td class="buy_clo2" rowspan="2"><img src="?p=user&m=imgView&a='.$data['productId'].'"></td>';
        echo '<td class="buy_clo3">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</td>';
        echo '<td class="buy_clo5"><a title="点击进入艺术品详情页" href="/productDetails?productId='.$data['productId'].'">'.$data['productName'].'</a></td>';
        echo '<td class="buy_clo7">下单时间:</td>';
        echo '<td class="buy_clo9">'.$data['productBroughtTime'].'</td></tr>';
        echo '<tr><td class="buy_clo4">订单编号</td>';
        echo '<td class="buy_clo6">'.$data['Id'].'</td>';
        echo '<td class="buy_clo8">订单金额</td>';
        echo '<td class="buy_clo10">￥'.$data['productPrice'].'</td></tr>';
    }
    $mysqli->close();
}
function getMySoldInform(){
    session_start();
    $userName = $_SESSION['currentUserName'];
    if(!isset($userName)){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    $getMySold = "select * from productdeal where productUploaderName = '$userName'";
    $result = $mysqli->query($getMySold);
    $number = mysqli_num_rows($result);
    if($number==0){
        echo '<tr><td colspan="10" id="nullArtWorks">您当前还没有艺术品卖出呢:(<br>再多多上传艺术品吧！</td></tr>';
        $mysqli->close();
        exit;
    }
    $i=0;
    while($data = mysqli_fetch_assoc($result)){
        $thisBuyerName = $data['productBuyerName'];
        $getBuyerInform = "select userEmail,userAddress,userPhoneNumber from user where userName = '$thisBuyerName'";
        $buyerInform = $mysqli->query($getBuyerInform)->fetch_assoc();
        $i++;
        echo '<tr><td class="sell_clo1" rowspan="2">'.$i.'</td>';
        echo '<td class="sell_clo2" rowspan="2"><img src="?p=user&m=imgView&a='.$data['productId'].'"></td>';
        echo '<td class="sell_clo3">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</td>';
        echo '<td class="sell_clo5"><a title="点击进入艺术品详情页" href="/productDetails?productId='.$data['productId'].'">'.$data['productName'].'</a></td>';
        echo '<td class="sell_clo7">成交时间</td>';
        echo '<td class="sell_clo9">'.$data['productBroughtTime'].'</td>';
        echo '<td class="sell_clo3">用户名</td>';
        echo '<td class="sell_clo5">'.$data['productBuyerName'].'</td>';
        echo '<td class="sell_clo7">邮箱</td>';
        echo '<td class="sell_clo9">'.$buyerInform['userEmail'].'</td></tr>';
        echo '<tr><td class="sell_clo4">订单编号</td>';
        echo '<td class="sell_clo6">'.$data['Id'].'</td>';
        echo '<td class="sell_clo8">成交金额</td>';
        echo '<td class="sell_clo10">￥'.$data['productPrice'].'</td>';
        echo '<td class="sell_clo4">电话</td>';
        echo '<td class="sell_clo6">'.$buyerInform['userPhoneNumber'].'</td>';
        echo '<td class="sell_clo8">收货地址</td>';
        echo '<td class="sell_clo10">'.$buyerInform['userAddress'].'</td></tr>';
    }
    $mysqli->close();
}