import $ from "jquery";


export const getValueDom = (infor) => {

  /* 
  const inforSearch= getValueDom(["#startTime","#endTime"])
  console.log("~ inforSearch", inforSearch)
  */

const newIdOrClass=infor.map(idOrclass => {
  return idOrclass.replace(/[^a-zA-Z0-9 ]/g, '')
});

const inforDom={}
const combineArray=[newIdOrClass,infor]
const DataColumn = combineArray[0].map((_, colIndex) => combineArray.map(row => row[colIndex]));
console.log("DataColumn", DataColumn)


DataColumn.forEach(([keys,idOrclass]) => {
  inforDom[keys]=$(idOrclass).val()||$($(idOrclass)[0]).find(".css-qc6sy-singleValue").text()
});

return inforDom

}

export const setValueDom = (infor) => {
  /*  
  setValueDom({
        "#startTime": today,
        "#endTime": today
      })

*/
    const inforArr = Object.entries(infor);
    inforArr.forEach(([idOrClass,valueDom]) => {
      $(idOrClass).val(valueDom)
    });

    
}


export const onChageMultiple = (elementOnchage,ffc) => {
 
  /*
const elementOnchage=["#endTime","#startTime","#kotei"]
  onChageMultiple(elementOnchage,(obj)=>{
                  console.log(obj)
        
        });
 
  */

  const newInfor={}
  elementOnchage.forEach(currentElement => {
    
      $(currentElement).change(function(){
          elementOnchage.forEach(idOrClass =>  {
              const newIdOrClass = idOrClass.replace(/[^a-zA-Z0-9 ]/g, '');
              newInfor[newIdOrClass]=$(idOrClass).val()
          }
          );

                  ffc(newInfor)
        });

       

  });
 
}


export const getPropertyElement = (idOrClass) => {
 
  /*
   console.log("~ getPropertyElement", getPropertyElement("#kotei"))
  
   */
 
  const infor= {
      value:$(idOrClass).text()||$(idOrClass).val(),
      className:$(idOrClass).attr('class'),
      id:$(idOrClass).attr('id'),
  }

  return infor

}



export function removeAddListener(elementOnchage) {

/*   
cancle onchane click event
const elementOnchage=["#endTime","#startTime","#kotei"]
removeAddListen(elementOnchage); 

*/
  elementOnchage.forEach(elementOnchange => {
    $(elementOnchange).off();
  });
}



