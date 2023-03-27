//用它来判定添加的数量是否符合规则
//  要求： 只能是数字 不能是其它符号 再一个最大值不超过200 最小值是1
//^以什么开头，多个开头规则写成数组[1-A-a-@]意味可以以1，A，a任意一个开头，\d为必须是数字{6}花括号写的是位数
//写6位$是严格模式
export const skuNumReg = /^[1-9]\d{0,2}$/
//验证手机号
export const phoneNumderReg = /^1[3-578]\d{9}$/;
//验证码规则
export const codeNumberReg = /^\d{6}$/;
//登录密码验证规则
export const passWordNumberReg=/^[A-Za-z0-9_%#@.]{6,8}$/