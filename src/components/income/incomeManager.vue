/**
*  @description： 作者端收益管理
*  @author： 杨玉梅
*  @data:  2018.5.30
*/
<template>
    <div class="incomeManager">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收益分析" name="incomeAnalyze"><income-model /></el-tab-pane>
            <el-tab-pane label="文章分析" name="articleAnalyze"><article-model/></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import incomeModel from './incomeModel.vue'
import articleModel from './articleModel.vue'
export default {
  components: {incomeModel, articleModel},
  data () {
    return {
      activeName: 'incomeAnalyze'
    }
  },
  methods: {
    /* tag切换 */
    handleClick (e) {
      localStorage.setItem('kg_author_incomeManager', e.name)
    }
  },
  mounted () {
    var activeName = localStorage.getItem('kg_author_incomeManager')
    if (activeName) {
      this.activeName = activeName
    }
  }
}
</script>
