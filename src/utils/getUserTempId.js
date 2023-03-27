import { v4 as uuidv4 } from 'uuid';
export const getUserTempId = () => {
  //1.先从本地存储当中获取一下
  let userTempId = window.localStorage.getItem('userTempId')
  //2.如果没有的话，要先生成一份
  if (!getUserTempId) {
    window.localStorage.setItem('userTempId',uuidv4())
  }
  return userTempId
}