import { monthNumberAgo } from "../util/monthNumberAgo";
import { today } from "../util/today";




function SearchBox() {
  

  const jsx = (
    <div className="row mt-2 my_flex_between">
      <div className="col-md-2">
        <label className="text_lable">工程</label>
        <input type="text" className="form-control" id="kotei" defaultValue="成形" />
      </div>

      <div className="col-md-2">
      <label className="text_lable">工程選択</label>
        <select className="form-select" aria-label="Default select example" id="selectBox">
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
      </div>

      <div className="col-md-2">
        <label className="text_lable">始まる時間</label>
        <input type="date" className="form-control" id="startTime" defaultValue={monthNumberAgo(3)}/>
      </div>
      <div className="col-md-2">
        <label className="text_lable">終了時間</label>
        <input type="date" className="form-control" id="endTime" defaultValue={today()}/>
      </div>
    </div>
  );

  return jsx;
}

export default SearchBox;
