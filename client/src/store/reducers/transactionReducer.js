import * as Types from '../actions/types';


const transactionReducer=(state=[],action)=>{

    switch (action.type){
        case Types.LOAD_TRANSACTIONS:{
            return action.payload.transactions
            
        }
        case Types.CREATE_TRANSACTION:{
            let transactions=[...state];
            transactions.unshift(action.payload.transaction)

            //return action.payload.transactions

            return transactions
            
        }
        case Types.DELETE_TRANSACTION:{
            let transactions=[...state];
            let trans2=[];

             transactions.filter(trans=>{
                 if(trans._id !== action.payload.id)
                    {trans2.unshift(trans);}
                
            })
            console.log("trans2----------",trans2);
            return trans2 

        }

        default: return state
    }
}


export default transactionReducer;