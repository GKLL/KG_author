/**
 * @description： 全局状态数据修改方法（异步）
 * @author: zhangchenle
 * @date: 2018-05-31
 */
import Vue from 'vue'
import router from '@/router'

export default {
  // 退出登录
  logout ({ commit }) {
    commit('SET_USER_INFO', null) // 清空用户信息
    commit('SET_TOKEN', '') // 清空token
    localStorage.setItem('kg_user_token', '') // 清除token缓存
    location.href = '/' // 跳转到登录页面
  },
  // 账号密码登录
  accountLogin ({ commit }, params) {
    let from = params.from;
    let data = {
      userMobile: params.userMobile,
      userPassword: params.userPassword,
    }
    let loading = params.that.loading;
    loading = true; //加载。。。
    
    Vue.prototype.ajax({
      url: '/login/checkLogin',
      data,
      success: data => {
        if (data.code === '10000') {
          loading = false; //关闭加载。。。
          let token = data.responseBody.data.token
          let userInfo = data.responseBody.data
          
          commit('SET_TOKEN', token) // 设置token
          localStorage.setItem('kg_user_token', token) // 清除token缓存

          Vue.prototype.ajax({
            url: '/login/getUserInfo',
            success (data) {
              if (data.code === '10000') {
                let userInfo = data.responseBody
                userInfo.avatar = data.responseBody.inmagelink
                commit('SET_USER_INFO', userInfo) // 设置用户信息
                if (userInfo.userRole === 1) {
                  // 普通用户,访问非申请专栏相关页面，跳转到申请专栏引导
                  if (from === 'register') {
                    router.push('/apply') // 注册成功,普通用户进入专栏申请页
                  } else {
                    router.push('/guide') // 账密登录成功,普通用户进入专栏导航页
                  }
                } else {
                  // 专栏用户，非home子页面跳转到home主页,home页面不拦截
                    router.push('/')
                }
              } else {
                // 查询失败跳转登录页面
                  router.push('/login')
              }
            }
          })
        } else {
          loading = false; //关闭加载。。。
          // 账密登录失败,提示错误信息
          Vue.prototype.$message({
            type: 'error',
            message: data.message
          })
        }
      }
    })
  },
  // 短信登录
  mobileLogin ({ commit }, data) {
    Vue.prototype.ajax({
      url: '/login/mobileLogin',
      data,
      success: data => {
        if (data.code === '10000') {
          let token = data.responseBody.data.token
          commit('SET_USER_INFO', data.responseBody.data) // 设置用户信息
          commit('SET_TOKEN', token) // 设置token
          localStorage.setItem('kg_user_token', token) // 清除token缓存
          router.push('/') // 账密登录成功，进入home页
        } else {
          // 短信登录失败,提示错误信息
          Vue.prototype.$message({
            title: '错误',
            message: data.message,
            type: 'error'
          })
        }
      }
    })
  }
}
