/**
*  @description： 作者端-内容管理-我的评论
*  @author： 杨玉梅
*  @data:  2018.5.30
*/
<template>
    <div class="mycomments">
        <div class="mycomment" v-for="(item, index) in data.data" :key="index">
            <p>{{item.commentDesc}}</p>
            <p @click="toArtcleDetail(item.articleId)">《{{item.articleTitle}}》</p>
            <p>
                <span>{{item.showTime}}</span>
                <!-- <span><i class="iconfont icon-if__QuestionMark_"></i></span> -->
                <span @click="deleteComments(item.commentId, index)"><i class="iconfont icon-shanchu"></i>删除</span>
                <span class="disBlock" v-show="!item.displayStatus"><i class="iconfont icon-if__QuestionMark_"></i>被隐藏<span class="disnone">也许是您的评论内容不太适合展示出来，如有疑问，请联系客服。</span> <div class="disnone triangle_border_down"></div></span>
            </p>
        </div>
        <div class="emptyBox" v-if="data.totalNumber === 0"></div>
        <el-pagination
        :page-size="data.pageSize"
        @current-change="pageChange"
        layout="prev, pager, next"
        :total="data.totalNumber">
        </el-pagination>
    </div>
</template>
<script>
import C from "./../../assets/js/config.js";
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
      this.params.currentPage = e;
      this.getMyComments();
    },
    //跳转到文章
    toArtcleDetail(id) {
     window.open(C.mainNameHost+'/article/'+id)
    },
    getMyComments() {
      var vm = this;
      this.ajax({
        type: "post",
        data: this.params,
        url: "/manage/getCommentAll",
        success: function(data) {
          if (data.code == 10000) {
            vm.data = data.responseBody;
            vm.data.data.forEach(element => {
              var showTime = vm.dateFormat(element.commentDate);
              element.showTime = showTime;
              if (element.commentUserAvatar) {
                if (element.commentUserAvatar.indexOf("http") == -1) {
                  console.log("C.imgUrl.development", C.imgHost);
                  element.commentUserAvatar =
                    C.imgHost + element.commentUserAvatar;
                } else if (element.commentUserAvatar.indexOf("http") != -1) {
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
    },
    deleteComments(id, index) {
      var vm = this;
      this.ajax({
        type: "post",
        data: { commentId: id },
        url: "/manage/deleteComment",
        success: function(data) {
          vm.$message({
            showClose: false,
            duration: 2000,
            message: "删除评论成功"
          });
          setTimeout(function() {
            vm.data.data.splice(index, 1);
          }, 2100);
        }
      });
    }
  },
  created() {
    this.getMyComments();
  }
};
</script>

<style lang="less" scoped>
.mycomments {
  padding-left: 30px;
  font-family: "MicrosoftYaHei";
  text-align: left;
  .mycomment {
    padding: 30px 0;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    p {
      &:first-child {
        font-size: 16px;
        color: #333;
        margin-bottom: 16px;
      }
      &:nth-child(2) {
        font-size: 14px;
        cursor: pointer;
        color: #2382ea;
        margin-bottom: 18px;
      }
      &:nth-child(3) {
        span {
          &:first-child {
            font-size: 12px;
            color: #9b9b9b;
          }
          &:nth-child(2) {
            font-size: 14px;
            color: #fc5a5d;
            cursor: pointer;
            float: right;
            .iconfont {
              margin-right: 6px;
            }
          }
          &:nth-child(3) {
            float: right;
            color: #9b9b9b;
            margin-right: 40px;
            position: relative;
            .iconfont {
              margin-right: 6px;
            }
            span {
              position: absolute;
              font-size: 12px;
              color: rgba(155, 155, 155, 1);
              display: inline-block;
              width: 234px;
              padding: 12px;
              // height: 64px;
              left: -75px;
              top: -65px;
              background-color: rgba(243, 243, 243, 1);
            }
          }
        }
      }
      .disnone {
        display: none !important;
      }
      .disBlock {
        &:hover {
          .disnone {
            display: block !important;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.mycomments {
  .el-pagination {
    float: right;
    margin-top: 40px;
  }
}
.triangle_border_down {
  width: 0;
  height: 0;
  border-width: 8px 8px 0;
  border-style: solid;
  border-color: rgba(243, 243, 243, 1) transparent transparent; /*灰 透明 透明 */
  position: absolute;
  top: -10px;
}
</style>

