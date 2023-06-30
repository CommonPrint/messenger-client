import http from "../http-common";


const get = async (id) => {
    const response = await http.get(`/users/${id}`);

    return response;
}

const getAll = async () => {
    const response = await http.get(`/users`);

    return response;
}

const getAllByUsername = async (username) => {
    const response = await http.get(`/users/search/${username}`);

    return response;
}

const create = async (data) => {
    const response = http.post("auth/signup", data);
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


const authorize = async (data) => {
    const response = http.post("auth/signin", data);

    let newData = await response;

    console.log('DATA', newData);

    if (response.status === 200) {
        console.log('response', response);
    } 

    return newData;
}


const update = async (id, data) => {
    return await http.put(`/users/${id}`, data);
}


const updateOnline = async (id, data) => {
    return await http.put(`/users/online/${id}`, data);
}


const UserService = {
    get,
    getAll,
    getAllByUsername,
    create,
    update,
    updateOnline,
    authorize
}

export default UserService;