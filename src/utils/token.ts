function setToken(token: string) {
    localStorage.setItem('token', token);
}

function getToken() {
    localStorage.getItem('token');
}

function deleteToken() {
    localStorage.clear();
}
