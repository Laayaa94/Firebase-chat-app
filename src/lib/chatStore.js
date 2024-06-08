import { create } from 'zustand'
import { useUserStore } from './userStore'

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrrentUserBlocked: true,
        isReceiverBlocked: false,
      })
    } else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user,
        isCurrrentUserBlocked: false,
        isReceiverBlocked: true,
      })
    } else {
      return set({
        chatId,
        user,
        isCurrrentUserBlocked: false,
        isReceiverBlocked: false,
      })
    }
  },
  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }))
  },
}))
