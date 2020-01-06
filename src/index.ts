/**
 * 解决移动端 整屏滑动的方案
 */

 import {isDom} from './utils'

 interface Option<T>{
    
    index?:number  //初始化传入的页数
    slideUpCallback?:(num:number)=>void //表明当前滑动的页数  
    distance?:number //滑动距离判定，可以默认值

 }


 class Slide<T>{

    private el:Element|null;
    private index:number;
    private slideUpCallback:any;

    private startY:number;
    private moveY:number;
    private distance:number=50;
   

   
    constructor(el:string|Element,option:Option<T>){

      if(!isDom(el)) {
          console.error('请绑定合法的dom元素,支持id #，class .')
          return
      } 
      this.el=(typeof el==='string')?document.querySelector(el):el  
      if(!this.el){
        console.error('请绑定合法的dom元素,支持id #，class .')
        return
      }
      this.index=option.index||0
      this.slideUpCallback=option.slideUpCallback
      if(option.distance) this.distance=option.distance

    }

    init():void{

    }

    notify(obj:Object,key:string,callback?:(val:any)=>void):void{
       
       const property=Object.getOwnPropertyDescriptor(obj,key),
       getter=property&&property.get,
       setter=property&&property.set

       let val=obj[key]

    }

    touchStart():void{

    }

    touchMove():void{


    }

    touchEnd():void{

    }

    next():void{


    }

    prev():void{


    }






 } 


