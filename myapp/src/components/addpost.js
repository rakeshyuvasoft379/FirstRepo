import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add_post } from '../redux/actions/actions';

function Addpost() {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
  
   const onSubmit =(data)=>{
 
     dispatch(add_post(data))
     navigate(`/dashboard`)
   }
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} className='form'><br/><br/>
      <h1>Create Post</h1>
         
      
        <input  {...register("title")} placeholder = "Title"/><br/><br/>
        
     
       
        <input {...register("description", { required: true })} placeholder="Description"/><br/><br/>
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit" style={{color:"white",background:"grey",border:"none"}}/>
      </form>
    );
}

export default Addpost