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
   
    Axios.post('/api/users/login',user)
        .then(res=>{

            var log=false;
            localStorage.setItem('logBackUp',log);
            let log3= JSON.parse(localStorage.getItem('logBackUp'));
            console.log("in log 333333---->>>>>>",log3);


            
            var mydata=JSON.stringify(res.data.user);
            localStorage.setItem('userBackUp',mydata);
        
            /* var myHistory=JSON.stringify(history);
            localStorage.setItem('historyBackUp',myHistory);

            let historyPop= JSON.parse(localStorage.getItem('historyBackUp'));
            console.log("in login---->>>>>>",historyPop); */


            dispatch({
                type:Types.SET_USER,
                   payload:{
                       user:{}
                   }
               })
   
       dispatch({
               type:Types.LOAD_TRANSACTIONS,
               payload:{
               transactions:{}
                   }
           }) 

           

           
            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:res.data.user
                }
            })

            console.log("type of history in login----", typeof history);

        history.push('/');
        })  
        .catch(error=>{
            console.log("------------->in axios call error",error);
        })
}

export const logout=history=>dispatch=>{

    localStorage.removeItem('userBackUp');
    //localStorage.clear(); 
    /* let historyPop= JSON.parse(localStorage.getItem('historyBackUp'));
    console.log("in login---->>>>>>",historyPop); */

    var log=true;
    localStorage.setItem('logBackUp',log);

    let log2= JSON.parse(localStorage.getItem('logBackUp'));
    console.log("in logi  2 22222---->>>>>>",log2);


    
    dispatch({
             type:Types.SET_USER,
                payload:{
                    user:{}
                }
            })

    dispatch({
            type:Types.LOAD_TRANSACTIONS,
            payload:{
            transactions:{}
                }
        }) 
       /*  console.log("type of history pop----",  history);
        history.push('/');
        console.log("--------Getting out-----"); */

        


}

