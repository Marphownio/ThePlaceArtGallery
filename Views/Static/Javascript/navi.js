function naviSearch(){
    let content = document.getElementById("search-txt").value;
    let url = "productSearch?sortBy=1&searchBy=1&content="+content;
    window.location.href=url;
}
function closeHistoryBox(){
    let historyBox = document.getElementById('historyBox');
    historyBox.style.transform="translateY(-400px)";
    historyBox.style.opacity="0";
}
function openHistoryBox(){
    let historyBox = document.getElementById('historyBox');
    let requestForResult = new XMLHttpRequest();
    requestForResult.onreadystatechange = function () {
        if (requestForResult.readyState == 4 && requestForResult.status == 200) {
            document.getElementById('lists').innerHTML=requestForResult.responseText;
        }
    }
    requestForResult.open('get',"?p=user&m=getMyHistory");
    requestForResult.send(null);
    historyBox.style.transform="translateY(180px)";
    historyBox.style.opacity="1";
}
