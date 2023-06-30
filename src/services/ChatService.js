import http from "../http-common";

const getAll = async () => {
    return await http.get(`/chats`);
}


const get = async (id) => {
    return await http.get(`/chats/${id}`);
}


const create = async (data) => {
    const response = http.post("/chats", data);
                                    // .then((response) => {
                                    //     console.log('Response', response);
                                    // })
                                    // .catch((err) => {
                                    //     console.log('Error', err.response)
                                    // })

    let newData = await response;

    console.log('DATA', newData);

    if (response.status === 200) {
        console.log('response', response);
    } 

    return newData;
}


const update = async (id, data) => {
    return await http.put(`/chats/${id}`, data);
}

const remove = async (id) => {
    return await http.delete(`/chats/${id}`);
};


const ChatService = {
    get,
    getAll,
    create,
    update,
    remove
}

export default ChatService;