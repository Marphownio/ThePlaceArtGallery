<?php
function mainPage(){
    require './Views/Templates/Mainpage.html';
}
function login(){
    require './Views/Templates/Login.html';
}
function register(){
    require './Views/Templates/Register.html';
}
function searchForm(){
    require './Views/Templates/searchform.html';
}
function publish(){
    require './Views/Templates/publish.html';
}
function profile(){
    require './Views/Templates/Profile.html';
}
function productdetails(){
    require './Views/Templates/Productdetails.html';
}
function productSearch(){
    require './Views/Templates/searchpage.html';
}
function myShppingCart(){
    require './Views/Templates/ShoppingCart.html';
}
//function displayUserProfile(){
//    require './Models/UserModel.class.php';
//    $user = new UserModel();
//    return $user->getUserInformation();
//}