export const removeSlashUrl = (url)=>{

  const urlArr = url.split('');

  if (urlArr[urlArr.length-1]==='/'){

      return url.substr(0,urlArr.length-1);

  }else{

      return url;

  }

};

export const downLoadFile = (url)=>{

    const oldIframe = document.getElementById("down_load_iframe");

    if (oldIframe){

        document.body.removeChild(oldIframe);

    }

    const iframe = document.createElement("iframe");

    iframe.setAttribute("id","down_load_iframe");

    iframe.src = url;

    iframe.style.display = 'none';

    document.body.appendChild(iframe);

};


export const schoolCodeReg = (str) =>{

    return /^([a-zA-Z0-9]{1,24})$/.test(str.trim());

};

export const schoolNameReg = (str) =>{

    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(str.trim());

};

//学科名称正则
export const subNameReg = (str)=>{

    const Reg = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;

    return Reg.test(str);

};


//学科编号正则

export const subNumReg = (str) =>{

    const Reg = /^[A-Za-z0-9]+$/;

    return Reg.test(str);

};


