<?php
function getProductInfromById(){
    $productId = $_GET['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getProduct = "select * from product where productId = '$productId'";
    $result = $mysqli->query($getProduct)->fetch_assoc();
    $newViews = $result['productViews'] + 1;
    $updateViews = "update product set productViews = '$newViews' where productId = '$productId'";
    $mysqli->query($updateViews);
    return $result;
}
function popularProduct(){
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getName = "select productId,productViews,productArtist,productName,productPrice,productIntroduction from product order by productViews desc limit 0,3";
     return  $mysqli->query($getName);
}
function latestProduct(){
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getName = "select productId,productArtist,productName,productReleaseDate,productPrice,productIntroduction from product order by productReleaseDateNumber desc limit 0,3";
    return  $mysqli->query($getName);
}
function testModifier(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $productId = $_GET['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getName = "select productUploaderName from product where productId = '$productId'";
    $result = $mysqli->query($getName)->fetch_assoc();
    $name = $result['productUploaderName'];
    if($name==$_SESSION['currentUserName']){
        $mysqli->close();
        return true;
    }
    else{
        $mysqli->close();
        return false;
    }
}
function getProductInfromToUpadte(){
    $productId = $_GET['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getProduct = "select productName,productArtist,productUploaderName,productUploaderId,productPrice,productType,productViews,productReleaseDate,productState,productCreatedYear,productWidth,productLength,productCreatedTimes,productSubject,productIntroduction from product where productId = '$productId'";
    $result = $mysqli->query($getProduct)->fetch_assoc();
    print_r(json_encode($result,JSON_UNESCAPED_UNICODE));
}
function getProductImgToUpadte(){
    $productId = $_GET['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $getProduct = "select productImg from product where productId = '$productId'";
    $result = $mysqli->query($getProduct)->fetch_assoc();
    print_r(json_encode($result,JSON_UNESCAPED_UNICODE));
}
function delete(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $productId = $_GET['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $selectBeforeDelete = "select productState from product where productId = '$productId'";
    $state = $mysqli->query($selectBeforeDelete)->fetch_assoc()['productState'];
    if($state==1){
        echo"<script>alert('您不能删除已经售出的艺术品哦！');history.back();</script>";
        $mysqli->close();
        exit;
    }
    $getProduct = "delete from product where productId = '$productId' and productState != 1 ";
    $result = $mysqli->query($getProduct);
    if($result){
        echo"<script>alert('删除成功！');history.back();</script>";
    }
    else{
        echo"<script>alert('删除失败！请再尝试');history.back();</script>";
    }
}
function addToShoppingCart(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo "UNLOGED";
        exit;
    }
    $userName = $_SESSION['currentUserName'];
    $productId = $_POST['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back();</script>";
        exit;
    }
    $testForConflict = "select * from shoppingcart where userName='$userName' and productId='$productId'";
    if(mysqli_num_rows($mysqli->query($testForConflict))){
        echo 'EXISTED';
        $mysqli->close();
        exit;
    };
    $getProductInform = "select productName,productArtist,productPrice,productIntroduction,productUploaderName,productState from product where productId = '$productId'";
    $ProductInform=$mysqli->query($getProductInform)->fetch_assoc();
    if($ProductInform['productState']==1){
        echo 'SOLD';
        $mysqli->close();
        exit;
    }
    if($ProductInform['productUploaderName']==$userName){
        echo 'CONFLICT';
        $mysqli->close();
        exit;
    }
    $productUploaderName = $ProductInform['productUploaderName'];
    $productName = $ProductInform['productName'];
    $productArtist = $ProductInform['productArtist'];
    $productPrice = $ProductInform['productPrice'];
    $productIntroduction = $ProductInform['productIntroduction'];
    $addToShoppingCart = "insert into shoppingcart (userName,productId,productName,productArtist,productPrice,productIntroduction,ifModified,productUploaderName,ifSold) values ('$userName','$productId','$productName','$productArtist','$productPrice','$productIntroduction',0,'$productUploaderName',0)";
    $result=$mysqli->query($addToShoppingCart);
    if ($result){
        echo"SUCCESS";
    }
    else{
        echo "FAILED";
    }
    $result->free();
    $mysqli->close();
}
function buy(){
    session_start();
    date_default_timezone_set('PRC');
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $productBuyerName=$_SESSION['currentUserName'];
    $currentTime = date("Y-m-d H:i:s");
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"ERROR";
        exit;
    }
    $getCartInformIds = "select productId from shoppingcart where userName = '$productBuyerName'";
    $productIds = $mysqli->query($getCartInformIds);
    $totalPrice = 0;
    while($productIdArray = mysqli_fetch_assoc($productIds)){
        $productId = $productIdArray['productId'];
        //获取艺术品信息
        $getProductInfromation = "select productUploaderName,productPrice,productName,productState from product where productId = '$productId'";
        $result1 = $mysqli->query($getProductInfromation);
        if(!$result1){
            echo"FAILED";
            exit;
        }
        $productInform = $result1->fetch_assoc();
        if($productInform['productState']==1){//如果当前商品已售出，则跳过
            continue;
        }
        else{
            //设置艺术品信息售出
            $setProductState = "update product set productState = 1 where productId = '$productId'";
            $result2 = $mysqli->query($setProductState);
            if(!$result2){
                echo"FAILED";
                $mysqli->close();
                exit;
            }
            //创建订单
            $productUploaderName = $productInform['productUploaderName'];
            $productPrice = $productInform['productPrice'];
            $productName = $productInform['productName'];
            $totalPrice =$totalPrice + $productPrice;
            $createOrder = "insert into productdeal (productId,productUploaderName,productBroughtTime,productBuyerName,productPrice,productName) values ('$productId','$productUploaderName','$currentTime','$productBuyerName','$productPrice','$productName')";
            $result3 = $mysqli->query($createOrder);
            if(!$result3){
                echo"FAILED";
                $mysqli->close();
                exit;
            }
            //增加卖家余额
            $addAccount = "update user set userAccount = userAccount + '$productPrice' where userName = '$productUploaderName'";
            $result6 = $mysqli->query($addAccount);
            if(!$result6){
                echo"FAILED";
                $mysqli->close();
                exit;
            }
        }

    }
    //清空购物车
    $cleanCart = "delete from shoppingcart where userName = '$productBuyerName'";
    $result4 = $mysqli->query($cleanCart);
    if(!$result4){
        echo"FAILED";
        $mysqli->close();
        exit;
    }
    //扣款
    $subAccount = "update user set userAccount = userAccount - '$totalPrice' where userName = '$productBuyerName'";
    $result5 = $mysqli->query($subAccount);
    if(!$result5){
        echo"FAILED";
        $mysqli->close();
        exit;
    }
    echo "SUCCESS";
    $mysqli->close();
}