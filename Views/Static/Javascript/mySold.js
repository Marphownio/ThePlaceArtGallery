window.onload=function (){
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            document.getElementById('soldResult').innerHTML=requestForResult.responseText;
        }
    }
    requestForResult.open('get',"?p=mySold&m=getMySoldInform");
    requestForResult.send(null);
}