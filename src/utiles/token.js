export const setTokenToLocalStorage = token => {
    localStorage.setItem('TOKEN', token)
};

export const getTokenFromLocalStorage = ()=> {
    return localStorage.getItem('TOKEN')
}