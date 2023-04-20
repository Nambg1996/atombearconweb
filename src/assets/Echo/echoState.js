export const echoState = (params,defaultValue) => {

   
    //echoState("infor",[])
    //echoState("infor")
   
    if(defaultValue!=undefined){
            const coverts=JSON.stringify(defaultValue)
            const captilization = params.charAt(0).toUpperCase() + params.slice(1)
            const stringFame=`
            const [${params}, set${captilization}] = useState(${coverts});
            
            `  
            console.log(stringFame)
            return stringFame



      
    
       



    }else{

        const captilization = params.charAt(0).toUpperCase() + params.slice(1);
    
        const stringFame=`
        const getIntilize${captilization} = () => {

            const data={

            }
            return data
          
        }  
        
        const intil${captilization}=getIntil${captilization}()
        const [${params}, set${captilization}] = useState(intil${captilization});
        
        `  
        console.log(stringFame)
        
        return stringFame


    }

 
    
        
      }
