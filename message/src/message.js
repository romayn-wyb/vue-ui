const message = {
    config: {
        top: "24px",
        duration:2,
        getContainer: "",
        content: "message",
    },
    destroy(elem){
        setTimeout(function () {
            elem.className+=" move-up-leave move-up-leave-active ";
            setTimeout(()=>{
                 elem.remove();
            },1000)
           
        }, this.config.duration * 1000);

    },
    success(options) {
        options.type="success";
        return this.init(options);

    },
   
    error(options) {
        options.type="error";
        return this.init(options);
      
    },
    warning(options) {
        options.type="warning";
        return this.init(options);

    },
    info(options) {
        options.type="info";
        return this.init(options);

    },
    warn(options) {
        options.type="warn";
        return this.init(options);

    },
    loading(options) {
        options.type="loading";

       return this.init(options);

    },
    init(options){
        Object.assign(this.config, options);
        let elem= this._createMessage(this.config.type);
        if (this.config.duration > 0) {
            this.destroy(elem);
        }
        else{
            return  elem;
        }
    },
    _createMessage() {
        let wrapper=document.querySelector(".forest-message");
        if (wrapper === null) {
            wrapper = document.createElement("div");
            wrapper.className = "forest-message";
            document.body.appendChild(wrapper);
        }
        wrapper.setAttribute("message-id",new Date().getTime());

        wrapperBox = document.createElement("div");
        wrapperBox.className = "forest-message-notice";
        wrapper.appendChild(wrapperBox);
       
        var sb = [];
        sb[sb.length] = `<div class="forest-message-notice-content">`;
        sb[sb.length] = `<div class="forest-message-custom-content forest-message-${this.config.type}">`;
        this._createIcon(sb, this.config.type);
        sb[sb.length] = this.config.content;
        sb[sb.length] = `</div>`;
        sb[sb.length] = `</div>`;
        wrapperBox.innerHTML+=sb.join('');
        return  wrapperBox;
    },
    _createIcon(sb,type){
        if (type == "success") {
            sb[sb.length] = '<i class="anticon anticon-check-circle"></i>';
        }
        else if (type == "error") {
            sb[sb.length] = '<i class="anticon anticon-cross-circle"></i>';
        }
        else if (type == "warning") {
            sb[sb.length] = '<i class="anticon anticon-exclamation-circle"></i>';
        }
        else if (type == "info") {
            sb[sb.length] = '<i class="anticon anticon-info-circle"></i>';
        }
        else if (type == "warn") {
            sb[sb.length] = '<i class="anticon anticon-close-circle"></i>';
        }
        else if (type == "loading") {
            sb[sb.length] = '<i class="anticon anticon-spin anticon-loading"></i>';
        }
    }
}