import api from './api';




export function login(data) {
    return api.service({
        url: '/student/user/login',
        method: 'post',
        data
    }).then(res => res)
}



