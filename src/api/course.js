import api from './api';



export function courseUsagesList(data) {
    return api.service({
        url: '/student/index/courseUsagesList',
        method: 'post',
        data
    }).then(res => res)
}







