export const echoTableRenderLogic = (component) => {

/* echoTableRenderLogic("table") */

const lowercase=component;

const captilization = component.charAt(0).toUpperCase() + component.slice(1)


const frame=`
const [${lowercase}Data, set${captilization}Data] = useState([]);

const [render, setRender] = useState(true);

useEffect(() => {

    const elementOnchage=["#endTime","#startTime","#kotei"]
    onChageMultiple(elementOnchage,(obj)=>{
        //when each element on changed is get value all element and re-render component
        
        setRender(!render)
    });
    
    const searchOption=getValueDom(["#endTime","#startTime","#kotei"])
    echoPost(searchOption)
    const ${lowercase}Data=getProcessedData("server/control/PageFirst/getTable.php",searchOption,(rawData) => {
        // get data Server from searchOption 
        return rawData
        
    })
    
    const new${captilization}Data={
        titleTable:["Date","Number","7 code"],
        contentTable:JSON.parse(${lowercase}Data)
    }
    setTableData(new${captilization}Data)
    
    
}, [render]);


//{renderTable(${lowercase}Data)}


`
console.log("~ frame", frame)

}