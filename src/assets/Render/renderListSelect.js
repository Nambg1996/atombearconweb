import Select from 'react-select'

import $ from 'jquery'
import { getValueDom, setValueDom } from '../util/domHander';


export const SelectOption = (dataSelect) => {

   /*   const dataSelect={
    id:"selectBox",
    data:["1","2","3","4","5","6","7","8","9"],
  } */

   const {id,data}=dataSelect
   const odata=data.map( option => {
     return { value: option, label: option }
   }); 

 

   
  

   
   



   const testOnchange = (e) => {
  
    const roomActive=[e.value]
 
     localStorage.setItem("room-active",JSON.stringify(roomActive[0])); 

    $("#clickRender").click()

   }
 
 
 
  return <Select options={odata} id={id}  defaultValue ={odata[0]} onChange={testOnchange}/>
 }


