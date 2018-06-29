/**
*  @description： 业务配置
*  @author： zhangchenle
*  @data:  2018.5.31
*/

// 图片域名地址配置
let imgUrl = {
  development: 'https://kgcom.oss-cn-shenzhen.aliyuncs.com/',
  testing: 'https://kgcom.oss-cn-shenzhen.aliyuncs.com/',
  production: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/'
}
//视频域名配置
let videoUrl = {
  development: 'https://kgvideo.oss-cn-shenzhen.aliyuncs.com/',
  testing: 'https://kgvideo.oss-cn-shenzhen.aliyuncs.com/',
  production: 'https://kgvideo.oss-cn-shenzhen.aliyuncs.com/'
}
// 接口地址配置
let apiUrl = {
  development: 'https://devmp.kg.com/authorapi',
  // development: 'https://testauthorapi.kg.com',//王洋
  // development: 'http://172.16.1.70:8089', // 陈相明
  testing: 'https://testauthorapi.kg.com',
  production: 'https://authorapi.kg.com'
}
// 用户默认头像
let defaultPhotoUrl = {
  development: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/author_default_avatar.png',
  testing: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/author_default_avatar.png',
  production: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/author_default_avatar.png'
}
// 图片上传地址
let uploadImg = {
  development: 'https://devmp.kg.com/authorapi/common/image/upload',
  testing: 'https://testauthorapi.kg.com/common/image/upload',
  production: 'https://authorapi.kg.com/common/image/upload'
}
// 视频上传地址
let uploadVideo = {
  development: 'https://devmp.kg.com/authorapi/common/video/upload',
  //development: 'http://172.16.2.78:8080/common/video/upload',
  testing: 'https://testauthorapi.kg.com/common/video/upload',
  production: 'https://authorapi.kg.com/common/video/upload'
}
// 链接到主站的地址
let mainName = {
  development: 'https://dev.kg.com',
  testing: 'https://t.kg.com',
  production: 'https://www.kg.com',
}
export default {
  imgHost: imgUrl[process.env.NODE_ENV],
  videoHost: videoUrl[process.env.NODE_ENV],
  apiHost: apiUrl[process.env.NODE_ENV],
  defaultPhotoUrl: defaultPhotoUrl[process.env.NODE_ENV],
  uploadImgUrlHost: uploadImg[process.env.NODE_ENV],
  uploadVideoUrlHost: uploadVideo[process.env.NODE_ENV],
  mainNameHost:mainName[process.env.NODE_ENV]
}
