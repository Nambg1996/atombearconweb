
import $ from 'jquery'

export function setttingPrintLanScape() {
    //setttingPrintLanScape() 
    var css = "@page { size: landscape; }",
      head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
      style.type = "text/css";
      style.media = "print";
  
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  
    head.appendChild(style);
  }



  export function printDiv(style,idOrClass) {


  /*   var style=`
    h1{
      text-align: center;
    }

    printDiv(style,"#pragrap")  */

    var divToPrint = $(idOrClass)[0];
    var newhtmlToPrint = `<style type="text/css">
            ${style}
      </style>`;
 
    newhtmlToPrint += divToPrint.outerHTML;

  var newWin = window.open("");
    newWin.document.write(newhtmlToPrint);
    newWin.print();
    newWin.close();  
  }




  export function printHTML(style,htmlString) {


 

    /* 
    const styleTable=`table, td, th {
      border: 1px solid;
      text-align: center;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }`

   printHTML(styleTable,$(".table")[0].outerHTML)
    */
    
    
    
   

    var newhtmlToPrint = ` <style type="text/css">
            ${style}
      </style>`;
 
    newhtmlToPrint += htmlString;
    var newWin = window.open("");
    newWin.document.write(newhtmlToPrint);
    newWin.print();
    newWin.close();
  }


