import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { showData } from '../redux/actions/actions'
import { Link } from 'react-router-dom'
import './dashboard.css'
import { delete_post } from '../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import Addpost from './addpost'

function Dashboard() {
 
 
   const userData=useSelector((state)=>state?.user?.user)

  console.log(121,userData)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(() => {
    dispatch(showData())
   },[])

   function deletePost(id)
   {
    console.log("delete")
    dispatch(delete_post(id))
   }

   function addPost()
   {
    console.log("addPost")
    navigate('/addpost')
   }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/logout">logout</Link>
      <table className='table'>
       <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Operation</th>
        </tr>    
       <tr>
        <td colspan='4'  ><hr style={{color:"red"}}/></td>
       </tr>
       <tbody>
      {userData?.posts?.map((item,index)=>{
        return(
          <>
          <tr key={index}>
            <td><h3>{item.id}</h3></td>
            <td><h3>{item.title}</h3></td>
            <td><h3>{item.description}</h3></td>
            <td>&nbsp;
             
             <button className='btn-update'>update</button>&nbsp;
        
             <button onClick={()=>deletePost(item.id)} className='btn-delete'>delete</button></td>&nbsp;
           
          </tr>
          <tr> 
            <td colspan='4'><hr /></td>
          </tr>
          </>
        )
        
      })} 
      </tbody>
      </table> 
      <button onClick={()=>addPost()} className='btn-view'>add</button>
    </div>
  )
}

export default Dashboard