
import {
  GET_LOGIN_STARTED,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILURE,
  GET_LOGOUT_SUCCESS,
  GET_DATA_SUCCESS,
  Error,
  DELETE_DATA,
  ADD_DATA,
  
} from '../actions/types';


const initialState={
    user:[],
    error:"",
}

export const LoginReducer=(state=initialState,action)=>{

    switch(action.type){

     case GET_LOGIN_STARTED:
      console.log(1001)
      return{
        ...state,
     
      } 
      
      case GET_LOGIN_SUCCESS:
        console.log(1002)
        return{
            ...state,
        user:action.user
        }

        case GET_LOGIN_FAILURE:
          console.log(1003)
        return{
            ...state,
            error:action.error
        }
    
      case GET_LOGOUT_SUCCESS:
        return{
          ...state,
          user:null,
          error:null
        }  

        case GET_DATA_SUCCESS:
          console.log(144,"getData")
          return{
            ...state,
            user:action.payload
          }

          case DELETE_DATA:
            return{
              ...state,
              user:action.payload
            }

            case ADD_DATA:
              console.log(989,action.payload)
              return{
                ...state,
                user:action.payload
              }

            
        case Error:
          return{
            ...state,
            error:action.payload
          }      

      default:
        return state

    }

}