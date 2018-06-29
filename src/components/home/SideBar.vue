/**
*  @description： 作者端左侧栏
*  @author： zhangchenle
*  @data:  2018.6.1
*/
<template>
  <div class="sidebar">
    <div class="menu" @click="removelocalStorage">
      <div v-for="(item, index) in menuList" :key="'menu' + index">
        <router-link v-if="item.path" :to="item.path">
          <div class="item item-title" :class="'iconfont ' + item.icon">
            <span>{{item.title}}</span>
          </div>
        </router-link>
        <div v-else class="item item-title" :class="'iconfont ' + item.icon">
          <span>{{item.title}}</span>
        </div>
        <div v-for="(child, index) in item.children" :key="'child' + index">
          <router-link :to="child.path">
            <div class="item item-sub">
              <span>{{child.title}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SideBar',
  data(){
    return {
      // 菜单栏配置项
      menuList: [
        {
          title: '首页', // 菜单标题
          path: "/", // 菜单跳转的路由
          icon: "icon-shouye",// 菜单图标
          children: [] // 二级菜单
        },
        {
          title: '发布',
          icon: "icon-fabu",
          children: [
            {
              title: '发布文章',
              path: "/publishArticle"
            },
            {
              title: '发布视频',
              path: "/publishVideo"
            }
          ]
        },
        {
          title: '管理',
          icon: "icon-icon-system-fn-administration",
          children: [
            {
              title: '内容管理',
              path: "/contentManage"
            },
            {
              title: '评论管理',
              path: "/commentMange"
            }
          ]
        },
        {
          title: '数据',
          icon: "icon-shuju",
          children: [
            {
              title: '粉丝数据',
              path: "/fansData"
            }
          ]
        },
        {
          title: '收益',
          icon: "icon-shouyi",
          children: [
            {
              title: '收益管理',
              path: "/income"
            }
          ]
        },
        {
          title: '设置',
          icon: "icon-shezhi",
          children: [
            {
              title: '专栏设置',
              path: "/setting"
            }
          ]
        }
      ]
    }
  },
  methods: {
    removelocalStorage(){
      localStorage.setItem('kg_author_commentMange', '')
      localStorage.setItem('kg_author_contentMange', '')
      localStorage.setItem('kg_author_setting', '')
      localStorage.setItem('kg_author_fansData', '')
      localStorage.setItem('kg_author_incomeManager', '')
    }
  }
}
</script>

<style lang="less" scoped>
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    width: 194px;
    .menu {
      margin: 36px 4px 0 4px;
      padding-top: 36px;
      border-radius: 10px;
      border: 0;
      box-shadow: 0px 2px 4px rgba(183,182,182,0.1), 2px 0px 4px rgba(183,182,182,0.1), 0px -2px 4px rgba(183,182,182,0.1), -2px 0px 4px rgba(183,182,182,0.1);
      a {
        &:hover {
          text-decoration: none;
        }
      }
      .item, .item-title {
        position: relative;
        height: 42px;
        line-height: 42px;
        text-align: left;
        color: #333333;
        padding-left: 65px!important;
        span {
          font-size: 14px;
        }
      }
      .item-title {
        color: #666666;
        &::before {
          position: absolute;
          top: 0px;
          left: 30px;
        }
      }
      .item-sub:hover {
        color: #2382EA!important;
      }
      .icon-shouye {
        span:hover {
          color: #2382EA;
        }
        &::before {
          left: 27px;
          font-size: 22px;
          color: #666666;
        }
      }
      .router-link-exact-active .item {
        color: #2382EA!important;
      }
    }
  }

</style>
