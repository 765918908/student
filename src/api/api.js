import axios from 'axios';
import qs from 'qs';
import { Loading } from 'element-ui';
import { Message } from 'element-ui'
let base = 'http://192.168.0.157';

let school_host = 'http://115.231.154.34';



axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['key'] = 123456;
axios.defaults.headers['schoolcode'] = 'a00e';
axios.defaults.headers['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiZDY0Y2RmZDAtZDRmOC0wYzJjLTgzODktMWQ3Y2RkMjhjYmUxIn0._h4J9P5l2dtq7hu6sXpj0Vw1uuE-Aq9xcrGX45Tsa6k';

const service = axios.create({
    baseURL: school_host, // url = base url + request url
    //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
})



// let http_builder_url = function (url, data) {
//     if (typeof (url) == 'undefined' || url == null || url == '') {
//         return '';
//     }
//     if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
//         return '';
//     }
//     url += (url.indexOf("?") != -1) ? "" : "?";
//     for (var k in data) {
//         url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);

//     }
//     return url;
// }


let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        target: '.content-container',
        text: '加载中……',
        //background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {
    loading.close()
}

let needLoadingRequestCount = 0
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}



service.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    //console.log('bb')
    showFullScreenLoading()
    config.data = qs.stringify(config.data)
    return config;
}, function (error) {
    //请求错误时做些事
    // return Promise.reject(error);
});


// service.interceptors.response.use(function (response) {
//     tryHideFullScreenLoading()
//     let data = response.data

//     if (data.code == 0) {

//         Message({
//             message: data.msg,
//             type: 'error',
//             duration: 1000
//         })
//         //return false  //在Promise中return false 是无效的！！
//         return Promise.reject(new Error("11"))
//     } else {
//         return data;
//     }

// }, function (error) {
//     //请求错误时做些事
//     return Promise.reject(error);
// });

service.interceptors.response.use(function (response) {
    tryHideFullScreenLoading()
    let data = response.data

    if (data.code == 0) {
        Message({
            message: data.msg,
            type: 'error',
            duration: 1000
        })
        //return false  //在Promise中return false 是无效的！！
        //throw new Error("222")

        return Promise.reject()
        //.catch((e) => { })
    } else {
        return data;
    }

}, function (error) {
    //请求错误时做些事
    console.log(333)
    return Promise.reject(error);
});


// http.interceptors.response.use(response => {
//     if (response.status === 201) {
//         iView.Message.success('操作成功');
//     }
//         return response;
//     }, error => {
//         if (error.response.status === 422) {
//             iView.Message.warning(error.response.data.msg);
//         }
//         if (error.response.status === 404) {
//         router.push({
//             name: 'error-404'
//         });
//     }
//     if (error.response.status === 401) {
//         // iView.Message.warning('未获取到登录状态');
//         router.push({
//             name: 'login'
//         });
//     }
//     return Promise.resolve(error.response);
// });


export default { service }
