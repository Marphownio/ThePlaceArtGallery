<?php
class UserModel{
    function getUserInformation(){
        session_start();
        $currentUserName = $_SESSION['currentUserName'];
        $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
        if(!$mysqli){
            echo "<script>alert('数据库访问失败！');history.back()</script>";
            exit;
        }
        $getUser = "select * from user where userName='$currentUserName'";
        $userInform = $mysqli->query($getUser);
        return $userInform->fetch_assoc();
    }
    function outOfTimeTest(){
        session_start();
        $currentTime = time();
        if(isset($_SESSION['loginTime']) && ($currentTime-3600)>=$_SESSION['loginTime']){
           return true;
        }
        else return false;
    }
}