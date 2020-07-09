import Axios from 'axios';
import * as Types from './types';


export const loadTransactions=()=>dispatch=>{

    let user=localStorage.getItem('userBackUp');
    Axios.get(`/api/transaction/getAllTrans/${user}`)
        .then(res=>{ 

            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload:{
                    transactions : res.data
                }
            })
            
         })
        .catch(error=>{
            console.log("------------->in transaction error",error);
        })
}


export const addTransactions=(transaction,history)=>dispatch=>{
    

   Axios.post("/api/transaction/createTransaction",transaction)
        .then(res=>{ 

            dispatch({
                type: Types.CREATE_TRANSACTION,
                payload:{
                    transaction : res.data
                }
            })
            
            //history.push('/');
            
         })
        .catch(error=>{
            console.log("------------->in transaction :",error);
        }) 
}
export const deleteTransaction =_id=>dispatch=>{

    Axios.post('/api/transaction/deleteTransaction',{_id})
    .then(res=>{ 

        dispatch({
            type: Types.DELETE_TRANSACTION,
            payload:{
                id : res.data.x
            }
        })
     })
    .catch(error=>{
        console.log("------------->in delete transaction error",error);
    }) 
}





