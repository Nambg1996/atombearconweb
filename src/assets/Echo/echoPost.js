
  export const echoPost = (test) => {
    /* 
const  test = {time:"233",price:"10$"}
echoPost(test)
 */
    var echo=""
    Object.keys(test).forEach(variable => {
    var stringPost=`$${variable} = $_POST['${variable}'];`+"\n"
    echo=echo+stringPost
   });
   console.log(echo);
   return echo
   
  }

  
