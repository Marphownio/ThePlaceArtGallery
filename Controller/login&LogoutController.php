<?php
function getLogin(){
        session_start();
        require './Models/saltedHashModel.class.php';
        $nameOrEmail = $_POST['nameOrEmail'];
        $userPassword = $_POST['userPassword'];
        $loginMethods = $_POST['loginMethods'];
        $saltedHash = new saltedHashModel();
        //链接数据库
        $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
        if(!$mysqli){
            echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
            exit;
        }
        if($loginMethods==1){
            $userName=$nameOrEmail;   //用户名登录
            $getUserInform = "select * from user where userName='$userName'";
            $userInform=$mysqli->query($getUserInform);
            if(!mysqli_num_rows($userInform)){
                echo"<script>alert('用户名不存在！请输入正确的用户名');history.back();</script>";
                $userInform->free();
                $mysqli->close();
                exit;
            }
            $row = $userInform->fetch_assoc();
            $userSaltByName = $row['userSalt'];
            $userPassword = $saltedHash->encrypt($userPassword,$userSaltByName);
        }
        else{
            $userEmail=$nameOrEmail;   //邮箱登录
            $getUserInform = "select * from user where userEmail='$userEmail'";
            $userInform=$mysqli->query($getUserInform);
            if(!mysqli_num_rows($userInform)){
                echo"<script>alert('邮箱地址不存在！请输入正确的邮箱');history.back();</script>";
                $userInform->free();
                $mysqli->close();
                exit;
            }
            $row = $userInform->fetch_assoc();
            $userSaltByEmail = $row['userSalt'];
            $userPassword = $saltedHash->encrypt($userPassword,$userSaltByEmail);
        }
        if($userPassword==$row['userPassword']){
            $_SESSION['loginTime'] = time();
            $_SESSION['currentUserName']=$row['userName'];
            $_SESSION['currentUserEmail']=$row['userEmail'];
            $_SESSION['currentUserId']=$row['userId'];
            echo"<script>alert('登录成功！');window.location.href='/';</script>";
        }
        else{
            echo"<script>alert('密码错误！请再次尝试！');history.back();</script>";
        }
        $userInform->free();
        $mysqli->close();
}
function logout(){
    session_start();
    session_destroy();
    echo "<script>alert('成功退出！');window.location.href='/';</script>";
}
