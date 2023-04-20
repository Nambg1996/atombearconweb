import { useEffect, useState } from "react";
import Header from "../../assets/smartComponent/Header";
import { getValueFromRouter } from "../../assets/util/passRouter";
import { checkAllKeys, fakeInfor, getObjectsInRange, splitArrayByNumber } from "../../pages/getDataDatabase/fakeInfor";
import {
  detectPe0pleLocation,
  getListPeopleRegistered,
  getListRoom,
  pepleName_mac_rssi_byRoom,
  rssiAdressRegisteredByRoom,
} from "../../pages/getDataDatabase/roomhander";
import $ from "jquery";

import "./PageSecond.css";
import { sumArray } from "../../assets/util/sumArray";
import { myajax } from "../../assets/util/getData";
import { echoPost } from "../../assets/Echo/echoPost";
import { getListColorThemes } from "../Home/PageFirst";

function PageSecond() {
  const [people_in_roomTable , setPeople_in_roomTable] = useState([]);

  /* const listActiveRoom=getListActiveRoom(); */

  useEffect(() => {
    const interval = setInterval(() => {
      // Set the result state to a new value here
      const { listRoom, PeopleNearRoom, numberDiv } = peopleInroom(); // listroom is all room on server include some room currently dont post data

      const listActiveRoom = getListActiveRoom(); // this is only list active room that is still post data to server.

       const ListRoomNotActive = getInactiveRooms(listRoom, listActiveRoom);
       removeRoomInactiveNow(ListRoomNotActive);
      const people_in_roomTable = showTableContent(listActiveRoom, PeopleNearRoom, numberDiv);
      setPeople_in_roomTable(people_in_roomTable);
      


    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/*  <Header title="部屋状況確認ページ" /> */}

      <div className="containers">
        {people_in_roomTable}

        
      </div>
    </>
  );
}

export default PageSecond;

function showTableContent(listActiveRoom, PeopleNearRoom, numberDiv) {
  return listActiveRoom.map((activeRoom, index) => {
    const eachRoom = PeopleNearRoom[activeRoom] == undefined ? [] : PeopleNearRoom[activeRoom];

    /* const peopleByRoom = getListPeopleByRoom(); *//* people that register mac with room */
   /*  console.log("peopleByRoom:", peopleByRoom); */

    const listColor = getListColorThemes();
    console.log("listColor:", listColor)


    const roomColum = splitArrayByNumber(eachRoom, numberDiv);
    const numberColum = roomColum.columnTotal;

    if (numberColum == 1) {
      return tableWithcolum1(roomColum, index, numberColum, activeRoom);
    }

    if (numberColum == 2) {
      return tablewithColum2(roomColum, index, numberColum, activeRoom);
    }

    if (numberColum == 3) {
      return tableWithcolum3(roomColum, index, numberColum, activeRoom);
    }
    if (numberColum == 4) {
      return tableWithcolum4(roomColum, index, numberColum, activeRoom);
    }

  });
}

function tableWithcolum4(roomColum, index, numberColum, activeRoom) {
  const { column1, column2, column3, column4 } = roomColum;
  const backgroundTheme = backGroundColorRoom(activeRoom);
  return (
    <>
      <div className="room-containers" key={index} datacolumn={numberColum}>
      <h1 className="text-center room-title"  style={{backgroundColor: backgroundTheme}}>{activeRoom}</h1>        
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group employee-list">
              {column1.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group employee-list">
              {column2.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group employee-list">
              {column3.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group employee-list">
              {column4.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function tableWithcolum3(roomColum, index, numberColum, activeRoom) {


  const backgroundTheme = backGroundColorRoom(activeRoom);
  


  const { column1, column2, column3 } = roomColum;
  return (
    <>
      <div className="room-containers" key={index} datacolumn={numberColum}>
      <h1 className="text-center room-title"  style={{backgroundColor: backgroundTheme}}>{activeRoom}</h1>        <div className="row">
          <div className="col-md-4">
            <ul className="list-group employee-list">
              {column1.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-group employee-list">
              {column2.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-group employee-list">
              {column3.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function backGroundColorRoom(activeRoom) {
  const listColor = getListColorThemes();
  const backgroundTheme = pickupColorFromroom(activeRoom, listColor);
  return backgroundTheme;
}

function tablewithColum2(roomColum, index, numberColum, activeRoom) {
  const { column1, column2 } = roomColum;
  const backgroundTheme = backGroundColorRoom(activeRoom);
  return (
    <>
      <div className="room-containers" key={index} datacolumn={numberColum}>
      <h1 className="text-center room-title"  style={{backgroundColor: backgroundTheme}}>{activeRoom}</h1>        <div className="row">
          <div className="col-md-6">
            <ul className="list-group employee-list">
              {column1.map(([name, address, rssi], index) => (
                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-group employee-list">
              {column2.map(([name, address, rssi], index) => (
                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function tableWithcolum1(roomColum, index, numberColum, activeRoom) {
  const { column1 } = roomColum;
  const backgroundTheme = backGroundColorRoom(activeRoom);

  return (
    <>
      <div className="room-containers" key={index} datacolumn={numberColum}>
      <h1 className="text-center room-title"  style={{backgroundColor: backgroundTheme}}>{activeRoom}</h1>        <div className="row">
          <div className="col-md-4">
            <ul className="list-group employee-list">
              {column1.map(([name, address, rssi], index) => (

                InforPeople(index, address + ":" + rssi, name)
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function removeRoomInactiveNow(ListRoomNotActive) {
  if (ListRoomNotActive.length) {
    const removeInactiveRoomOnserver = myajax(`server/control/pageFirst/removeInactiveRoom.php`, { ListRoomNotActive });

  }
}

function InforPeople(index, adressRssi, name) {


  const colorName = getColorBackgroundforEachPersion(adressRssi);

  return <li className="list-group-item employee-list-item wrapname" style={{backgroundColor: colorName}} key={index} data-rssi={adressRssi}>
     <div className="humanoid-icon">
     <span className="name">{name}</span> 
    </div> 
  </li>;


}

function getColorBackgroundforEachPersion(adressRssi) {
  const address = adressRssi.split("-")[0].slice(0, -1);
  const peopleByRoom = getListPeopleByRoom(); /* people that register mac with room */
  const room = chooseRoomFromAddress(address, peopleByRoom);

  const listColor = getListColorThemes();
  const colorName = pickupColorFromroom(room, listColor);
  return colorName;
}

function getListPeopleByRoom() {
  const listPeopleByroom = myajax(`server/control/pageFirst/listPeopleByroom.php`, {});

  const plistPeopleByroom = JSON.parse(JSON.parse(listPeopleByroom).data);

  return plistPeopleByroom

}

export function getListActiveRoom() {
  const listTractimeRoom = myajax(`server/control/pageFirst/tracktime.php`, {});

  const listRoomTrack = JSON.parse(listTractimeRoom);

  const thresholdMinutes = 2;
  const activeRooms = getActiveRooms(listRoomTrack, thresholdMinutes);
  return activeRooms;
}

function peopleInroom() {
  const locationRoom = detectPe0pleLocation(); // get from server
 
  const PeopleNearRoom = getObjectsInRange(locationRoom);
  const listRoom = Object.keys(PeopleNearRoom);
  const numberDiv = 5;
  return { listRoom, PeopleNearRoom, numberDiv };
}

function getActiveRooms(listRoomTrack, thresholdMinutes) {
  const currentTime = new Date();
  const listroomActive = [];

  for (const room in listRoomTrack) {
    const trackTime = new Date(listRoomTrack[room]);
    const timeDifferenceMinutes = (currentTime - trackTime) / (1000 * 60);

    if (timeDifferenceMinutes <= thresholdMinutes) {
      listroomActive.push(room);
    }
  }

  return listroomActive;
}

export function getInactiveRooms(listRoom, listActiveRoom) {
  // Create a new array to hold the inactive rooms
  let ListRoomNotActive = [];

  // Loop through each room in the listRoom array
  for (let i = 0; i < listRoom.length; i++) {
    // Check if the room is not present in the listActiveRoom array
    if (!listActiveRoom.includes(listRoom[i])) {
      // If it's not present, add it to the ListRoomNotActive array
      ListRoomNotActive.push(listRoom[i]);
    }
  }

  // Return the ListRoomNotActive array
  return ListRoomNotActive;
}


function pickupColorFromroom(roomName, colorList) {
  const colorObj = colorList.find(color => color[0] === roomName);
  return colorObj ? colorObj[1] : null;
}



function chooseRoomFromAddress(address, peopleByRoom) {
  const person = peopleByRoom.find(p => p[2] === address);
  return person ? person[3] : null;
}

