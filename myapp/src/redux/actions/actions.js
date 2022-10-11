import axios from "axios"
import {
   GET_LOGIN_STARTED,
   GET_LOGIN_SUCCESS,
   GET_LOGIN_FAILURE,
   GET_LOGOUT_SUCCESS,
   GET_LOGIN_REQUESTED,
   GET_LOGOUT_STARTED,
   GET_LOGOUT_REQUESTED,
   GET_DATA,
   DELETE_POST,
   ADD_POST,
  

 } from './types';

export const getLogin=(data)=>{
   console.log("getLogin",data)
 return{
    type:GET_LOGIN_REQUESTED,
    payload: data
 }

}

// export const getLogout=(data)=>{
//     return{
//        type:GET_LOGOUT_REQUESTED
//     }
   
//    }

export const showData=()=>{
   return {
      type: GET_DATA,
   }
}

export const delete_post=()=>{
   return{
      type: DELETE_POST
   }
}

export const add_post=(data)=>{
   return{
      type: ADD_POST,
      payload: data
   }
}

