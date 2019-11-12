import api from './api';


export function homeworkUsagesNewList(data) {
    return api.service({
        url: '/student/index/homeworkUsagesNewList',
        method: 'post',
        data
    }).then(res => res)
}


