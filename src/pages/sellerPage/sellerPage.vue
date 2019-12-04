<template>
  <div class="sellerPage">
    <div class="seller_contont">
        <div class="seller_header_wrapper">
          <div class="name">{{seller.name}}</div>
          <div class="star_wwrapper">
              <star :size="15" :score="seller.score"/>
              <div class="text">月售{{seller.sellCount}}单</div>
          </div>
          <div class="remark">
              <div class="block">
                <p class="desc">起送价</p>
                <p class="price">{{seller.minPrice}}<span class="unit">元</span></p>
              </div>
              <div class="block">
                <p class="desc">商家配送</p>
                <p class="price">{{seller.deliveryPrice}}<span class="unit">元</span></p>
              </div>
              <div class="block">
                <p class="desc">平均配送时间</p>
                <p class="price">{{seller.deliveryTime}}<span class="unit">元</span></p>
              </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="bulletin">
            <div class="bulletin_title">公告与活动</div>
            <div class="detail_desc">
              {{seller.bulletin}}
            </div>
            <div class="bulletin_item" v-for="(supports_item,index) in seller.supports" :key="index">
                <span class="icon" :class="'bulletin_icon_'+(supports_item.type+1)"></span>
                <span class="bulletin_text">{{supports_item.description}}</span>
            </div>
        </div>
        <div class="split"></div>
        <div class="pics">
            <div class="pic_title">商家实景</div>
            <div class="pics_wrapper">
                <div class="content" ref="content">
                  <div class="list">
                    <div class="pic_item" v-for="(pic_item,index) in seller.pics" :key="index">
                      <img :src="pic_item" width="120" height="90" alt="">
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="split"></div>
        <div class="shop_info">
          <div class="info_title">商家信息</div>
          <div v-for="(item,index) in seller.infos" :key="index">
              <p>{{item}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {reqShopInfo} from "../../api"
import star from "../../components/star/star"
import BScroll from "better-scroll"
export default {
  data(){
    return{
      seller:{},
      scroll:null,
      picscroll:null
    }
  },
  components:{
    star
  },
  methods:{
    async getShopInfo(){
          const result=await reqShopInfo()
          this.seller=result.data
          this.$nextTick(()=>{
            this.scroll=new BScroll(".sellerPage",{
              click:true
            })
          })
          this.$nextTick(()=>{
            let num=result.data.pics.length
            let pic_width=120
            let margin=10
            let width=(pic_width+margin)*num-margin
            this.$refs.content.style.width = width + "px"
            this.picscroll=new BScroll(".pics_wrapper",{
              click:true,
              scrollX:true,
              scrollY: false,
              eventPassthrough: "vertical"
            })
          })
          
      }
  },
  created(){
    this.getShopInfo()
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.sellerPage
  width 100%
  position absolute
  top 182px
  bottom 0px
  z-index 200
  overflow hidden
  .seller_header_wrapper
    padding 18px
    .name
      font-size 14px
      margin-bottom 8px
      color #333
    .star_wwrapper
      display flex
      align-items center
      padding-bottom 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .text
        font-size 10px
        margin-left 12px
    .remark
      display flex
      margin-top 18px
      .block
        flex 1
        border-right 1px solid rgba(7,17,27,0.1)
        &:last-child
          border none
        .desc
          font-size 10px
          text-align center
          margin-bottom 4px
        .price
          font-size 24px
          text-align center
          .unit
            font-size 10px
  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7,17,27,0.1)
    border-bottom: 1px solid rgba(7,17,27,0.1)
    background: #f3f5f7
  .bulletin
    padding 0 18px
    padding-top 18px
    .bulletin_title
      margin-bottom: 8px;
      line-height: 14px;
      color: #333;
      font-size: 14px;
    .detail_desc
      padding 0 12px
      padding-bottom 16px
      font-size 12px
      line-height 24px
      color  #f01414
    .bulletin_item
      padding 16px 12px
      // font-size 0
      // &:last-child
      //     margin-bottom 0
      .bulletin_icon_1
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          background-repeat no-repeat
          bg-image("./images/decrease_1")
      .bulletin_icon_2
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          background-repeat no-repeat
          bg-image("./images/discount_1")
      .bulletin_icon_3
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          background-repeat no-repeat
          bg-image("./images/special_1")
      .bulletin_icon_4
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          background-repeat no-repeat
          bg-image("./images/invoice_1")
      .bulletin_icon_5
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          background-repeat no-repeat
          bg-image("./images/guarantee_1")
    .bulletin_text
      font-size 12px
      line-height 16px
  .pics
    padding 18px
    .pic_title
      margin-bottom: 8px;
      line-height: 14px;
      color: #333;
      font-size: 14px;
    .pics_wrapper
      overflow hidden
      .content
        .list
          .pic_item
            display inline-block
            margin-right 10px
            &:last-child    
              margin-right 0
  .shop_info
    padding 18px
    .info_title
      margin-bottom: 8px;
      line-height: 14px;
      color: #333;
      font-size: 14px;
    p
      padding: 16px 12px;
      line-height: 16px;
      font-size: 12px;
      color #333
</style>