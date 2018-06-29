/**
*  @description： 作者端-内容管理-评论管理
*  @author： 杨玉梅
*  @data:  2018.5.30
*/
<template>
    <div class="comments">
        <div class="comment" v-for="(item, index) in data.data" :key="index">
            <p>
                <span>{{item.commentUserName}}</span>
                <span>评论了你的文章</span>
                <span @click="toArtcleDetail(item.articleId)">《{{item.articleTitle}}》</span>
            </p>
            <p>{{item.commentDesc}}</p>
            <p>{{item.showTime}}</p>
            <img :src="item.commentUserAvatar" class="userIcon">
        </div>
        <div class="emptyBox" v-if="data.totalNumber === 0"></div>
        <el-pagination
        :page-size="params.pageSize"
        @current-change="pageChange"
        layout="prev, pager, next"
        :total="data.totalNumber">
        </el-pagination>
    </div>
</template>
<script>
import C from "./../../assets/js/config.js"
export default {
  data() {
    return {
      data: {
        pageSize: 10,
        totalNumber: 9
      },
      params: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    pageChange(e) {
      this.params.currentPage =e;
      this.getComments()
    },
    //跳转到文章
    toArtcleDetail(id) {
     window.open(C.mainNameHost+'/article/'+id)
    },
    getComments() {
      var vm = this;
      this.ajax({
        type: "post",
        data: this.params,
        url: "/manage/getArticleCommentsForAuthor",
        success: function(data) {
          if (data.code == 10000) {
            vm.data = data.responseBody;
            vm.data.data.forEach(element => {
              var showTime = vm.dateFormat(element.commentDate);
              element.showTime = showTime;
              if (element.commentUserAvatar) {
                if (element.commentUserAvatar.indexOf("http") == -1) {
                  element.commentUserAvatar =
                    C.imgHost + element.commentUserAvatar;
                } else if (element.commentUserAvatar.indexOf("http") != -1) {
                  console.log("C.imgUrl.development1111", C.imgHost);
                  return;
                }
              } else {
                element.commentUserAvatar =
                  "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/author_default_avatar.png";
              }
            });
          }
        }
      });
    }
  },
  created() {
    this.getComments();
  }
};
</script>

<style lang="less" scoped>
.comments {
  font-family: "MicrosoftYaHei";
  padding-top: 8px;
  padding-left: 29px;
  text-align: left;
  .comment {
    padding: 30px 0 23px 76px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    position: relative;
    p {
      &:first-child {
        font-size: 14px;
        margin-bottom: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 72%;
        span {
          &:first-child {
            font-family: "MicrosoftYaHei-Bold";
            color: #333333;
            font-weight: bold;
          }
          &:nth-child(2) {
            color: #9b9b9b;
          }
          &:nth-child(3) {
            &:hover {
              cursor: pointer;
              color: #4f9ff6;
            }
          }
        }
      }
      &:nth-child(2) {
        font-size: 16px;
        color: #333333;
        margin-bottom: 24px;
      }
      &:nth-child(3) {
        font-size: 12px;
        color: #9b9b9b;
      }
    }
    .userIcon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      position: absolute;
      top: 24px;
      left: 0;
    }
  }
}
</style>
<style lang="less" scoped>
.comments {
  .el-pagination {
    float: right;
    margin-top: 40px;
  }
}
</style>

