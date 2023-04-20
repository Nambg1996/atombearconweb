
export const arrayRotate = (DataRow) => {
   /* 
     const DataRow=[["1/1/2020","Anna","3"],["2/1/2020","Peter","6"],["3/1/2020","Tom","3"],["4/1/2020","Simen","6"]]
     console.log("~ arrayRotate(DataRow)", arrayRotate(DataRow))
   */
    
     const DataColumn = DataRow[0].map((_, colIndex) => DataRow.map(row => row[colIndex]));
     return DataColumn
    
}






