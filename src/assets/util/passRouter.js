import { shortLink } from "../myconfig/config";


export const redirect = (page,dataPass) => {

  /* 
  const obj={
    a:1,
    b:2
  }
  redirect("detail",obj) 
  
  */
  window.location ="/"+shortLink+`${page}?infor=${JSON.stringify(dataPass)}`;
}


export const getValueFromRouter = () => {
  /* 
 const infor=getValueFromRouter()
 console.log("~ infor", infor)
  */
  
 const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);
 const infor = JSON.parse(urlParams.get("infor"));
 return infor
 
}

