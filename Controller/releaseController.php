<?php
function publish(){
    date_default_timezone_set('PRC');
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    //11输入，5读取，1自动设置
    $productUploaderName = $_SESSION['currentUserName'];
    $productUploaderId = $_SESSION['currentUserId'];
    $productName = $_POST['productName'];
    $productImg = addslashes(fread(fopen($_FILES['productImg']['tmp_name'], "r"), filesize($_FILES['productImg']['tmp_name'])));
    $productArtist = $_POST['productArtist'];
    $productPrice = $_POST['productPrice'];
    $productType = $_POST['productType'];
    $productViews = 0;
    $productReleaseDateNumber = time();
    $productReleaseDate = date("Y-m-d");
    $productState = 0;//0代表未售出，1代表售出。
    $productCreatedYear = $_POST['productCreatedYear'];
    $productWidth = $_POST['productWidth'];
    $productLength = $_POST['productLength'];
    $productCreatedTimes = $_POST['productCreatedTimes'];
    $productSubject = $_POST['productSubject'];
    $productIntroduction = $_POST['productIntroduction'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
        exit;
    }
    $mysqli->query("SET NAMES utf8");
    $sqlInsertNewProduct = "insert into product (productName,productImg,productArtist,productUploaderName,productUploaderId,productPrice,productType,productViews,productReleaseDate,productReleaseDateNumber,productState,productCreatedYear,productWidth,productLength,productCreatedTimes,productSubject,productIntroduction) values ('$productName','$productImg','$productArtist','$productUploaderName','$productUploaderId','$productPrice','$productType','$productViews','$productReleaseDate','$productReleaseDateNumber','$productState','$productCreatedYear','$productWidth','$productLength','$productCreatedTimes','$productSubject','$productIntroduction')";
    $result=$mysqli->query($sqlInsertNewProduct);
    $getNewId = "SELECT LAST_INSERT_ID()";
    $newId=$mysqli->query($getNewId)->fetch_assoc();
    $newId = $newId['LAST_INSERT_ID()'];
    if ($result){
        echo "<script>alert('发布成功！');</script>";
        echo "<script>window.location ='\productDetails?productId=";
        echo $newId;
        echo "';</script>";
    }
    else{
        echo"<script>alert('发布失败！请再次尝试！');history.back();</script>";
    }
    $result->free();
    $mysqli->close();
}
function update(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    if($_FILES['productImg']['tmp_name']){
        $flag = 1; //有文件上传
        $productImg = addslashes(fread(fopen($_FILES['productImg']['tmp_name'], "r"), filesize($_FILES['productImg']['tmp_name'])));
    }
    else{
        $flag = 0; //没有文件上传
    }
    $productId = $_GET['productId'];
    $productName = $_POST['productName'];
    $productArtist = $_POST['productArtist'];
    $productPrice = $_POST['productPrice'];
    $productType = $_POST['productType'];
    $productCreatedYear = $_POST['productCreatedYear'];
    $productWidth = $_POST['productWidth'];
    $productLength = $_POST['productLength'];
    $productCreatedTimes = $_POST['productCreatedTimes'];
    $productSubject = $_POST['productSubject'];
    $productIntroduction = $_POST['productIntroduction'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
        exit;
    }
    $updateinformExcepdtImg = "update product set productName='$productName', productArtist='$productArtist',productPrice = '$productPrice',productType = '$productType',productCreatedYear='$productCreatedYear',productWidth='$productWidth',productLength='$productLength',productCreatedTimes='$productCreatedTimes',productSubject='$productSubject',productIntroduction='$productIntroduction' where productId ='$productId'";
     $result1 = $mysqli->query($updateinformExcepdtImg);
     if($flag==0&&$result1){
         echo"<script>alert('修改成功！');</script>";
         echo "<script>window.location ='\productDetails?productId=";
         echo $productId;
         echo "';</script>";
     }
     else if($flag==1){
         $updateImg = "update product set productImg = '$productImg' where productId ='$productId'";
         $result2 = $mysqli->query($updateImg);
         if($result2){
             echo"<script>alert('修改成功！');</script>";
             echo "<script>window.location ='\productDetails?productId=";
             echo $productId;
             echo "';</script>";
         }
         else{
             echo"<script>alert('图片修改失败！请重新上传！');history.back();</script>";
         }
     }
     else{
         echo"<script>alert('信息修改失败！请重试！');history.back();</script>";
     }
}

