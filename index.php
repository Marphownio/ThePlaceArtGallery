<?php
session_start();
error_reporting(0);
$url = $_SERVER['REQUEST_URI'];
$p = $_GET['p'];
$m = $_GET['m'];
$a = $_GET['a'];
$urlAfter=parse_url($url);
$path=$urlAfter['path'];
$page = $_GET['page'];
require './Models/UserModel.class.php';
$user = new UserModel();
if(!$p&&!$m&&!$page){
    require './Controller/displayController.php';
    if($path=='/'){
        mainPage();
    }
    else if($path=='/login'){
        login();
    }
    else if($path=='/register'){
        register();
    }
    else if($path=='/searchform'){
        searchForm();
    }
    else if($path=='/productDetails'){
        productDetails();
    }
    else if($path=='/productSearch'){
        productSearch();
    }
    else if($user->outOfTimeTest()){
        session_destroy();
        echo "<script>alert('登陆超时！请重新登录！');</script>";
        echo "<script>window.location.href='/login';</script>";
    }
    else if($path=='/publish'){
        if(isset($_SESSION['currentUserName'])){
            publish();
        }
        else{
            echo "<script>alert('请先登录后再发布艺术品！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
    else if($path=='/myShoppingCart'){
        if(isset($_SESSION['currentUserName'])){
            myShppingCart();
        }
        else{
            echo "<script>alert('请先登录后再查看购物车！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
    else if($path=='/productModify'){
        if(isset($_SESSION['currentUserName'])){
            publish();
        }
        else{
            echo "<script>alert('请先登录！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
    else if($path=='/profile/myInfor'){
        if(isset($_SESSION['currentUserName'])){
            profile();
        }
        else{
            echo "<script>alert('请先登录！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
    else if($path=='/profile/myArts'){
        if(isset($_SESSION['currentUserName'])){
            profile();
        }
        else{
            echo "<script>alert('请先登录！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
    else if($path=='/profile/myPurchased'){
        if(isset($_SESSION['currentUserName'])){
            profile();
        }
        else{
            echo "<script>alert('请先登录！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
    else if($path=='/profile/mySold'){
        if(isset($_SESSION['currentUserName'])){
            profile();
        }
        else{
            echo "<script>alert('请先登录！');</script>";
            echo "<script>window.location.href='/login';</script>";
        }
    }
}
else{
    if($p=='login'||$p=='logout'){
        include './Controller/login&LogoutController.php';
        $m();
    }
    else if($p=='search'){
        include './Controller/searchController.php';
        search();
    }
    else if($p=='register'){
        include './Controller/registerController.php';
        $m();
    }
    else if($p=='release'){
        include './Controller/releaseController.php';
        $m();
    }
    else if($p=='user'){
        include './Controller/userController.php';
        $m();
    }
    else if($p=='product'){
        include './Controller/productController.php';
        $m();
    }
    else if($p=='myShoppingCart'){
        include './Controller/shoppingCartController.php';
        $m();
    }
    else if($p=='myPurchased'||$p=='mySold'){
        include './Controller/dealAndSoldController.php';
        $m();
    }
    else if($p=='comment'){
        include './Controller/commentsController.php';
        $m();
    }
}
