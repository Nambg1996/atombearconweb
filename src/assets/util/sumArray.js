export function sumArray(arrInput) {
    /* 
    sumArray(["1","2","3"]) 
    sumArray([1,2,3])     
    */

    const ArrayNotNull = arrNotNull(arrInput);
  
    var arraySum = ArrayNotNull.map(Number);
    const sum = arraySum.reduce((partialSum, a) => partialSum + a, 0);
    return sum
  }
  
  function arrNotNull(arr) {
    const results = [];
  
    arr.forEach((element) => {
      if (element !== null) {
        results.push(element);
      }
    });
  
    return results
  }


  
  