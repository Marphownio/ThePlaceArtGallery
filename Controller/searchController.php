<?php
function search(){
    require './Models/dividePageModel.php';
    $content = $_GET['content'];
    $searchBy = $_GET['searchBy'];
    $sortBy = $_GET['sortBy'];
    if($searchBy=='1'){
        $searchBy = "productName";
    }
    else {
        $searchBy = "productArtist";
    }
    if($sortBy=='1'){
        $sortBy = "CONVERT(productName USING gbk) ASC";
    }
    else if($sortBy=='2'){
        $sortBy = "productViews DESC";
    }
    else{
        $sortBy = "productPrice DESC";
    }
    //链接数据库
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        echo"<script>alert('数据库访问失败！请重新尝试！');history.back()</script>";
        exit;
    }
    $getResultNums = "select count(1) as total from product where ".$searchBy." like '%".$content."%' order by ".$sortBy;
    $number = $mysqli->query($getResultNums)->fetch_assoc()['total'];
    if($number==0){
        echo '<tr><td colspan="8" id="nullResult">对不起，没有搜索到匹配的结果呢:(<br>建议您换一个搜索方式或者是关键词再进行搜索</td></tr>';
        return false;
    }
    require_once './Models/dividePageModel.php';
    global $sqlFirst,$pageNav;
    $dataPerPage = 6;
    pageDivide($number,$dataPerPage);
    $getCurrentPageData = "select productId, productName, productArtist, productPrice, productIntroduction, productUploaderName, productState, productViews from product where ".$searchBy." like '%".$content."%' order by ".$sortBy." limit $sqlFirst,$dataPerPage";
    $dataThisPage = $mysqli->query($getCurrentPageData);
    while ($data = mysqli_fetch_assoc($dataThisPage)){
        echo '<tr class="trclass1">';
        echo '<td class="tdtwoimg" rowspan="2"><img src="?p=user&m=imgView&a='.$data['productId'].'"></td>';
        echo '<td class="tdtwoname">名称：<a title="点击进入艺术品详情页" href="/productDetails?productId='.$data['productId'].'">'.$data['productName'].'</a></td>';
        echo '<td class="tdthree" rowspan="2">'.$data['productIntroduction'].'</td>';
        echo '<td class="tdfour" rowspan="2">'.$data['productUploaderName'].'</td>';
        echo '<td class="tdfive" rowspan="2"><span class="unit">￥'.$data['productPrice'].'</span></td>';
        if($data['productState']==0){$state = "未售出";}
        else if($data['productState']==1){$state = "已售出";}
        echo '<td class="tdsix" rowspan="2">'.$state.'</td>';
        echo '<td class="tdone" rowspan="2">'.$data['productViews'].'</td>';
        echo '<td class="tdseven" rowspan="2"><button onclick="searchAddToShoppingCart('.$data['productId'].')" class="add">加入购物车</button></td>';
        echo '</tr>';
        echo '<tr class="trclass2">';
        echo '<td class="tdtwoartist">艺术家：'.$data['productArtist'].'</td>';
        echo '</tr><tr> <td colspan="8" id="lines"></td></tr>';
    }
    echo '<tr><td colspan="8" class="talast">'.$pageNav.'</td></tr>';
}