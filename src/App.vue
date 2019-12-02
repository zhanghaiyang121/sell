<template>
  <div id="app">
    <commonHeader @showdetail="showdetail" :seller="seller"/>
    <transition name="fade">
          <headerDetail @hide="hide" :seller="seller" v-show="show"/>
    </transition>
    <router-view/>
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
            show:false
        }
    },
  mounted(){
      this.getShopInfo()
  },
  methods:{
      async getShopInfo(){
          const result=await reqShopInfo()
          this.seller=result.data
      },
      showdetail(){
          this.show=true
      },
      hide(){
        console.log(1)
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
.fade-enter-active, .fade-leave-active
      transition: opacity .5s; 
.fade-enter, .fade-leave-to 
    opacity: 0;
</style>
