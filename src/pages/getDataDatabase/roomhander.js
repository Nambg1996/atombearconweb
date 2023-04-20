import { myajax } from "../../assets/util/getData";
import { getListActiveRoom } from "../../components/PageDetail/PageSecond";


export  function getListRoom() {
    return myajax("server/control/pageFirst/listRoom.json", {});
}


export function getAllResultScan() {
    const roomActive = localStorage.getItem("room-active");
    const res = myajax(`server/control/pageFirst/${JSON.parse(roomActive)}/rssi_addressScanAll.json`, {});
    return res;
  }

 


  export function rssiAdressRegistered() {
    const roomActive = localStorage.getItem("room-active");
  

    const listActive= getListActiveRoom()
  
/* 
console.log("pick team",JSON.parse(roomActive));

console.log("listActive:", listActive) */
    

    


    if(listActive.includes(JSON.parse(roomActive))){

      const res = myajax(`server/control/pageFirst/${JSON.parse(roomActive)}/rssi_addressScan.json`, {});
      /* console.log("res:", res) */
      return res;

      //console.log("go here");
    } else{

      return []
    }



    


  }


  export function rssiAdressRegisteredByRoom(roomName) {

    function uniqueMacwithAverageRSSI(rssiadress) {
      return rssiadress
        .reduce((acc, curr) => {
          const index = acc.findIndex((el) => el[0] === curr[0]);
          if (index !== -1) {
            acc[index][1] += curr[1];
            acc[index][2] += 1;
          } else {
            acc.push([...curr, 1]);
          }
          return acc;
        }, [])
        .map((el) => [el[0], el[1] / el[2]]);
    }
   
    const res = myajax(`server/control/pageFirst/${roomName}/rssi_addressScan.json`, {});
    

    const formattedRes = res.map(({ strength, address }) => {
      return [address, -strength];
    });
    const rssiAddress = uniqueMacwithAverageRSSI(formattedRes);


      if(JSON.stringify(rssiAddress)=='[["",0]]'){

        return []

      }else{
      
        return rssiAddress
    
      }
    
  
 

  }






  export function getListPeopleRegistered() {
    const getListPeopleRegster = myajax(`server/control/pageFirst/listPeopleRegster.php`, {});
  
  
    const getListPeopleRegsterObj = JSON.parse(JSON.parse(getListPeopleRegster).data);
    return getListPeopleRegsterObj;
  }




  export const pepleName_mac_rssi_byRoom = (nameRoom) => {
  
    const infor=[]
    const rssi_adress_by_room=rssiAdressRegisteredByRoom(nameRoom)
    const subcribeList=getListPeopleRegistered()
  
    const name_mac=subcribeList.map(([times,name,address,room])=>[name,address])
    
    const name_mac_value_byroom=rssi_adress_by_room.map(([mac,rssi])=>{
  
      name_mac.forEach(([nameRegister,macRegister]) => {
  
        if(macRegister==mac){
  
          infor.push([nameRegister,macRegister,rssi])
          
        } 
        
      });
      
      
      
      
      
      
    })
  
    return infor
  }



  export const detectPe0pleLocation = (params) => {

    const listRoom=getListRoom()

    const pepleLocationTable={
      
    }
    
    
    listRoom.forEach(room => {

      const pepleName_mac_rssi= pepleName_mac_rssi_byRoom(room)
      

      pepleLocationTable[room]=pepleName_mac_rssi

      
      
      
    });
    console.log("pepleLocationTable:", pepleLocationTable)
    
    return pepleLocationTable


    
  }



