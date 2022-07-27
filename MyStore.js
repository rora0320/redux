import {createStore} from "redux";
import cookie from 'cookie'

let StorageData = JSON.parse(window.sessionStorage.getItem("userData"))?JSON.parse(window.sessionStorage.getItem("userData")):null;
let LocalData = JSON.parse(window.localStorage.getItem("userData"))?JSON.parse(window.localStorage.getItem("userData")):null;
let Getcookie = cookie.parse(document.cookie).level_opds?cookie.parse(document.cookie).level_opds:null
console.log("쿠키가져와",Getcookie);
const loginState={
    isLogin:StorageData?true:false, //로그인 유무확인 현재사용 안함
    level:StorageData?StorageData.u_level:(LocalData?LocalData.u_level:null),
    visitLogin:false,
    index:StorageData?StorageData.u_index:(LocalData?LocalData.u_index:null),
    name:StorageData?StorageData.u_name:(LocalData?LocalData.u_name:null),
    part:StorageData?StorageData.u_part:(LocalData?LocalData.u_part:null),
};
//console.log("쿠키값?",loginState);
console.log("쿠키값?",loginState);
function reducer (state=loginState, action)  {
    switch(action.type) {
        case "Login":
            return {...state, isLogin:true,level:action.data.level, index:action.data.index, visitLogin:false,name:action.data.name, part:action.data.part };
        case "Logout" :
            return {...state, isLogin:false, level:0, visitLogin:false};
        case "Visit" :
            return {...state, isLogin:state.isLogin, level:state.level, visitLogin:true};
        case "Exit" :
            return {...state, isLogin:state.isLogin, level:state.level, visitLogin:false};
        default:
            return {... state, state};
    }
};

export default createStore(reducer);