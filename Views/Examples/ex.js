
        const wrapper = document.querySelector(".wrapper");
        const fileName = document.querySelector(".file-name");
        const cancelBtn = document.querySelector("#cancel-btn");
        const defaultBtn = document.querySelector("#default-btn");
        const customBtn = document.querySelector("#custom-btn");
        const img = document.querySelector("img");
        let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
        function defaultBtnActive(){
            
            defaultBtn.click();
        }
        defaultBtn.addEventListener("change", function(){
            const file = this.files[0];
            if(file){
                const reader = new FileReader();//FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
                reader.onload = function(){
                    const result = reader.result;
                    img.src = result;
                    wrapper.classList.add("active");
                }
                cancelBtn.addEventListener("click",function(){
                    img.src = "";
                    wrapper.classList.remove("active");
                });
                reader.readAsDataURL(file);
            }
            if(this.value){
                let valueStore = this.value.match(regExp);
                alert(this.value);
                fileName.textContent = valueStore;
            }
        });