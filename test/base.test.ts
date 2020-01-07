import {isDom} from '../src/utils'


describe('idOrClass',()=>{
 
   const reg:RegExp=/^[.#]{1}[0-9a-zA-Z_]+$/

   it('true',()=>{

      expect(reg.test('gjgj')).toBe(false)
      expect(reg.test('#_ddd')).toBe(true)
      expect(reg.test('.#dff')).toBe(false)

   })


})


describe('isDom',()=>{

   it('true',()=>{

      expect(isDom('gjgj')).toBe(false)
      expect(isDom('#_ddd')).toBe(false)
      expect(isDom('.#dff')).toBe(false)

   })

})