import Axios from 'axios';
import * as Types from './types';


export const loadTransactions=()=>dispatch=>{

    let user=localStorage.getItem('userBackUp');
    Axios.get(`/api/transaction/getAllTrans/${user}`)
        .then(res=>{ 

            console.log(res.data);

            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload:{
                    transactions : res.data.transactions
                }
            })

            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:res.data.reqUser
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

            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:res.data.returnedUser
                }
            })
            history.push('/');
            
         })
        .catch(error=>{
            console.log("------------->in transaction :",error);
        }) 
}

export const giftSend=(transaction,history)=>dispatch=>{

    Axios.post("/api/transaction/moneySending",transaction)
         .then(res=>{ 

            console.log(res.data);
 
             dispatch({
                 type: Types.CREATE_TRANSACTION,
                 payload:{
                     transaction : res.data
                 }
             })

             dispatch({
                type:Types.SET_USER,
                payload:{
                    user:res.data.returnedUser
                }
            })

             //history.push('/');
             
          })
         .catch(error=>{
             console.log("------------->in transaction :",error);
         }) 
 }

export const deleteTransaction =_id=>dispatch=>{
    //let user=localStorage.getItem('userBackUp');
    let email= JSON.parse(localStorage.getItem('userBackUp')).email

    Axios.post('/api/transaction/deleteTransaction',{_id,email})
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





