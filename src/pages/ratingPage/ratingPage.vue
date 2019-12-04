<template>
  <div class="ratingPage">
      <div class="ratingPage_content">
        <div class="rating_header_wrapper">
          <div class="content">
            <div class="score_left">
              <div class="score">{{seller.score}}</div>
              <div class="score_type">综合评分</div>
              <div class="desc">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="star_info">
                <div class="service_star_wrapper">
                    <div class="service_star">服务态度</div>
                    <div class="star_wrapper"><star :score="seller.serviceScore" :size="15"/></div>
                    <div class="score">{{seller.serviceScore}}</div>
                </div>
                <div class="goods_star_wrapper">
                    <div class="goods_star">商品评分</div>
                    <div class="star_wrapper"><star :score="seller.foodScore" :size="15"/></div>
                    <div class="score">{{seller.foodScore}}</div>
                </div>
                <div class="arrive_time_wrapper">
                    <div class="arrive_time">送达时间</div>
                    <div class="time">{{seller.deliveryTime}}分钟</div>
                </div>
            </div>
          </div>
        </div>
        <div class="rating_tabs_wrapper">
          <div class="tabs_content">
              <div class="all" @click="slectRating('allRatings',1)" :class="{highlight:curretIndex==1}">全部{{allRatings.length}}</div>
              <div class="good" @click="slectRating('goodRatings',2)" :class="{highlight:curretIndex==2}">满意{{goodRatings.length}}</div>
              <div class="bad" @click="slectRating('badRatings',3)" :class="{highlight:curretIndex==3}">不满意{{badRatings.length}}</div>
          </div>
        </div>
        <div class="filter_rating" @click="filterShow=!filterShow">
          <i class="icon-check_circle" :class="{highlight:!filterShow}"></i>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="rating_list_wrapper">
            <div class="rating_item" v-for="(item,index) in ratings" :key="index" v-if="filterShow ? true:item.text!=''">
                <div class="avatar">
                  <img :src="item.avatar" width="28" height="28" alt="">
                </div>
                <div class="content">
                    <div class="user_wrapper">
                      <span class="user">{{item.username}}</span>
                      <span class="rating_time">{{item.rateTime}}</span>
                    </div>
                    <div class="star_wrapper">
                        <star :size="10" :score="item.score"/>
                    </div>
                    <div class="rate_text">
                        {{item.text}}
                    </div>
                    <div class="recommend" v-if="item.recommend.length>0">
                        <i class="icon-thumb_up"></i>
                        <span v-for="(recommenditem,rindex) in item.recommend" :key="rindex">{{recommenditem}}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {reqShopRatings,reqShopInfo} from "../../api/index"
import BScroll from "better-scroll"
import star from "../../components/star/star"
export default {
  components:{
    star
  },
  methods:{
    async getRatings(){
      const result=await reqShopRatings()
      this.ratings=result.data
      let goodRating=[]
      let badRating=[]
      let allRating=result.data
      for(let i=0;i<result.data.length;i++){
        if(result.data[i].rateType==0){
          goodRating.push(result.data[i])
        }else{
          badRating.push(result.data[i])
        }
      }
      this.goodRatings=goodRating
      this.badRatings=badRating
      this.allRatings=allRating
    },
    async getShopInfo(){
      const result=await reqShopInfo()
      this.seller=result.data
    },
    slectRating(type,index){
        this.ratings=this[type]
        this.curretIndex=index
    }
  },
  data(){
    return{
      ratings:[],
      allRatings:[],
      goodRatings:[],
      badRatings:[],
      seller:{},
      scroll:null,
      filterShow:true,
      curretIndex:1
    }
  },
  created(){
    this.getShopInfo()
    this.getRatings()
  },
  mounted(){
    this.$nextTick(()=>{
      this.scroll=new BScroll(".ratingPage",{
        click:true
      })
    })
  }
}
</script>

<style lang="stylus">
.ratingPage
    width 100%
    position absolute
    top 182px
    bottom 0px
    z-index 200
    overflow hidden
    .rating_header_wrapper
      border-bottom 1px solid rgba(7,17,27,0.1)
      .content
        display flex
        padding 18px 0
        .score_left
          width 137px
          border-right 1px solid #d9dde1
          margin-right 24px
          .score
            font-size 20px
            color rgb(255,153,0)
            text-align center
          .score_type 
            font-size 12px
            color rgb(7,17,27)
            text-align center
            margin-top 6px
          .desc
            font-size 10px
            text-align center
            color #999
            margin-top 6px
        .star_info
          flex 1
          &>div
            display flex
            &.service_star_wrapper
              margin-bottom 8px
              .service_star
                margin-right 12px
                font-size 12px
                line-height 15px
              .score
                margin-left 12px
                font-size 12px
                line-height 15px
                color rgb(255,153,0)
            &.goods_star_wrapper
              margin-bottom 8px
              .goods_star
                margin-right 12px
                font-size 12px
                line-height 15px
              .score
                margin-left 12px
                font-size 12px
                line-height 15px
                color rgb(255,153,0)
            &.arrive_time_wrapper
                .arrive_time
                  font-size 12px
                  margin-right 12px
                .time
                  color #999
                  font-size 12px
    .rating_tabs_wrapper
      padding 0 18px
      .tabs_content
        padding 18px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        &>div
          vertical-align top
          display inline-block
          margin-right 10px
        .all
          background rgba(0,160,220,0.2)
          font-size 12px
          color #666
          padding 8px 12px
          &.highlight
            background #00a0dc
            color #fff
        .good
          background rgba(0,160,220,0.2)
          font-size 12px
          color #666
          padding 8px 12px
          &.highlight
            background #00a0dc
            color #fff
        .bad
          background #ccc
          font-size 12px
          color #666
          padding 8px 12px
          &.highlight
            background #666
            color #fff
    .filter_rating
      display flex
      align-items center
      padding 12px 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .icon-check_circle
        font-size 24px
        margin-right 4px
        &.highlight
          color #00b43c
      &>.text 
        font-size 12px
    .rating_list_wrapper
      padding 18px
      .rating_item
        display flex
        padding 18px 0
        border-bottom 1px solid rgba(7,17,27,0.1);
        &:last-child
          border none
        .avatar
          height 28px
          width 28px
          margin-right 12px
          img 
            border-radius 50%
        &>.content
          flex 1
          .user_wrapper
            display flex
            margin-bottom 4px
            .user
              flex 1
              font-size 12px
              color rgb(7,17,27)
            .rating_time
              font-size 10px
              color rgb(147,153,159)
          .star_wrapper
            margin-bottom 6px
          &>.rate_text
            font-size 12px
            line-height: 18px
            margin-bottom: 8px
            color #333
          .recommend
            .icon-thumb_up
              font-size 10px
              color #00a0dc
            &>span
              font-size 10px
              display inline-block
              border 1px solid rgba(7,17,27,0.1);
              padding 0 6px
              line-height 16px
              margin-right 8px
              margin-bottom 4px
              color #999
              border-radius 1px
</style>