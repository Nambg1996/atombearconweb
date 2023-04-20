
import $ from 'jquery'




export const echoSpread = (varible) => {

    var frame = `const {${Object.keys(varible).join(",")}}=${Object.keys({ varible })[0]}`;
    console.log(frame);
    
  };



 