import api from './api';


export function subjectList(data) {
    return api.service({
        url: '/student/user/subjectIconList',
        method: 'post',
        data
    }).then(res => res)
}
