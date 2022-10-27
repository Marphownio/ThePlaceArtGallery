<?php
function getCommentsByProductId(){
    session_start();
    $flag=0;
    if(isset($_SESSION['currentUserName'])){
        $flag=1;
        $userName = $_SESSION['currentUserName'];
    }
    $productId = $_POST['productId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $getProduct = "select * from comment where productId = '$productId' order by commentLikes desc";
    $result = $mysqli->query($getProduct);
    if(mysqli_num_rows($result)==0){
        echo '<tr><td colspan="4" id="snullResult">目前评论区还是空空的呢:(<br>快来抢个沙发吧！</td></tr>';
        exit();
    }
    while($data = mysqli_fetch_assoc($result)){
        echo '<tr><td id="greatest" colspan="4"></td></tr>';
        echo '<tr><td class="imgcell"></td>';
        echo '<td class="idcell">用户:'.$data['commentUploaderName'].'</td>';
        echo '<td rowspan="2" class="commentcell">'.$data['commentContent'].'</td>';
        echo '<td class="likenumbercell">获赞:'.$data['commentLikes'].'次</td></tr>';
        echo '<tr>';
        $commentId = $data['commentId'];
        echo '<td colspan="2" class="datecell">发布日期:'.$data['commentTime'].'</td>';
        if($flag){
            if($data['commentUploaderName']==$userName){
                echo '<td class="likcell"><input id="deleteComment" type="submit" onclick="toDeleteComment('.$data['commentId'].')" value="删除评论"></td>';
            }
            else{
                $ifLiked = "select * from likes where likedUserName = '$userName' and commentId = '$commentId'";
                $ifLikedResult = $mysqli->query($ifLiked);
                if(mysqli_num_rows($ifLikedResult)){
                    echo '<td class="likcell"><input id="dislike" type="submit" onclick="toCancleLike('.$data['commentId'].')" value="取消点赞"/></td>';
                }
                else{
                    echo '<td class="likcell"><input id="like" type="submit" onclick="toLike('.$data['commentId'].')" value="点赞"/></td>';
                }
            }
        }
        else{
            echo '<td class="likcell"><input id="like" type="submit" value="点赞" disabled/></td>';
        }
        echo '</tr><tr><td id="least" colspan="4"></td></tr>';
    }
    $mysqli->close();
}
function uploadComment(){
    date_default_timezone_set('PRC');
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        return false;
    }
    $TimeInSec = time();
    $productId = $_POST['productId'];
    $userName = $_SESSION['currentUserName'];
    $commentContent=$_POST['commentContent'];
    $commentTime = date("Y-m-d H:i");
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $insertComment = "insert into comment (commentContent, commentLikes, commentUploaderName, commentTime, productId ,TimeInSec) values ('$commentContent',0,'$userName','$commentTime','$productId','$TimeInSec')";
    $result = $mysqli->query($insertComment);
    if($result){
        echo "SUCCESS";
    }
    else{
        echo "FAILED";
    }
    $mysqli->close();
}
function toLike(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo "UNLOGGED";
        exit();
    }
    $userName = $_SESSION['currentUserName'];
    $commentId = $_POST['commentId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $insertLike = "insert into likes (commentId, likedUserName) values ('$commentId','$userName')";
    $result0 = $mysqli->query($insertLike);
    if(!$result0){
        echo "FAILED";
        exit();
    }
    $updateCommentLike = "update comment set commentLikes = commentLikes+1 where commentId = '$commentId'";
    $result = $mysqli->query($updateCommentLike);
    if($result){
        echo "SUCCESS";
    }
    else echo "FAILED";
    $mysqli->close();
}
function toDeleteComment(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo "UNLOGGED";
        exit();
    }
    $userName = $_SESSION['currentUserName'];
    $commentId = $_POST['commentId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $deleteComment = "delete from comment where commentId='$commentId' and commentUploaderName='$userName'";
    $result0 = $mysqli->query($deleteComment);
    if(!$result0){
        echo "FAILED";
        exit();
    }
    $deleteAssociatedLikes = "delete from likes where commentId='$commentId'";
    $result = $mysqli->query($deleteAssociatedLikes);
    if($result){
        echo "SUCCESS";
    }
    else echo "FAILED";
    $mysqli->close();
}
function toDislike(){
    session_start();
    if(!isset($_SESSION['currentUserName'])){
        echo "UNLOGGED";
        exit();
    }
    $userName = $_SESSION['currentUserName'];
    $commentId = $_POST['commentId'];
    $mysqli = mysqli_connect("localhost","root","12345678","marphownio");
    if(!$mysqli){
        exit;
    }
    $deleteLike = "delete from likes where commentId = '$commentId' and likedUserName = '$userName'";
    $result0 = $mysqli->query($deleteLike);
    if(!$result0){
        echo "FAILED";
        exit();
    }
    $updateCommentLike = "update comment set commentLikes = commentLikes - 1 where commentId = '$commentId'";
    $result = $mysqli->query($updateCommentLike);
    if($result){
        echo "SUCCESS";
    }
    else echo "FAILED";
    $mysqli->close();
}