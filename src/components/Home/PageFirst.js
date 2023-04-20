import React, { useEffect, useState } from "react";
import "./PageFirst.css";
import Header from "../../assets/smartComponent/Header";
import { echoState } from "../../assets/Echo/echoState";
import { alertConfirm, alertConfirmSetting, alertFail, alertSucess } from "../../assets/Alert/Alert";
import { echoSpread } from "../../assets/util/echoSpread";
import { SelectOption } from "../../assets/Render/renderListSelect";

import $ from "jquery";
import { getValueDom } from "../../assets/util/domHander";
import { today } from "../../assets/util/today";
import { printDiv, printHTML } from "../../assets/util/printSetting";
import { CSVLink } from "react-csv";
import CsvExport from "../../assets/csv/renderCsv";
import { lineChart } from "../../assets/chart/lineChart";
import { myajax } from "../../assets/util/getData";
import { renderTable } from "../../assets/Render/renderTable";
import SearchBox from "../../assets/smartComponent/SearchBox";
import { getAllResultScan, getListPeopleRegistered, getListRoom, rssiAdressRegistered } from "../../pages/getDataDatabase/roomhander";
import { headerTable, inforAreas } from "../../pages/config";
import { getListActiveRoom } from "../PageDetail/PageSecond";
import { echoPost } from "../../assets/Echo/echoPost";

var checkLocal = 0;

function PageFirst() {
  const [render, setRender] = useState(true);

  saveRoomValueinitonLocalStore();
  const dataSelectInit = {
    id: "listRoom",
    data: [getListRoom()[0]],
  };

  const [dataSelect, setDataSelect] = useState(dataSelectInit);
  const [beaconRegisterTable, setBeaconRegisterTable] = useState([]);


  const listColor = getListColorThemes();
 
  const delaySystemValue = myajax(`server/control/pageFirst/getDelaySystem.php`, {});

  const valueDelaySystem=JSON.parse(delaySystemValue)

  const [listroomTheme, setListroomTheme] = useState(listColor);





  useEffect(() => {
    const listActive = getListActiveRoom();
    const listRoom = getListRoom();
    const dataSelectNew = {
      id: "listRoom",
      data: listRoom,
    };

    setDataSelect(dataSelectNew);
  }, []);

  useEffect(() => {
    const registedBeacon = registerBeaconData();
    setBeaconRegisterTable(registedBeacon);
  }, [render]);

  return (
    <>
      <div className="container">
       
        <button type="button" className="btn btn-primary d-none" id="clickRender" onClick={() => setRender(!render)}>
          render
        </button>

        <div className="row">
          <div className="col-md-4">{SelectOption(dataSelect)}</div>
          <div className="col-md-4"></div>
        </div>

        <div className="row">
          <div className="col-md-8 scrollY">{renderTable(beaconRegisterTable)}</div>
          <div className="col-md-4 ">
            {listroomTheme.map(([roomName, color], index) => settingColorRoom([roomName, color, index]))}

            <div className="input-group mb-3 mt-2 ">
              <span className="input-group-text" id="inputGroup-sizing-default">
              システム遅延
              </span>
              <input type="text" className="form-control systemdelay" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="systemDelayNumber" defaultValue ={valueDelaySystem}/>
            </div>
            <button type="button" className="btn btn-primary mt-5 ml-5" id="submit-btn">
              送信
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageFirst;

export function getListColorThemes() {
  const listActiveRoom = getListActiveRoom();
  const listcolorTheme = myajax(`server/control/pageFirst/getColorListTheme.php`, {});
  const listcolorThemeObj = JSON.parse(listcolorTheme);
  const listColor = getListColorTheme(listcolorThemeObj, listActiveRoom);
  return listColor;
}

export function getListColorTheme(listcolorThemeObj, listActiveRoom) {
  if (listcolorThemeObj.length) {
    
    
    const listActiveRoom = getListActiveRoom();
    /* console.log("listActiveRoom:", listActiveRoom) */

   
    return getRoomColors(listActiveRoom, listcolorThemeObj);

  } else {


    return listColorDefaultFrom(listActiveRoom);

  }
}

function listColorDefaultFrom(listActiveRoom) {
  return listActiveRoom.map(room => {

    const color = "#c0c4c1";
    return [room, color];

  });
}

function settingColorRoom([roomName, color, index]) {
  return (
    <div className="wraproom" key={index}>
      <span className="roomrender ">{roomName}</span>
      <span className="eachColor">
        <input type="color" className="form-control form-control-color" defaultValue={color} />
      </span>
    </div>
  );
}

function saveRoomValueinitonLocalStore() {
  if (checkLocal == 0) {
    checkLocal = checkLocal + 1;
    localStorage.setItem("room-active", JSON.stringify(getListRoom()[0]));
  }
}

function getotherDeviceScan() {
  const res = getAllResultScan();
  const formattedRes = res.map((item) => {
    const [rssi, mac] = item.split(": ");
    return [mac, rssi];
  });

  const titleTable = [headerTable["Mac adress"], headerTable["RSSI"]];

  const contentTable = formattedRes;

  const intTableData = {
    titleTable: titleTable,
    contentTable: contentTable,
  };
  return intTableData;
}

function registerBeaconData() {
  function uniqueMacwithAverageRSSI(contentTable) {
    return contentTable
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

  const res = rssiAdressRegistered();

  const formattedRes = res.map(({ strength, address }) => {
    return [address, -strength];
  });
  const rssiAddress = uniqueMacwithAverageRSSI(formattedRes);

  const titleTable = [headerTable["STT"], headerTable["Mac adress"], headerTable["RSSI"], headerTable["Name"], headerTable["State"]];

  const Beacondata = rssiAddress;

  const subcribeList = getListPeopleRegistered();

  const subscriberList = subcribeList.map(([times, name, address, room]) => [name, address]);

  const getContentable = (params) => {
    if (JSON.stringify(Beacondata) == '[["",0]]') {
      const contentTable = [];
      return contentTable;
    } else {
      const contentTable = subscriberListInfor(Beacondata, subscriberList);

      const sttContentTable = contentTable.map(([address, rssi, name, state], index) => {
        return [index + 1, address, rssi, name, state];
      });

      return sttContentTable;
    }
  };

  const contentTable = getContentable();

  const intTableData = {
    titleTable: titleTable,
    contentTable: contentTable,
  };

  return intTableData;
}

function checkVariableLocalstore(variable) {
  if (localStorage.getItem(variable)) {
    return true;
  } else {
    return false;
  }
}

function subscriberListInfor(Beacondata, subscriberList) {
  let result = [];
  Beacondata.forEach((beacon) => {
    let subscriber = subscriberList.find((sub) => sub[1] === beacon[0]);
    result.push([
      beacon[0],
      beacon[1],
      subscriber ? subscriber[0] : headerTable["not available"],
      subscriber ? headerTable["subscribe"] : headerTable["unsubscribe"],
    ]);
  });
  return result;
}

/* function ColorPicker(props) {
  const labels = props.labels || [];

  return (
    <div className="col-md-4 ">
      <ul className="list-group">
        {labels.map((label, index) => (
          <div key={index} className="list-group-item">
            <span>{label}</span>
            <input type="color" className="form-control form-control-color" id={`colorPicker-${index}`} />
          </div>
        ))}
      </ul>
    </div>
  );
} */



$(document).ready(function() {
  // Your code here
  $("#submit-btn").click(function () {
    var colorList = [];
    $(".wraproom").each(function () {
      var roomName = $(this).find(".roomrender").text();
      var color = $(this).find(".form-control-color").val();
      colorList.push([roomName, color]);
    });
    
    console.log("colorList:", colorList)
    var delaySystem = $('#systemDelayNumber').val();
  
  // Use the value for further processing


  const inforSetting={
    colorList,delaySystem
    
  }

  alertConfirmSetting(()=>{
    
  
    const settingSystem = myajax(`server/control/pageFirst/settingSystem.php`, inforSetting);

   


  })
  
  
  
  
  
  });
  
});



export function getRoomColors(activeRooms, colorThemes) {
  const result = activeRooms.map(room => {
    const colorTheme = colorThemes.find(theme => theme[0] === room);
    return [room, colorTheme ? colorTheme[1] : '#c0c4c1'];
  });

  return result;
}


