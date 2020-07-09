import Axios from 'axios';
import * as Types from './types';


export const register=(user,history)=>dispatch=>{
    

    Axios.post('/api/users/register',user)
        .then(res=>{ 
            
            dispatch({
                type: Types.USERS_ERROR,
                payload:{
                    error:{}
                }
            })
            console.log(res);
            history.push('/login');
         })
        .catch(error=>{
            console.log("------------->in axios call error",error);
        })
}

export const login=(user,history)=>dispatch=>{
   
    console.log("history+++++++",history);
    Axios.post('/api/users/login',user)
        .then(res=>{

            var mydata=JSON.stringify(res.data.user);
            localStorage.setItem('userBackUp',mydata);
           
            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:res.data.user
                }
            })
           
            history.push('/');

            })
            
        .catch(error=>{
            console.log("------------->in axios call error",error);
        })
}

export const logout=(history)=>dispatch=>{
     localStorage.removeItem('userBackUp');
     localStorage.clear();
     //history.push('/')

            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:{}
                }
               
            })
           
}

