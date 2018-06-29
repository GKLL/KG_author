/**
*  @description： 作者端-个人信息-更改头像弹窗
*  @author： 杨玉梅
*  @data:  2018.6.1
*/
<template>
    <div class="changeAvatar">
        <el-dialog
                title="更改头像"
                class = 'authorAvatarModal'
                :visible="visible"
                width="690px"
                height = "584px"
                :before-close = "closeModal"
                center>
               <!-- <div class = 'uploadbtn'>
                  <input id = 'uploadInput' class = 'cursorPointer' type = 'file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
                     @change = "coverImgChang($event)"
                     />
                  <button class = 'primay-btn cursorPointer'>上传图片</button>
               </div> -->

                <div class = 'previewImgContainer' v-if ="!vIf">
                      <img v-if = " initSrc != null && fromthird == null" :src = " initSrc" class = 'previewImg' />
                      <!-- <img v-if = "initSrc == null && fromthird == null" src = "../assets/img/article.png" class = 'previewImg' />
                      <img v-if = "initSrc != null && fromthird != null" :src = "initSrc" class = 'previewImg' /> -->
                </div>
               <div  class="wrapper" v-if = "vIf">
                        <vue-cropper
                          class = 'corpper checkedImg'
                          ref="cropper"
                          :img="checkedImg"
                          :canMove="false"
                          :outputSize="option.size"
                          :outputType="option.outputType"
                          :autoCrop="option.autoCrop"
                          :autoCropWidth="option.autoCropWidth"
                          :autoCropHeight="option.autoCropHeight"
                          :fixedNumber="option.fixedNumber"
                          :info="true"
                          :canScale = 'false'
                          :fixed = "true"
                          @realTime="realTime"
                          :full="option.full"
                        ></vue-cropper>
              </div>
              <div class = 'previewContainer' v-if = "vIf">
                    <p>预览</p>
                    <img class = "img120" :src = "previews"/>
                    <p>90px*90px</p>
                    <img class = "img70 " :src = "previews"/>
                    <p>50px*50px</p>
                    <img class = "img30 " :src = "previews"/>
                    <p>30px*30px</p>
              </div>
              <div class = 'previewContainer' v-if ="!vIf && initSrc !=null && fromthird == null">
                    <p>预览</p>
                    <img class = "img120" :src = " initSrc"/>
                    <p>90px*90px</p>
                    <img class = "img70 " :src = " initSrc"/>
                    <p>50px*50px</p>
                    <img class = "img30 " :src = "initSrc"/>
                    <p>30px*30px</p>
              </div>
              <div class = 'previewContainer' v-if = '!vIf && initSrc == null'>
                    <p>预览</p>
                    <!-- <img class = "img120" src = "../assets/img/avatar.png"/> -->
                    <p>90px*90px</p>
                    <!-- <img class = "img70 " src = "../assets/img/avatar.png"/> -->
                    <p>50px*50px</p>
                    <!-- <img class = "img30 " src = "../assets/img/avatar.png"/> -->
                    <p>30px*30px</p>
              </div>
              <div class = 'previewContainer' v-if = '!vIf && initSrc != null && fromthird != null'>
                    <p>预览</p>
                    <img class = "img120" :src = "initSrc"/>
                    <p>90px*90px</p>
                    <img class = "img70 " :src = "initSrc"/>
                    <p>50px*50px</p>
                    <img class = "img30 " :src = "initSrc"/>
                    <p>30px*30px</p>
              </div>
              <span class ='warningTil'>不超过2M，支持jpg、png、jpeg等格式</span>
               <div class = 'uploadbtn'>
                  <input id = 'uploadInput' class = 'cursorPointer' type = 'file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
                     @change = "coverImgChang($event)"
                     />
                   <el-button class = 'primay-btn cursorPointer'>上传图片</el-button>
               </div>
               <!-- <button class = 'primay-btn cursorPointer'>上传图片</button> -->
              <div class = 'submit_btn'>
                  <el-button   @click="onSubmit" type="primary" :loading = "loading" class=" btnModal2">确认</el-button>
                  <el-button   @click="closeModal"  class=" btnModal" >取消</el-button>
              </div>
        </el-dialog>
    </div>
</template>
<script>
import C from './../../assets/js/config.js';
import axios from 'axios';
import JQ from 'jquery';
import vueCropper from 'vue-cropper';
export default {
  data() {
    return {
      option: {
        size: 1,
        outputType: 'png',
        full: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 120,
        autoCropHeight: 120,
        fixedNumber: [1, 1]
      },
      blobData: '',
      previews: '',
      checkedImg: '',
      vIf: false,
      loading: false,
      base64data: ''
    };
  },
  components: { vueCropper },
  props: {
    visible: {},
    cancel: {
      type: Function,
      default: function() {}
    },
    initSrc: {},
    roleId: {},
    fromthird: {}
  },
  //已成功挂载，相当ready()
  //相关操作事件
  methods: {
    closeModal() {
      this.cancel();
      this.loading = false;
    },
    onSubmit() {
      const vm = this;
      // return;
      this.base64data = this.base64data.split('base64,')[1];
      if (this.base64data == '') {
        this.loading = false;
        this.cancel();
        return;
      }
      this.ajax({
        url: '/common/base64/upload',
        type: 'post',
        data: { base64Str: vm.base64data },
        success: function(data) {
          if (data.code == 10000) {
            vm.visible = false;
            vm.callData = data.responseBody[0];
            // 文件上传成功之后，调更改头像接口
            vm.ajax({
              type: 'post',
              url: '/set/updateColumnAvatar',
              data: { imgUrl: vm.callData.filePath },
              success: function(data) {
                if (data.code == 10000) {
                  vm.$message({
                    message: '头像修改成功',
                    type: 'success'
                  });
                  vm.$emit('imgUpload', vm.callData, vm.previews);
                  vm.ajax({
                    url: '/login/getUserInfo',
                    success (data) {
                      if (data.code === '10000') {
                        let userInfo = data.responseBody
                        userInfo.avatar = data.responseBody.inmagelink
                        vm.$store.commit('SET_USER_INFO', userInfo) // 设置用户信息

                      }
                    }
                  })
                }
              }
            });
          }
          else {
             vm.$message.error(data.message);
          }
        }
      });
      // let formData = new FormData();
      // formData.append('name', 'file');
      // formData.append('file', vm.blobData);
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // };
      // this.loading = true;
      // axios.post(C.uploadImgUrlHost+'/common/image/upload', formData, config).then(function(res) {
      //   vm.loading = false;
      //   console.log('上传成功');
      //   if (res.code === 10000) {
      //     let resData = res.data[0];
      //     vm.ajax({
      //       type: 'post',
      //       url: '/common/image/upload',
      //       data: {},
      //       success: function(data) {
      //         if (data.code == 10000) {
      //           vm.$message({
      //             message: '提交成功',
      //             type: 'success'
      //           });
      //           location.reload();
      //         } else {
      //           vm.$message({
      //             message: data.message,
      //             type: 'error'
      //           });
      //         }
      //       }
      //     });
      //   }
      // });
    },
    handleAvatarSuccess1(res, file) {
      this.ruleForm.idcard1 = res.data[0].filePath;
      this.imageUrl.idcard1 = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let isTrue = false;
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        isTrue = true;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isTrue) {
        this.$message.error('图片格式不对!');
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
      }
      return isTrue && isLt2M;
    },
    realTime(data) {
      this.previewsHandle();
    },
    previewsHandle() {
      const vm = this;
      this.$refs.cropper.getCropBlob(data => {
        vm.blobData = data;
      });
      this.$refs.cropper.getCropData(data => {
        this.base64data = data;
        this.previews = data;
      });
    },
    coverImgChang(e) {
      const vm = this;
      var fileList = e.target.files[0];
      //现在图片文件大小
      var imgSize = fileList.size;
      const type = fileList.type;

      //将图片文件转换为base64
      // var coverImg = this.coverImg
      var reader = new FileReader();
      if (
        imgSize > 2 * 1024 * 1024 ||
        (type != 'image/png' && type != 'image/jpeg')
      ) {
        this.$message({
          type: 'warning',
          message: '封面图不超过2M，仅支持jpg、png、jpeg格式'
        });
        var jqObj = JQ('#uploadInput');
        jqObj.val('');
        var domObj = jqObj[0];
        domObj.outerHTML = domObj.outerHTML;
        var newJqObj = jqObj.clone();
        jqObj.before(newJqObj);
        jqObj.remove();
        JQ('#uploadInput')
          .unbind()
          .change(function(e) {
            //alert('ab');
            vm.coverImgChang(e);
          });
        return;
      }
      reader.onload = function(e) {
        vm.checkedImg = reader.result;
      };
      reader.readAsDataURL(fileList);
      // this.$refs.cropper.reload()
      this.vIf = true;
    }
  }
};
</script>

<style lang="less" scoped>
.changeAvatar {
  .el-dialog--center .el-dialog__body,
  .el-dialog__body {
    padding: 0;
  }
  .primay-btn {
    border: none;
    background: #fff;
    color: #2382ea;
    font-size: 14px;
  }
  .wrapper {
    width: 500px;
    height: 300px;
    display: inline-block;
    float: left;
    margin-right: 50px;
  }
  .previewContainer {
    position: absolute;
    right: 25px;
    height: 300px;
    width: 110px;
    background: #dfdfdf;
    text-align: center;
  }
  .previewContainer p {
    margin: 4px 0px;
    font-size: 12px;
  }
  .previewContainer p:nth-child(1) {
    font-size: 16px;
  }
  .img120,
  .img70,
  .img30 {
    display: block;
    border-radius: 50%;
    margin: 0px auto;
  }
  .img120 {
    width: 90px;
    height: 90px;
  }
  .img70 {
    width: 50px;
    height: 50px;
  }
  .img30 {
    width: 30px;
    height: 30px;
  }
  .warningTil {
    display: block;
    margin: 8px 0px;
    margin-top: 310px;
  }
  .uploadbtn {
    margin: 16px 0;
  }
  .uploadbtn input {
    opacity: 0;
    position: absolute;
    z-index: 2;
    width: 70px;
  }
  .previewImgContainer {
    margin: 0 auto;
    position: relative;
    float: left;
    display: inline-block;
    width: 500px;
    height: 300px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
    img {
      width: 350px;
      height: 300px;
    }
  }
  .previewImg {
    display: block;
    position: absolute;
    height: 100%;
    top: 0px;
    left: -110px;
    right: 0px;
    bottom: 0px;
    margin: auto;
  }
  .submit_btn {
    // border-top:  1px solid #EBEBEB;
    /*padding-top: 36px;*/
    text-align: center;
    .el-button {
      width: 150px;
      height: 40px;
    }
    .el-button--primary {
      background-color: rgba(79, 159, 246, 1);
      border-color: rgba(79, 159, 246, 1);
      &:hover {
        background-color: rgba(35, 130, 234, 1);
        border-color: rgba(35, 130, 234, 1);
      }
    }
    .el-button + .el-button {
      margin-left: 30px;
    }
  }
}
</style>
<style lang="less">
.authorAvatarModal {
  .el-dialog--center {
    height: 584px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ebebeb;
    padding: 17px;
    font-size: 18px;
  }
  .el-dialog__body {
    padding-top: 36px;
    padding-bottom: 0px;
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
