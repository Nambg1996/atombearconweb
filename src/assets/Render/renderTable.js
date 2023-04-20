import { headerTable } from "../../pages/config";

import $ from "jquery";
import { myajax } from "../util/getData";
import { echoSpread } from "../util/echoSpread";
import { echoPost } from "../Echo/echoPost";
import { alertConfirm, alertFail, alertSucess, showInputfield } from "../Alert/Alert";
import { getListPeopleRegistered } from "../../pages/getDataDatabase/roomhander";

export const renderTable = ({ titleTable = [], contentTable = [] }) => {
  if (JSON.stringify(contentTable) === '[["",0]]') {
    contentTable = [];
  }

 

  const titleJsx = titleTable.map((header, index) => (
    <th key={index} scope="col">
      {header}
    </th>
  ));

  const bodyJsx = contentTable.map((row, index) => (
    <tr key={index}>
      {row.map((rowValue, index) => {
        if (rowValue == headerTable["unsubscribe"] || rowValue == headerTable["subscribe"]) {
          const handerSubcribe = (e) => {
            //const obj = rowtableContent(e);
            const room = JSON.parse(localStorage.getItem("room-active"));
            const [stt, address, value] = rowtableContent(e);

            // compare with server registration
            const getListPeopleRegsterObj = getListPeopleRegistered();
            const stateRegister = getListPeopleRegsterObj.filter((registration) => registration[2] === address);

            if (!stateRegister.length) {
              showInputfield((name) => {
                if (isAlphaNumeric(name)) {

                registerBeaconTagName(name, address, value, room);

                } else {

                  alertFail("特殊文字は入力しないでください");


                }
                

                
              });
            } else {
              alertConfirm(() => {
                const registerInfor = { address, value, room };

                const MakeRegisterInfor = myajax(`server/control/pageFirst/deletepeopleRegister.php`, registerInfor);
                alertSucess("登録解除に成功しました");
                $("#clickRender").click();
              });
            }
          };

          return (
            <td key={index}>
              {
                <button type="button" onClick={handerSubcribe} className="btn btn-primary registerButton">
                  {rowValue}
                </button>
              }
            </td>
          );
        } else {
          return <td key={index}>{rowValue}</td>;
        }
      })}
    </tr>
  ));

  const jsxTable = (
    <table className="table  table-hover mt-2">
      <thead className="sticky-top color-header">
        <tr>{titleJsx}</tr>
      </thead>
      <tbody>{bodyJsx}</tbody>
    </table>
  );
  return jsxTable;
};

function registerBeaconTagName(name, address, value, room) {
  const peopleName = name;
  const registerInfor = { address, value, room, peopleName };
  console.log(" address, value, room,peopleName:", address, value, room, peopleName);

  const MakeRegisterInfor = myajax(`server/control/pageFirst/tagPeopleWithMac.php`, registerInfor);

  console.log("MakeRegisterInfor:", MakeRegisterInfor);

  alertSucess("データ更新成功");
  $("#clickRender").click();
}

function rowtableContent(e) {
  const $button = $(e.target);
  const $grandparent = $button.closest("tr");
  const $tdElements = $grandparent.find("td");
  const obj = $tdElements
    .map(function () {
      return $(this).text();
    })
    .get();

  return obj;
}

function isAlphaNumeric(str) {
  // Use a regular expression to check if the string contains only letters and/or numbers
  /* return /^[a-z0-9]+$/i.test(str); */

  var specialChars = "!@#$%^&*()+-=_|\\/?.<>";
  for (var i = 0; i < str.length; i++) {
    if (specialChars.indexOf(str.charAt(i)) != -1) {
      return false;
    }
  }
  
  return true;
}
