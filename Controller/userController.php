<?php
function topup(){
    session_start();
    $newTopUp = $_POST['topUp'];
    $currentUserName = $_SESSION['currentUserName'];
    if(!isset($currentUserName)){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
        exit;
    }
    $getUser = "select * from user where userName = '$currentUserName'";
    $userInform=$mysqli->query($getUser)->fetch_assoc();
    $userAccount = $userInform['userAccount'];
    $userAccount = $newTopUp + $userAccount;
    $updateAccount = "update user set userAccount = '$userAccount' where userName = '$currentUserName' ";
    $result = $mysqli->query($updateAccount);
    if($result){
        echo"<script>alert('充值成功！');history.back();</script>";
    }
    else{
        echo"<script>alert('充值失败！请再次尝试！');history.back();</script>";
    }
    $result->free();
    $mysqli->close();
}

function myArtWorks(){
    session_start();
    $UserName = $_SESSION['currentUserName'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
        exit;
    }
    $getProduct = "select productId,productName,productReleaseDate from product where productUploaderName = '$UserName'";
      return $mysqli->query($getProduct);
}
function imgView(){
        $a = $_GET['a'];
        $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
        $getProduct = "select productImg from product where productId = '$a'";
        $product=$mysqli->query($getProduct)->fetch_assoc();
            header("Content-type: " . $row["imgtype"]);
            echo $product["productImg"];
}
function shoppingCartGet(){
    session_start();
    $userName = $_SESSION['currentUserName'];
    if(!isset($userName)){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    $getUser = "select userAccount,userPhoneNumber,userAddress from user where userName = '$userName'";
    $user=$mysqli->query($getUser)->fetch_assoc();
    $arr[0] = $user['userAccount'];
    $arr[1] = $user['userPhoneNumber'];
    $arr[2] = $user['userAddress'];
    $mysqli->close();
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
}
function updateHistory($currentProductId){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        return false;
    }
    $userName = $_SESSION['currentUserName'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $getMyOldHistory = "select userHistory1,userHistory2,userHistory3,userHistory4,userHistory5 from user where userName = '$userName'";
    $historyArray = $mysqli->query($getMyOldHistory)->fetch_assoc();
    $newHistory = array();
    $newHistory[0] = $currentProductId;
    $j = 1;
    for($i=0;$i<sizeof($historyArray);$i++){
        $index = 'userHistory'.($i+1);
        if($currentProductId!=$historyArray[$index]){
            $newHistory[$j]=$historyArray[$index];
            $j++;
        }
    }
    $updateUserHistory = "update user set userHistory1 = '$newHistory[0]',userHistory2 = '$newHistory[1]',userHistory3 = '$newHistory[2]',userHistory4 = '$newHistory[3]',userHistory5 = '$newHistory[4]' where userName = '$userName'";
    $mysqli->query($updateUserHistory);
    $mysqli->close();
}
function getMyHistory(){
    session_start();
    $userName = $_SESSION['currentUserName'];
    if(!isset($userName)){
        echo"<script>alert('请先登录！');window.location.href='/login';</script>";
        exit;
    }
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $getMyOldHistory = "select userHistory1,userHistory2,userHistory3,userHistory4,userHistory5 from user where userName = '$userName'";
    $historyArray = $mysqli->query($getMyOldHistory)->fetch_assoc();
    for($i=0;$i<5;$i++){
        $index = 'userHistory'.($i+1);
        if($historyArray[$index]!=0){
            $getProductName = "select productName from product where productId = '$historyArray[$index]'";
            $name = $mysqli->query($getProductName)->fetch_assoc()['productName'];
            echo '<li><a href="/productDetails?productId='.$historyArray[$index].'">'.$name.'</a></li>';
        }
        else{
            echo '<li>暂时没有记录</a></li>';
        }
    }
    $mysqli->close();
}