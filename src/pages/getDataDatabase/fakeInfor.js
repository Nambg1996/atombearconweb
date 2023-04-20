/* export const fakeInfor={
    "RRO": [
        [
            "nam",
            "cd:09:fe:8f:7f:1a",
            -90
        ],
        [
            "bsan1",
            "cd:09:fe:8f:7f:1a1",
            -90
        ],
         [
            "bsan2",
            "cd:09:fe:8f:7f:1a2",
            -90
        ],
        [
            "bsan3",
            "cd:09:fe:8f:7f:1a3",
            -90
        ],
        [
            "bsan4",
            "cd:09:fe:8f:7f:1a4",
            -90
        ] ,
        [
            "bsan5",
            "cd:09:fe:8f:7f:1a5",
            -90
        ],
        [
            "bsan6",
            "cd:09:fe:8f:7f:1a6",
            -90
        ],
        [
            "bsan7",
            "cd:09:fe:8f:7f:1a7",
            -200
        ] , 
        [
            "bsan6",
            "cd:09:fe:8f:7f:1a6",
            -90
        ],
        [
            "bsan7",
            "cd:09:fe:8f:7f:1a7",
            -200
        ] , 
        [
            "bsan6",
            "cd:09:fe:8f:7f:1a6",
            -90
        ],
        [
            "bsan7",
            "cd:09:fe:8f:7f:1a7",
            -200
        ] , 
        [
            "bsan6",
            "cd:09:fe:8f:7f:1a6",
            -90
        ],
        [
            "bsan7",
            "cd:09:fe:8f:7f:1a7",
            -200
        ] , 
        [
            "bsan6",
            "cd:09:fe:8f:7f:1a6",
            -90
        ],
        [
            "bsan7",
            "cd:09:fe:8f:7f:1a7",
            -200
        ] , 
        [
            "bsan8",
            "cd:09:fe:8f:7f:1a8",
            -90
        ],
        [
            "bsan9",
            "cd:09:fe:8f:7f:1a9",
            -90
        ],
        [
            "bsan10",
            "cd:09:fe:8f:7f:1a10",
            -90
        ],
        [
            "bsan11",
            "cd:09:fe:8f:7f:1a11",
            -90
        ] ,
        [
            "bsan12",
            "cd:09:fe:8f:7f:1a12",
            -90
        ] ,
      
     

    ],


     "TC": [
        [
            "tcsan1",
            "cd:09:fe:8f:7f:1atc1",
            -150
        ],
        [
            "tcsan2",
            "cd:09:fe:8f:7f:1atc2",
            -95
        ]
    ],
    "TPM": [
        [
            "bsan",
            "cd:09:fe:8f:7f:1a",
            -26.75
        ] ,
        [
            "bsan",
            "cd:09:fe:8f:7f:1a",
            -26.75
        ] ,
        [
            "bsan",
            "cd:09:fe:8f:7f:1a",
            -26.75
        ] ,
        [
            "bsan",
            "cd:09:fe:8f:7f:1a",
            -26.75
        ] , [
            "bsan",
            "cd:09:fe:8f:7f:1a",
            -26.75
        ] 
    
    ],
    "KKA": [
        [
            "bsan",
            "cd:09:fe:8f:7f:1a",
            -26.75
        ] 
    ]    
} */


export function getObjectsInRange(obj) {
    const result = {};
  for (const key in obj) {
    const arr = obj[key].filter(item => item[2] >= -85 && item[2] <= -10);
    if (arr.length > 0) result[key] = arr;
  }
  return result;
  }




export   function splitArrayByNumber(arr, n) {
    const result = {};
    const columnTotal = Math.ceil(arr.length / n);
  
    for (let i = 0; i < columnTotal; i++) {
      const start = i * n;
      const end = start + n;
  
      result[`column${i + 1}`] = arr.slice(start, end);
    }
  
    result['columnTotal'] = columnTotal;
  
    return result;
  }  






  export function checkAllKeys() {
    const elements = document.querySelectorAll('*');
    const keys = new Set();
    let hasDuplicateKeys = false;
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const key = element.getAttribute('key');
  
      if (key) {
        if (keys.has(key)) {
          console.error(`Duplicate "key" prop found: ${key}`);
          console.error('Element that raised the error:');
          console.error(element);
          hasDuplicateKeys = true;
        } else {
          keys.add(key);
        }
      } else {
        console.error('Missing "key" prop on element:');
        console.error(element);
      }
    }
  
    if (!hasDuplicateKeys) {
      console.log('All elements have unique "key" props.');
    }
  }
 
  