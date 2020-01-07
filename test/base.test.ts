import {isDom} from '../src/utils'
import {SlideType} from '../src/index'


describe('isSlideType',()=>{

   it('true',()=>{
      const a:string='horizon'
      expect(SlideType['horizon']).toBe(true)
      // expect(SlideType[a]).toBe(true)
   })

})