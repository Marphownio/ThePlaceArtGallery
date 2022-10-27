function searchFormSearch(){
    let content = document.getElementById("searchInput").value;
    let url = "productSearch?sortBy=1&searchBy=1&content="+content;
    window.location.href=url;
}