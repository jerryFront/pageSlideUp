export function isDom(el:string|HTMLElement|null):boolean{

    const reg:RegExp=/^[.#]{1}[0-9a-zA-Z_]+$/
   
    if(typeof el==='string'){
        if(!reg.test(el)) return false
        el=document.querySelector<HTMLElement>(el)
    }
    if(el&&el.nodeType&&el.nodeType===1&&el.children) return true   
 
    return false

 }