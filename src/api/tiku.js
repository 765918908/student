import api from './api';



export function tikuList(data) {
    return api.service({
        url: '/school/tiku/tikuList',
        method: 'post',
        data
    }).then(res => res)
}


export function errorList(data) {
    return api.service({
        url: '/student/index/wrongTikuList',
        method: 'post',
        data
    }).then(res => res)
}


export function delError(data) {
    return api.service({
        url: '/student/index/delWrongTiku',
        method: 'post',
        data
    }).then(res => res)
}


export function collectionList(data) {
    return api.service({
        url: '/student/Collection_tiku/collectionList',
        method: 'post',
        data
    }).then(res => res)
}


export function addCollection(data) {
    return api.service({
        url: '/student/Collection_tiku/addCollection',
        method: 'post',
        data
    }).then(res => res)
}


export function delCollection(data) {
    return api.service({
        url: '/student/Collection_tiku/delCollection',
        method: 'post',
        data
    }).then(res => res)
}









