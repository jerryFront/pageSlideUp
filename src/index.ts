/**
 * 解决移动端 整屏滑动的方案
 */

 import {isDom} from './utils'

 export const enum SlideType {
   vertical=1,
   horizon,
 }

 interface Option<T>{
    index?:number  //初始化传入的页数
    slideUpCallback?:(num:number)=>void //表明当前滑动的页数  
    distance?:number //滑动距离判定，可以默认值
    type?:string  //设置滚动方式 ，水平或垂直
 }


 class Slide<T>{

    private el:HTMLElement;
    private elLength:number=0; //dom children的page长度
    private index:number=0;
    private slideUpCallback:any;

    private startY:number=0;
    private moveY:number=0;
    private distance:number=50;
    private clientHeight:number=0;
    private type:string='vertical';  //默认垂直
 
    private forbidFn:((e:Event)=>void)|undefined =undefined;
   

   
    constructor(el:string|HTMLElement,option:Option<T>){

      if(!isDom(el)) {
          console.error('请绑定合法的dom元素,支持id #，class .')
          return
      } 
      const _el:HTMLElement|null=(typeof el==='string')?document.querySelector<HTMLElement>(el):el  
      if(!_el){
        console.error('请绑定合法的dom元素,支持id #，class .')
        return
      }

      this.el=<HTMLElement>_el?.children[0]

      this.elLength=this.el?.children?.length

      this.index=option.index||0
      this.slideUpCallback=option.slideUpCallback
      if(option.distance) this.distance=option.distance

      

    }

    init():void{

      const getClientHeight=()=>{
          this.clientHeight=document.body.clientHeight 
      }

      getClientHeight()

      this.forbidFn=(event:Event)=>{
         const _event=event?event:window.event
         if(_event?.preventDefault){
            _event.preventDefault()
         }else{
            if(_event?.returnValue) _event.returnValue=false
         }
      }

      this.el.setAttribute('style',"height:100%;width:100%;transition:.3s linear;transform:translateY(" + (-this.index * 100) + "%)")

      document.body.addEventListener('touchmove',this.forbidFn,{passive:false})

      window.addEventListener('resize',getClientHeight,{passive:false})

      this.el?.addEventListener('touchstart',this.touchStart,{passive:false})

      this.el?.addEventListener('touchmove',this.touchMove,{passive:false})

      this.el?.addEventListener('touchend',this.touchEnd,{passive:false})


    }

    reset():void{

      this.index=0
      
      if(this.forbidFn) document.body.removeEventListener('touchmove',this.forbidFn)

      this.el?.removeEventListener('touchstart',this.touchStart)

      this.el?.removeEventListener('touchmove',this.touchMove)

      this.el?.removeEventListener('touchend',this.touchEnd)

    }

    /**可以改成Proxy */
    notify(obj:any,key:string,callback?:(val:any)=>void):void{
       
       const property=Object.getOwnPropertyDescriptor(obj,key),
       getter=property&&property.get,
       setter=property&&property.set

       let val:any=obj[key]
       
       Object.defineProperty(obj,key,{
          enumerable:true,
          configurable:true,
          set(newVal){
            const old=getter?getter.call(obj):val
            if(newVal===old) return 
            callback&&callback(newVal)
            if(setter) setter.call(obj,newVal)
            else val=newVal
          },
          get(){
             return getter?getter.call(obj):val
          },
       })


    }

    touchStart(e:any):void{
       if(!e.touches.length) return
       this.startY=e.touches[0].pageY
       this.moveY=0

    }

    touchMove(e:any):void{
     if(!e.touches.length) return
     this.moveY=e.touches[0].pageY-this.startY

    }

    touchEnd(e:any):void{
      if(!e.changedTouches.length) return
      this.moveY=e.changedTouches[0].pageY-this.startY
      if(this.moveY+this.distance<0) this.prev()
      else if(this.moveY-this.distance>0) this.next()
    }

    /**含固定滑动到第几页的方法
     * 如果传入参数则以参数为准
     */
    transform(index?:number):void{
      if(index) this.index=index
      this.slideUpCallback&&this.slideUpCallback(this.index)
      this.el.style.transform='translateY(' + (-(index||this.index) * (100)) + '%)'
    }

    next():void{
       if(this.index>=this.elLength-1) return
       this.index++
       this.transform()
    }

    prev():void{
       if(this.index<=0) return
       this.index--
       this.transform()
    }



 } 


