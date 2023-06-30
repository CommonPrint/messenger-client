import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './slices/users';
import chatReducer from './slices/chats';

import { controlsReducer } from './features/controls/controls-slice'
import { chatsReducer } from './features/controls/chat/chats-slice'
import { socketsReducer } from './features/controls/websocket/socket-slice';
import { demoReducer } from './features/controls/demo/demo-slice';

const reducer = {
  users: userReducer,
  chats: chatReducer,
  controls: controlsReducer,
  chatControls: chatsReducer,
  socket: socketsReducer,
  demo: demoReducer
}

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => customizedMiddleware
})

export default store;