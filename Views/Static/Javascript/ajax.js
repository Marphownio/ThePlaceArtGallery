function Ajax(recvType){
    let ajax=new Object();
    ajax.recvType=recvType ? recvType.toUpperCase() : 'HTML' //HTML XML
    ajax.targetUrl='';
    ajax.sendString='';
    ajax.resultHandle=null;
    ajax.createXMLHttpRequest=function(){
        let request=false;
        //window对象中有XMLHttpRequest存在就是非IE，包括（IE7，IE8）
        if(window.XMLHttpRequest){
            request=new XMLHttpRequest();
            if(request.overrideMimeType){
                request.overrideMimeType("text/xml");
            }
            //window对象中有ActiveXObject属性存在就是IE
        }else if(window.ActiveXObject){
            let versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
            for(let i=0; i<versions.length; i++){
                try{
                    request=new ActiveXObject(versions[i]);
                    if(request){
                        return request;
                    }
                }catch(e){
                    request=false;
                }
            }
        }
        return request;
    }
    ajax.XMLHttpRequest=ajax.createXMLHttpRequest();
    ajax.processHandle=function(){
        if(ajax.XMLHttpRequest.readyState == 4){
            if(ajax.XMLHttpRequest.status == 200){
                if(ajax.recvType=="HTML")
                    ajax.resultHandle(ajax.XMLHttpRequest.responseText);
                else if(ajax.recvType=="XML")
                    ajax.resultHandle(ajax.XMLHttpRequest.responseXML);
            }
        }
    }
    ajax.get=function(targetUrl, resultHandle){
        ajax.targetUrl=targetUrl;
        if(resultHandle!=null){
            ajax.XMLHttpRequest.onreadystatechange=ajax.processHandle;
            ajax.resultHandle=resultHandle;
        }
        if(window.XMLHttpRequest){
            ajax.XMLHttpRequest.open("get", ajax.targetUrl);
            ajax.XMLHttpRequest.send(null);
        }else{
            ajax.XMLHttpRequest.open("get", ajax.targetUrl, true);
            ajax.XMLHttpRequest.send();
        }
    }
    ajax.post=function(targetUrl, sendString, resultHandle){
        ajax.targetUrl=targetUrl;
        if(typeof(sendString)=="object"){
            let str="";
            for(let pro in sendString){
                str+=pro+"="+sendString[pro]+"&";
            }
            ajax.sendString=str.substr(0, str.length-1);
        }else{
            ajax.sendString=sendString;
        }
        if(resultHandle!=null){
            ajax.XMLHttpRequest.onreadystatechange=ajax.processHandle;
            ajax.resultHandle=resultHandle;
        }
        ajax.XMLHttpRequest.open("post", targetUrl);
        ajax.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.XMLHttpRequest.send(ajax.sendString);
    }
    return ajax;
}

