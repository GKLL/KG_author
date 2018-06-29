/**
 * @description： 全局状态数据（组件私有数据不要存储在vux里面）
 * @author: zhangchenle
 * @date: 2018-05-31
 */
let token = localStorage.getItem('kg_user_token') || ''
export default {
  userInfo: null, // 用户信息
  token: token // token
}
