function WhetherIdandPWequals(){//密码与用户名是否相同
    let IdObj=document.getElementById("IDinput");
    let ID=IdObj.value;
    let PWObj1=document.getElementById("Passwordinput1");
    let PW1=PWObj1.value;
    if(ID!=""&&PW1!=""&&ID==PW1){
        let PWwarninformationObj=document.getElementById('PWwarning');
        PWwarninformationObj.innerHTML="*用户名与密码不能相同";
        return false;
    }
    else return true;
}

function IDtest(){//检测id
    let IdObj=document.getElementById("IDinput");
    let IDwarninformationObj=document.getElementById('IdWhetherNull');
    let ID=IdObj.value;
    let patt1=/^[\w-_]{1,15}$/;//Id的规则
    if(ID==""){
        IDwarninformationObj.innerHTML="*请输入用户名";
        return false;
    }
    else if(!patt1.test(ID)){
        IDwarninformationObj.innerHTML="*用户名只能包含大小写字母、数字、下划线'_'、中划线'-'";
        return false;
    }
    else{
        IDwarninformationObj.innerHTML="&nbsp;";
        return WhetherIdandPWequals();
    }
    
}

function PWtest(){//检测密码
    let PWObj1=document.getElementById("Passwordinput1");
    let PWObj2=document.getElementById("Passwordinput2");
    let PWwarninformationObj=document.getElementById('PWwarning');
    let rePWwarninformationObj=document.getElementById('rePWwarning');
    let PW1=PWObj1.value;
    let PW2=PWObj2.value;
    let patt2=/^[\w-_!@#$%&*]{6,}$/;//密码的规则
    let patt21=/^[0-9]+$/;//不可以全为数字
    let patt22=/^.{6,}$/;//位数大于6位
    if(PW1==""){
        PWwarninformationObj.innerHTML="*请输入不低于6位的密码，含字母、数字、字符{ - _ ! @ # $ % & * }，不可为纯数字";
        return false;
    }
    else{
        if(!patt22.test(PW1)){
            PWwarninformationObj.innerHTML="*密码长度需不低于6位";
            return false;
        }
        else {
            if(patt21.test(PW1)){
                PWwarninformationObj.innerHTML="*密码不能只包含数字";
                return false;
            }
            else {
                if(!patt2.test(PW1)){
                    PWwarninformationObj.innerHTML="*密码只能包含字母、数字、特殊字符集{ - _ ! @ # $ % & * }中的字符，且不低于6位";
                    return false;
                }
                else{
                    if(!WhetherIdandPWequals()){
                        return false;
                    }
                    else {
                        if(PW2==""){
                            PWwarninformationObj.innerHTML="&nbsp;";
                            rePWwarninformationObj.innerHTML="*请再次确认密码";
                            return false;
                        }
                        else if(PW1!=PW2) {
                            PWwarninformationObj.innerHTML="&nbsp;";
                            rePWwarninformationObj.innerHTML="*请两次输入的密码保持一致";
                            return false;
                        }
                        else {
                            PWwarninformationObj.innerHTML="&nbsp;";
                            rePWwarninformationObj.innerHTML="&nbsp;";
                            return WhetherIdandPWequals();
                        }
                    }
                }
            }
        }   
    }
    
}


function Emailtest(){//检测Email
    let EmailObj=document.getElementById("Emailinput");
    let EmailwarninformationObj=document.getElementById('Emailwarning');
    let Emailadress=EmailObj.value;
    let patt3=/^[\w\._-]+@(([\w_-]+)\.+)+\w+$/;//Email的规则

    if(Emailadress==""){
        EmailwarninformationObj.innerHTML="*请输入邮箱地址";
        return false;
    }
    else if(!patt3.test(Emailadress)){
        EmailwarninformationObj.innerHTML="*请输入正确的邮箱地址，如user@mail.server.name";
        return false;
    }
    else{
        EmailwarninformationObj.innerHTML="&nbsp;";
        return true;
    }
}

function Phonenumbertest(){//检测电话号码
    let PNObj=document.getElementById("PhoneNumber");
    let PNwarninformationObj=document.getElementById('PNwarning');
    let PhoneNumber=PNObj.value;
    let patt4=/^[0-9]{11}$/;//电话号码的规则
    if(PhoneNumber==""){
        PNwarninformationObj.innerHTML="*请输入电话号码";
        return false;
    }
    else if(!patt4.test(PhoneNumber)){
        PNwarninformationObj.innerHTML="*请输入11位纯数字电话号码,如12345678900";
        return false;
    }
    else{
        PNwarninformationObj.innerHTML="&nbsp;";
        return true;
    }
}

function Addresstest(){//检测地址
    let ADDObj=document.getElementById("Address");
    let ADDwarninformationObj=document.getElementById('ADDwarning');
    let Addr=ADDObj.value;
    if(Addr==""){
        ADDwarninformationObj.innerHTML="*请输入您的收货地址";
        return false;
    }
    else{
        ADDwarninformationObj.innerHTML="&nbsp;";
        return true;
    }
}

function WhtherCanSubmit(){
    if(IDtest()==true&&PWtest()==true&&Emailtest()==true&&Phonenumbertest()==true&&Addresstest()==true){
        return true;
    }
    else return false;
}
        

//检测密码强弱
function showTips(){
    let PWObj1=document.getElementById("Passwordinput1");
    PWObj1.onkeyup=function(){
        let tipDoms = document.getElementsByName('tip'); // 获取所有span
        let info = ["弱","中","强","极强"];
        let index= checkPW();
        for(let i=0;i<tipDoms.length;i++){
            tipDoms[i].className="NULL";// 清空css样式
            tipDoms[i].innerHTML="";    // 清空内容
        }
        if(index!=0){
            tipDoms[index-1].className="t"+index;
            tipDoms[index-1].innerHTML=info[index-1];
        }
    }
    
}

function checkPW(){
    let PWObj1=document.getElementById("Passwordinput1");
    let PW1=PWObj1.value;
    //密码强弱规则：
    //违法密码,全为数字
    let patt_illegal=/^[0-9]{1,}$/;

    //弱密码：位数低于10位，状态值为1
    let patt_weak=/^[\w-_!@#$%&*]{1,9}$/;

    //中等密码：位数不低于10位，低于15位，且只包含一种字符，状态值为2
    let patt_mid1=/^[a-zA-Z]{10,14}$/;
    let patt_mid2=/^[-_!@#$%&*]{10,14}$/;

    //强密码：位数不低于10位，低于15位，包含两种不同类型的字符;位数不低于15位,只包含一种字符状态值为3
    let patt_stro1=/^[0-9-_!@#$%&*]{10,14}$/;
    let patt_stro2=/^[0-9a-zA-Z]{10,14}$/;
    let patt_stro3=/^[a-zA-Z-_!@#$%&*]{10,14}$/;
    let patt_stro4=/^[a-zA-Z]{15,}$/;
    let patt_stro5=/^[-_!@#$%&*]{15,}$/;

    //极强密码：位数不低于10位，包含三种不同类型的字符；或高于15位，包含两种包含两种不同类型的字符，状态值为4
    let patt_exstro1=/^[\w-_!@#$%&*]{10,}$/;
    if(patt_illegal.test(PW1)){
        return 0;
    }
    else if(patt_weak.test(PW1)){
        return 1;
    }
    else if(patt_mid1.test(PW1)||patt_mid2.test(PW1)){
        return 2;
    }
    else if(patt_stro1.test(PW1)||patt_stro2.test(PW1)||patt_stro3.test(PW1)||patt_stro4.test(PW1)||patt_stro5.test(PW1)){
        return 3;
    }
    else if(patt_exstro1.test(PW1)){
        return 4;
    }
    else return 0;
}
