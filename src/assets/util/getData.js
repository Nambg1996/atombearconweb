
import swal from 'sweetalert';

/* How to use 

step1 import into file to use
import {myajax} from './components/mylib/getdata.js'

step2 call function
    const obj = {
      name: "Donald Duck",
      city: "Duckburg",
      require: "update"
    }

    const res = myajax("server/control/usercontrol.php", obj)
    console.log(res)
*/

import $, { post } from 'jquery';
import { link_production } from '../myconfig/config';

 export const myajax = (url,obj) => {
/* links is link to src directory for projects*/
    const server = {
      links: link_production,
      geturl: function (url) {
        return this.links + url;
      }
    
    }

    const data = {}
    $.ajax({
      url: server.geturl(url),
      type: 'post',
      async: false,
      data: obj,
      success: function (responsed) {
        data.responsed = responsed
      },
      error: function (responsed) {
        //alert('Error');
         
      /* swal("サーバーからのデータの取得中に問題が発生しました"); */

      }
    }
    );
    
    return data.responsed;
  } 


  export const getProcessedData = (link,obj,ffc) => {

    const rawProcessedDaTa = myajax(link, obj,ffc)
    return ffc(rawProcessedDaTa)
  
   }