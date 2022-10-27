<?php
function getRegister(){
    require './Models/saltedHashModel.class.php';
    $userName = $_POST['userName'];
    $userPassword = $_POST['userPassword'];
    $userEmail = $_POST['userEmail'];
    $userPhoneNumber = $_POST['userPhoneNumber'];
    $userAddress = $_POST['userAddress'];
    $saltedHash = new saltedHashModel();
    $userSalt = $saltedHash->saltKey();
    $userAccount = 0;
    $userPassword = $saltedHash->encrypt($userPassword,$userSalt);
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
        exit;
    }
    else{
        $mysqli->query("SET NAMES utf8");
        //验证用户名是否被占用
        $sqlNameCheck="select * from user where userName = '$userName'";
        $nameCheckResult=$mysqli->query($sqlNameCheck);
        $nameNum=mysqli_num_rows($nameCheckResult);
        if($nameNum){
            echo"<script>alert('用户名已被占用！请设置新用户名！');history.back()</script>";
            $nameCheckResult->close();
            exit;
        }
        //验证邮箱是否被占用
        $sqlEmailCheck="select * from user where userEmail = '$userEmail'";
        $emailCheckResult=$mysqli->query($sqlEmailCheck);
        $emailNum=mysqli_num_rows($emailCheckResult);
        if($emailNum){
            echo"<script>alert('邮箱地址已被占用！请设置新邮箱！');history.back()</script>";
            $emailCheckResult->close();
            exit;
        }
        //插入新用户
        $sqlInsert = "insert into user (userName,userPassword,userEmail,userPhoneNumber,userAddress,userSalt,userAccount,userHistory1,userHistory2,userHistory3,userHistory4,userHistory5) values ('$userName','$userPassword','$userEmail','$userPhoneNumber','$userAddress','$userSalt','$userAccount',0,0,0,0,0)";
        $result=$mysqli->query($sqlInsert);
        if ($result){
            echo"<script>alert('注册成功！请登录！');window.location.href='/login';</script>";
        }
        else{
            echo"<script>alert('注册失败！请再次尝试！');history.back();</script>";
        }
        $result->free();
    }
    $mysqli->close();
}