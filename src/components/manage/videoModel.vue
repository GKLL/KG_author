/**
*  @description： 作者端内容管理-视频管理
*  @author： 杨玉梅
*  @data:  2018.6.2
*/
<template>
    <div class="videoModel">
        <div class="menu">
            <el-radio-group v-model="radio3" @change="radioChange">
                <el-radio label="全部"></el-radio>
                <el-radio label="已发布"></el-radio>
                <el-radio label="审核中"></el-radio>
                <el-radio label="未通过"></el-radio>
                <el-radio label="草稿"></el-radio>
            </el-radio-group>
        </div>
        <div class="content" v-for="(item, index) in videoData.data" :key="index">
            <p @click="toArtcleDetail(item)">{{item.articleTitle}}</p>
            <p>发布于 <span>{{item.showTime}}</span></p>
            <p style="padding-left:180px">
                <span class="yesEdit"  @click="edit(item.articleId)" v-if="item.publishStatus == 4 || item.publishStatus == 5 || item.publishStatus == 3"><i class="iconfont icon-bianji" ></i>编辑</span>
                <span  v-if="item.publishStatus == 1 || item.publishStatus == 2"><i class="disabled iconfont icon-bianji" ></i>编辑</span>
                <span class="yesDel" @click="remove(item.articleId, index)"  v-if="item.publishStatus == 4 || item.publishStatus == 5 || item.publishStatus == 3 || item.publishStatus == 1"><i class="iconfont icon-shanchu" ></i>删除</span>
                <!-- 不可点击 -->

                <span  class="noDel" v-if="item.publishStatus == 2"><i class="disabled iconfont icon-shanchu" ></i>删除</span>
                <span v-if="item.displayStatus == 3" class="fl pl180">被推荐</span><span v-if="item.haveExtra" class="fl">获得额外奖励</span>
            </p>
            <p v-if="item.publishBonusStatus == 0" class="frozone">发视频奖励被冻结<span v-if="item.freezeReason">，原因：{{item.freezeReason}}.</span></p>
            <p style="color: #FC5A5D" v-if="item.publishStatus == 3">视频审核不通过<span v-if="item.refuseReason">，原因：{{item.refuseReason}}</span></p>
            <div class="contentImg">
                <img :src="item.articleImage" @click="toArtcleDetail(item)"/>
                <span class="icon"><i class="iconfont icon-play"></i></span>
            </div>
            <i class="status" v-if="item.publishStatus == 1">已通过</i>
            <i class="status checking" v-if="item.publishStatus == 2">审核中</i>
            <i class="status refuse" v-if="item.publishStatus == 3">未通过</i>
            <i class="status draft" v-if="item.publishStatus == 4 || item.publishStatus == 5">草稿</i>
        </div>
        <div class="no-list"  v-if="videoData.totalNumber == 0">
        <div class="no-list-img">
        </div>
        <div class="no-list-text">
          暂无数据
        </div>
      </div>
       <!-- <div v-if="videoData.totalNumber == 0" class="emptyBox">

        </div>-->
        <el-pagination
        :page-size="params.pageSize"
        :current-page="params.currentPage"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="videoData.totalNumber">
        </el-pagination>
    </div>
</template>
<script>
import C from "./../../assets/js/config.js"
export default {
  data() {
    return {
      radio3: "全部",
      params: {
        currentPage: 1,
        pageSize: 10,
        type: 2,
        status: 0
      },
      videoData: {}
    };
  },
  methods: {
    edit(id) {
      this.$router.push('/editorVideo?id='+id)
    },
    toArtcleDetail(item) {
      if(item.publishStatus ==1) {
        window.open(C.mainNameHost+'/video/'+item.articleId)
      }else {
        window.open('/author/#/videoPreView?id='+item.articleId)
      }
    },
    remove(id, index) {
      let vm = this;
      this.ajax({
        type: "post",
        url: "/release/updateArticle",
        data: { articleId: id },
        success: function(data) {
          if (data.code == 10000) {
            vm.$message({
              showClose: false,
              duration: 2000,
              message: '删除视频成功'
            });
            setTimeout(function () {
              vm.videoData.data.splice(index, 1)
            }, 2100)
          }
        }
      });
    },
    radioChange(e) {
      switch (this.radio3) {
        case "全部":
          this.params.status = 0;
          break;
        case "已发布":
          this.params.status = 1;
          break;
        case "审核中":
          this.params.status = 2;
          break;
        case "未通过":
          this.params.status = 3;
          break;
        case "草稿":
          this.params.status = 4;
          break;
      }
      this.params.currentPage = 1;
      this.getVideoLists();
    },
    pageChange(e) {
      this.params.currentPage = e;
      this.getArticleLists();
    },
    getVideoLists() {
      var vm = this;
      vm.ajax({
        type: "POST",
        url: "/manage/getUserArticle",
        data: this.params,
        success: function(data) {
            if(data.code == 10000) {
                vm.videoData = data.responseBody;
                vm.videoData.data.forEach(element => {
                    var showTime = vm.dateFormat(element.createDate);
                    element.showTime = showTime;
                    if(element.articleImage == null || element.articleImage.length == 0) { // 没有返回图片
                        element.articleImage ='https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/img/articleDefaut.png'
                    }
                    else {element.articleImage =  C.imgHost + element.articleImage}
                });
            }
        }
      });
    }
  },
  created() {
    this.getVideoLists();
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 40px;
}
.videoModel {
  padding-left: 29px;
  font-family: "MicrosoftYaHei";
  border-radius: 10px;
  // box-shadow:0px 20px 10px rgba(183,182,182,0.1);
  .menu {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .content {
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    position: relative;
    padding-bottom: 18px;
    padding-top: 25px;
    .contentImg {
      img {
        width: 150px;
        height: 100px;
      }
      position: absolute;
      top: 25px;
      left: 0;
      .icon {
        position: absolute;
        top: 33px;
        left: 58px;
        display: inline-block;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: #2382ea;
        text-align: center;
        .iconfont {
          font-size: 14px;
          color: #fff;
          line-height: 34px;
        }
      }
    }
    p {
      &:first-child {
        padding-left: 180px;
        color: #333333;
        font-size: 16px;
        // margin-top: 25px;
        margin-bottom: 12px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 650px;
        &:hover {
          color: #2382ea;
          cursor: pointer;
        }
      }
      &:nth-child(2) {
        padding-left: 180px;
        font-size: 12px;
        color: rgba(155, 155, 155, 1);
      }
      &:nth-child(3) {
        margin-top: 30px;
        text-align: right;
        font-size: 14px;
        color: rgba(225, 224, 225, 1);
        margin-bottom: 14px;
        .yesEdit{
          color: #2382ea;
          cursor: pointer;
          .iconfont {
            margin-right: 6px;
          }
        }
        .noDel{
          margin-left: 19px;
        }
        .yesDel{
          margin-left: 19px;
          .iconfont {
            margin-right: 6px;
          }
          color: #fc5a5d;
          cursor: pointer;
        }
        span{
          cursor: pointer;
        }
      }
      .fl {
        float: left;
        color: #2382ea;
      }
      .pl180 {
        // padding-left: 180px;
        padding-right: 10px;
      }
    .disabled{
      color: #e1e0e1;
      cursor: pointer;
      margin-right: 6px;
    }
    }
    .frozone {
      font-size: 14px;
      color: #fc5a5d;
    }
    .status {
      font-size: 12px;
      position: absolute;
      top: 27px;
      right: 0;
      color: #2382ea;
    }
    .checking {
      color: #ffc682;
    }
    .draft {
      color: #bcbcbc;
    }
    .refuse {
      color: #fc5a5d;
    }
    .actions {
      display: inline-block;
      background: url("/static/svg/edit.svg");
      fill: #2382ea;
      width: 16px;
      height: 16px;
      &:hover {
        fill: #2382ea;
      }
    }
  }
  .emptyBox{
      height: 157px;
      width: 151px;
      background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/dataNull.png');
      background-size: 100% 100%;
  }
  .no-list{
    padding: 152px 0px 230px 0px;
    font-size: 14px;
    font-family: 'MicrosoftYaHei';
    color: #333333;
    .no-list-img{
      height: 157px;
      width: 151px;
      margin: 0 auto;
      background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/dataNull.png");
      background-size: 100% 100%;
    }
    .no-list-text{
      text-align: center;
      padding-top:67px ;
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
    }
  }
}
</style>
<style lang="less">
.videoModel {
  border-radius: 10px;
  // box-shadow:0px 20px 10px rgba(183,182,182,0.1);
  padding-top: 26px;
  .menu {
    .el-radio__input {
      .el-radio__inner {
        display: none;
      }
    }
    .el-radio-group {
      .is-checked {
        .el-radio__label {
          background-color: #2382ea;
          color: #fff;
          padding: 10px 11px;
          display: inline-block;
          height: 22px;
          border-radius: 11px;
          text-align: center;
          line-height: 2px;
        }
      }
    }
  }
}
.el-pagination {
  float: right;
}
</style>
