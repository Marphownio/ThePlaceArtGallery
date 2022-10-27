<?php
class saltedHashModel
{
    //获取随机盐值
    public function saltKey(){
        $str = md5(time());                         //为时间戳加密（得到随机字符串）
        return substr($str,8,16);  //从第8位起取16位长字符串返回
    }
    //哈希加密
    public function encrypt($originCode,$salt) {
        return hash("sha256",$originCode.$salt,false);
    }
}