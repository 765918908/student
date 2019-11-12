import axios from 'axios';
import qs from 'qs';
import {Loading } from 'element-ui';
let base = 'http://192.168.0.156';

//var instance = axios.create({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

function http_builder_url(url, data) {
    if (typeof (url) == 'undefined' || url == null || url == '') {
        return '';
    }
    if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
        return '';
    }
    url += (url.indexOf("?") != -1) ? "" : "?";
    for (var k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);

    }
    return url;
}


let loading       

function startLoading() {    
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
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



axios.interceptors.request.use(function(config){
    //在发送请求之前做某事
    console.log('bb')
    showFullScreenLoading()
    return config;
  },function(error){
    //请求错误时做些事
   // return Promise.reject(error);
  });


  axios.interceptors.response.use(function(response){
    tryHideFullScreenLoading()
    return response;
  },function(error){
    //请求错误时做些事
    return Promise.reject(error);
  });


//登录
export const login = params => { return axios.post(`${base}/admin/AdminLogin`, qs.stringify(params)).then(res => res.data); };


//教师列表
export const getTeacherList = params => { return axios.get(http_builder_url(`${base}/adminteacheruser/TeacherInfo`, params)).then(res => res.data); };

//工资列表
export const salaryList = params => { return axios.get(http_builder_url(`${base}/salary/SchoolTeacherSalaryInfo`, params)).then(res => res.data); };




//基金
export const fundTypeList = params => { return axios.get(http_builder_url(`${base}/adminfund/FundNameType`, params)).then(res => res.data); };

export const teacherFundList = params => { return axios.get(http_builder_url(`${base}/adminteacheruser/TeacherFundInfo`, params)).then(res => res.data); };

export const fundList = params => { return axios.get(http_builder_url(`${base}/adminfund/Fund`, params)).then(res => res.data); };

export const buyerList = params => { return axios.get(http_builder_url(`${base}/adminfund/BuyFundInfo`, params)).then(res => res.data); };



//school
export const getSchoolList = params => { return axios.get(http_builder_url(`${base}/adminschool/AdminSchool`, params)).then(res => res.data); };

export const addSchool = params => { return axios.put(`${base}/adminschool/AdminSchool`, qs.stringify(params)).then(res => res.data); };


