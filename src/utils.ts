export function isDom(el:string|Element|null):boolean{

    const reg:RegExp=/\(.|#)\s(+)/ 
   
    if(typeof el==='string'){
        if(!reg.test(el)) return false
        el=document.querySelector(el)
    }
    if(el&&el.nodeType&&el.nodeType===1&&el.children) return true   
 
    return false

 }