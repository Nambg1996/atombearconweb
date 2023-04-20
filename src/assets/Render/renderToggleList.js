export function ToggleList({data}) {
/* 
const ToggleListData={
      toggleName:"click Here",
      listItem:["a","b","c","d","e","f","g","h"],
      id:"collapseExample"
    }

        <div className="row">
          <ToggleList data={ToggleListData}/>
        </div>

*/


  
    const {toggleName,listItem,id}=data
    const href="#"+id
    return (
      <div>
        <p>
          <a
            className="btn btn-primary"
            data-bs-toggle="collapse"
            href={href}
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {toggleName}
          </a>
        </p>
        <div className="collapse" id={id}>
          <ul className="list-group">
          {listItem.map((item,index)=>(<li className="list-group-item mt-2" key={index} >{item}</li>))}
          </ul>
        </div>
      </div>
    );
  }