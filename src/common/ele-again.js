/**
 * element组件二次封装
 */

import { MessageBox, Message } from 'element-ui'

export function eleCofirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    center: true,
  })
}


export function eleMessage(obj = {}) {
  return Message({
    message: obj.msg || "操作成功",
    type: obj.type || "success",
    duration: obj.duration || 1000
  })
}


