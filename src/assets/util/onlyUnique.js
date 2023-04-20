export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  

  export const ArrayUnique = (arr) => {
   return arr.filter(onlyUnique);
  }



 /*  var arr = ['a', 1, 'a', 2, '1'];
  const arrTest=ArrayUnique(arr)
  console.log("arrTest", arrTest)
  */
  
