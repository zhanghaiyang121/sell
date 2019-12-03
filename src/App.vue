<template>
  <div id="app">
    <commonHeader @showdetail="showdetail" :seller="seller"/>
    <div class="tabbar">
      <div :class="{highlight:'/goods'==$route.path}" @click="selectTab(1,'/goods')">商品</div>
      <div :class="{highlight:'/rating'==$route.path}" @click="selectTab(2,'/rating')">评论</div>
      <div :class="{highlight:'/seller'==$route.path}" @click="selectTab(3,'/seller')">商家</div>
    </div>
    <transition name="fade">
          <headerDetail @hide="hide" :seller="seller" v-show="show"/>
    </transition>
    <transition name="component-fade" mode="out-in">
      <!-- <keep-alive> -->
          <router-view/>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import commonHeader from "./components/commonHeader/commonHeader"
import headerDetail from "./components/headerDetail/headerDetail"
import {reqShopInfo} from "./api"
export default {
  name: 'App',
  components:{
        commonHeader,
        headerDetail
    },
  data(){
        return{
            seller:{},
            show:false,
            currentindex:1
        }
    },
  mounted(){
      this.getShopInfo()
  },
  methods:{
      selectTab(index,path){
        this.currentindex=index
        this.$router.push(path)
      },
      async getShopInfo(){
          const result=await reqShopInfo()
          this.seller=result.data
      },
      showdetail(){
          this.show=true
      },
      hide(){
          this.show=false
      }
  }
  
}
</script>

<style lang="stylus">
html, body
  height: 100%
  overflow: hidden
#app
  width 100%
  height 100%
  position relative
  .tabbar
    height 40px
    display flex
    width 100%
    align-items center
    border-bottom 1px solid rgba(7,17,27,0.1)
    &>div
      flex 1
      text-align center
      &.highlight
        color #f01414
.fade-enter-active, .fade-leave-active
    transition: opacity .5s
.fade-enter, .fade-leave-to 
    opacity: 0
.component-fade-enter-active, .component-fade-leave-active {
  transition: all .3s ease;
}
</style>
