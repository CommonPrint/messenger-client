export const getToken = () => {
    const jwt = localStorage.getItem('authorization') ? localStorage.getItem('authorization') : ''
    return jwt;
}

