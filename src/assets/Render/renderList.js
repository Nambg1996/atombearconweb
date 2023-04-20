export const renderList = (listItem) => {
 
   /* <div className="row">
    {renderList([1,2,3,4,5,6,7,8])}
    </div> 

    */

    const jsx=<ul className="list-group">
     {listItem.map((item,index)=>(<li className="list-group-item mt-2" key={index} >{item}</li>))}
     </ul>
     return jsx


}




export function activeColumTable(e) {
   $(e.currentTarget).toggleClass("active");
 }
 export function remove_ActiveClass(e) {
   for (let index = 0; index < $(e.currentTarget).siblings().length; index++) {
     const element = $(e.currentTarget).siblings()[index];
     if ($(element).hasClass("active")) {
       $(element).removeClass("active");
     }
   }
 }


 export function getClickChoiceActive(e) {
   return $(e.currentTarget).hasClass("active") == true ? $(e.currentTarget).text() : "noChoice";
 }







