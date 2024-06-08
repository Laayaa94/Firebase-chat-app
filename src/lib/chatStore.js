import { create } from 'zustand';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user:null,
    isCurrrentUserBlocked:false,
    isReceiverBlocked:false,
    
    changeChat:(chatId,user)=>{
        const currentUser=useUserStore.getState().currentUser

        //Check current user is blocked
        if(user.blocked.includes(currentUser.id)){
           return set({
            chatId,
            user:null,
            isCurrrentUserBlocked:true,
            isReceiverBlocked:false,
           }) ;
        }
        //Check receiver is blocked

        if(currentUser.blocked.includes(user.id)){
            return set({
             chatId,
             user:user,
             isCurrrentUserBlocked:false,
             isReceiverBlocked:true,
            }) ;
         }
        changeBlock:()=>{
            set(state=>({...state,isReceiverBlocked:!state.isReceiverBlocked}))
        }
    }
  
  }  ));
