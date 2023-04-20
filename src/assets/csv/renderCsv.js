
import React, { useState } from "react";

import { CSVLink } from "react-csv";
import { iconDowload } from "../icon/Icon";
function CsvExport(dataCsv) { 

  /* var dataCsvInt={
    titleCSV:["日付","チーム","端末 品名（原料名）"],
    dataRow:[],
    fileName:"abc.csv"

}

const [dataCsv, setDataCsv] = useState(dataCsvInt);

useEffect(() => {

  var dataCsvNew={
    titleCSV:["日付","チーム","端末 品名（原料名）"],
    dataRow:[["30-10","PP","testing ahhaha"],["20-10","TC","test"]],
    fileName:"renamehere.csv"
}


  setDataCsv(dataCsvNew)


}, []); */

const {titleCSV,dataRow,fileName}=dataCsv
const { headers, data } = getCSVdata(dataRow, titleCSV);

  return (
    <>
    <CSVLink data={data} headers={headers} enclosingCharacter={`'`} filename={fileName} uFEFF={false}   id="dowloadCsv">
    {iconDowload}
    </CSVLink>
    </>
  );
}

export default CsvExport;
function getCSVdata(dataCSV, titleCSV) {
  const data = dataCSV.map((currentItem, index) => {

    return getObject(currentItem, titleCSV);

  });

  const nheaderData = titleCSV.map((item) => ({ label: item, key: item }));
  return { nheaderData, data };
}

function getObject(rows, columns) {
  return rows.reduce(function (result, field, index) {
    result[columns[index]] = field;
    return result;
  }, {});
}

