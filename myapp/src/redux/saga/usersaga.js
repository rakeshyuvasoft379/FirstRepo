import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILURE,
    GET_LOGIN_REQUESTED,
    GET_LOGOUT_REQUESTED,
    GET_LOGOUT_SUCCESS,
    GET_DATA,
    GET_DATA_SUCCESS,
    Error,
    DELETE_POST,
    DELETE_DATA,
    
    ADD_DATA,
    ADD_POST,

  } from '../actions/types';

function getApi(data){
   const body={
    "user":{
        "email":data.email,
        "password":data.password
    }
   }

   return axios.request({
    method:"post",
    url:`https://react-rails-api-demo.herokuapp.com/api/v1/signin`,
    data:body
   })
}

const showData=()=>{
    const token=localStorage.getItem('token')
    return axios.get("https://react-rails-api-demo.herokuapp.com/api/v1/posts",{headers: {Authorization: `${token}`}})
   }

const deleteData=(id)=>{  
    console.log("deleteData")
    const token=localStorage.getItem('token')
    console.log(574,token)
    return axios.delete(`https://react-rails-api-demo.herokuapp.com/api/v1/posts/:id`,{headers: {Authorization: `${token}`}})
    
}   

const addData=(data)=>{

    console.log(222,data)
    const token=localStorage.getItem('token')
    const body ={
        "post": 
        {
            "title": data.title,
            "description": data.description,
            "user_id": 1
        }
    }
   return axios.post(`https://react-rails-api-demo.herokuapp.com/api/v1/posts`,body,{headers: {Authorization: `${token}`}})
}
    // return (dispatch) => {
    //     const body = {
    //         "post": {
    //             "title": data.title,
    //             "description": data.description,
    //             "user_id": ""
    //         }
    //     }

    //     axios.request({
    //         method: "post",
    //         url: "/posts",
    //         data: body


    //     })


function* fetchData(action){
    try{
        const response = yield call(showData, action.payload)
        console.log(333,response.data)
        yield put({
            type:GET_DATA_SUCCESS,
            payload:response.data
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}


function* fetchUser(action){
    try{
       
        const response=yield call(getApi, action.payload)
        
        localStorage.setItem('user-info',JSON.stringify(response.data))
        localStorage.setItem('token',response.data.token)
        yield put({type:GET_LOGIN_SUCCESS,user:response.data})
 
    } catch(e){
        yield put({type:GET_LOGIN_FAILURE,message:e.message})
    }
}

function* logoutUser(action){
 try{
    yield put({type:GET_LOGOUT_SUCCESS})
 }catch(e){
    yield put({type:GET_LOGIN_FAILURE,error:e.message})
 }

}

function* deleteUser(action){
    try{
        const response = yield call(deleteData, action.payload)
            yield put({
            type:DELETE_DATA         
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}

function* addUser(action){
    console.log(666,"addUser")
    try{
        let response = yield call(addData, action.payload)
        console.log(5555555,response)
            yield put({
            type:ADD_DATA,
            payload: response.data    
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}


function* userSaga(){
    yield takeEvery(GET_LOGIN_REQUESTED, fetchUser)
    yield takeEvery(GET_LOGOUT_REQUESTED, logoutUser)
    yield takeEvery(GET_DATA, fetchData)
    yield takeEvery(DELETE_POST,deleteUser)
    yield takeEvery(ADD_POST,addUser)
}

export default userSaga
