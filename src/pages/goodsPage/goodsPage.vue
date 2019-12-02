<template>
  <div class="goods_page">
      <div class="goods_content">
          <div class="menu_wrapper">
              <div class="menu_content">
                  <div class="menu_item" v-for="(item,index) in shopGoods" :key="index">
                    <div class="menu_item_box">
                        <div class="text">
                            <span v-if="item.type!=-1" :class="'bulletin_icon_'+(item.type+1)"></span><span class="bulletin_text">{{item.name}}</span>
                        </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="food_wrapper">
              <div class="foods_content">
                  <div class="food_type_wrapper" v-for="(goodsItem,index) in shopGoods" :key="index">
                      <div class="food_type">
                          {{goodsItem.name}}
                      </div>
                      <div class="food_type_list" v-for="(food,itemindex) in goodsItem.foods" :key="itemindex">
                          <div class="food_item">
                              <div class="avatar">
                                  <img :src="food.icon" width="60" height="60" alt="">
                              </div>
                              <div class="food_content">
                                    <div class="food_name">{{food.name}}</div>
                                    <div class="food_description">{{food.description}}</div>
                                    <div class="sellercounts">
                                        <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="new_price">￥{{food.price}}</span>
                                        <span class="old_price" v-if="food.oldprice">￥{{food.oldPrice}}</span>
                                    </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="shop_cart">

      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import {reqShopGoods} from "../../api/index"
export default {
    data(){
        return{
            shopGoods:[]
        }
    },
    methods:{
        async getShopGoods(){
            const result=await reqShopGoods()
            this.shopGoods=result.data
            console.log(result)
            this.$nextTick(()=>{
                new BScroll('.food_wrapper', {
                    click: true
                })
                new BScroll('.menu_wrapper', {
                    click: true
                })
            })
        }
    },
    created(){
        this.getShopGoods()
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.goods_page
    width 100%
    position absolute
    top 142px
    bottom 0px
    z-index 200
.goods_content
    position absolute
    width 100%
    top 0px
    bottom 50px
    display flex
    .menu_wrapper
        width 80px
        background #f3f5f7
        overflow hidden
        .menu_item
            .menu_item_box
                height 54px
                line-height 14px
                text-align center
                display flex
                align-items center
                .text
                    flex 1
                    padding 0 10px
                    .bulletin_icon_1
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        background-size 12px 12px
                        background-repeat no-repeat
                        bg-image("./images/decrease_1")
                    .bulletin_icon_2
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        background-size 12px 12px
                        background-repeat no-repeat
                        bg-image("./images/discount_1")
                    .bulletin_icon_3
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        background-size 12px 12px
                        background-repeat no-repeat
                        bg-image("./images/special_1")
                    .bulletin_icon_4
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        background-size 12px 12px
                        background-repeat no-repeat
                        bg-image("./images/invoice_1")
                    .bulletin_icon_5
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        background-size 12px 12px
                        background-repeat no-repeat
                        bg-image("./images/guarantee_1")
                    .bulletin_text
                        font-size 12px
                        line-height 14px
                        white-space: normal
    .food_wrapper
        flex 1
        overflow hidden
        .foods_content
            .food_type_wrapper
                .food_type
                    font-size 12px
                    line-height 26px
                    background #f3f5f7
                    border-left: 2px solid #d9dde1;
                    padding-left 14px
                .food_type_list
                    padding 0 18px
                    &:last-child
                        .food_item
                            border-bottom none
                    .food_item
                        padding 18px 0
                        display flex
                        border-bottom 1px solid rgba(7,17,27,0.1)
                        .avatar
                            width 60px
                            margin-right 10px
                        .food_content
                            flex 1
                            .food_name
                                font-size 14px
                                color rgb(7,17,27)
                                line-height 14px
                                margin-top 2px
                            .food_description
                                font-size 10px
                                color rgb(147,153,159)
                                margin-top 8px
                            .sellercounts
                                font-size 10px
                                color rgb(147,153,159)
                                margin-top 8px
                                span 
                                    &:last-child
                                        margin-left 12px
                            .price
                                font-size 14px
                                margin-top 8px
                                .new_price
                                    color red
.shop_cart
    position absolute
    height 50px
    width 100%
    bottom 0
    left 0

    
</style>