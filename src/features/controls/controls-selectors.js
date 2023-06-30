export const selectChat = (state) => { 
    return state.chatControls.chat
}

export const selectMessages = (state) => {
    return state.chatControls.messages
}

export const selectSearch = (state) => { 
    return state.controls.search
}

export const selectControls = (state) => {
    return state.controls
}

