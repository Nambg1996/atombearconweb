export function Modal({DataModal}) {
 
 
   /*   const DataModal={
    titleModal: "Modal Title",
    DataModalTitle: ["Modal Title"],
}

useEffect(() => {

$("#showModal").click() 
     }, []);

     //html  <Modal DataModal={DataModal}/>

*/
  
     const {titleModal,DataModalTitle}=DataModal
  
     const jsx=<div>
    
     <button type="button" className="btn btn-primary invisible" data-bs-toggle="modal" id="showModal" data-bs-target="#staticBackdrop">
      show Modal
     </button>
   
     <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
       <div className="modal-dialog">
  
  
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="staticBackdropLabel">{titleModal}</h5>
             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
           </div>
           <div className="modal-body">
             ...write something here
           </div>
           <div className="modal-footer">
             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             <button type="button" className="btn btn-primary">OK</button>
           </div>
         </div>
       </div>
     </div>
   </div>
  
     return ( jsx );
 }
  
 export default Modal;
 