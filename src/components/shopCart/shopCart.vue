<template>
    <div class="shop_cart">
        <div class="content" @click="showCartDetail">
            <div class="content_left">
                <div class="logo_wrapper">
                    <div class="logo"  :class="{highlight:totalNum>0}">
                        <span class="num">{{totalNum}}</span>
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="total_price" :class="{totalFee}">
                    ￥{{totalFee}}
                </div>
                <div class="desc">
                    另需配送费￥5元
                </div>
            </div>
            <div class="content_right" :class="{highlight:totalFee>=20}">
                {{totalFee>=20?"去结算":`￥${20-totalFee}元起送`}}
            </div>
        </div>
        <div class="shop_cart_detail_wrapper">
            <shopCartDetail :show="show" @hide="hideCartDetail" :shopGoods="shopGoods" @addfood="addfood" @decreasefood="decreasefood"/>
        </div>
    </div>
</template>

<script>
import shopCartDetail from "../shopCartDetail/shopCartDetail"
export default {
    components:{
        shopCartDetail
    },
    props:{
        totalFee:Number,
        totalNum:Number,
        shopGoods:Array
    },
    data(){
        return{
            show:false
        }
    },
    watch:{
       totalNum(val){
           if(val==0){
               this.show=false
           }
       } 
    },
    methods:{
        showCartDetail(){
            if(this.totalNum>0){
                this.show=true
            }
        },
        hideCartDetail(){
            this.show=false
        },
        addfood(food,goodTypeFoods){
            this.$emit("addfood",food,goodTypeFoods)
        },
        decreasefood(food,goodTypeFoods){
            this.$emit("decreasefood",food,goodTypeFoods)
        }
    }
}
</script>

<style lang="stylus">
.shop_cart
    height 100%
    position relative
    z-index 200
    .content
        height 100%
        width 100%
        display flex
        background #07111b
        position absolute
        z-index 100
        top 0
        left 0
        .content_left
            flex 1
            position relative
            align-self auto
            .logo_wrapper
                position absolute
                height 56px
                width 56px
                left 14px
                top -8px
                background #07111b
                border-radius 50%
                padding 6px
                box-sizing: border-box
                .logo
                    width 44px
                    height 44px
                    border-radius 50%
                    background #333
                    text-align center
                    .num
                        position absolute
                        top 0px
                        right 0px
                        font-size 10px
                        height 16px
                        border-radius 16px
                        line-height 16px
                        padding 0 5px
                        background: linear-gradient(to right, #fc9153, #f01414)
                        color #fff
                    i 
                        display inline-block
                        margin-top 10px
                        font-size 24px
                        line-height 24px
                        color rgba(255,255,255,0.4)
                    &.highlight
                        background #00a0dc
                        i 
                            color #fff
                        
            .total_price
                display inline-block
                color rgba(255,255,255,0.4)
                font-weight 700
                font-size 16px
                margin-left 75px
                line-height 26px
                margin-top 12px
                padding-right 12px
                border-right 1px solid rgba(255,255,255,0.1)
                &.highlight
                    color #fff
            .desc
                display inline-block
                color rgba(255,255,255,0.4)
                font-weight 200
                font-size 12px
                margin-left 11px
                line-height 26px
                margin-top 12px
        .content_right
            width 105px
            background #333
            line-height 50px
            text-align center
            color rgba(255,255,255,0.4)
            font-size 12px
            font-weight 700
            &.highlight
                background #00b43c
                color #fff
    .shop_cart_detail_wrapper
        position absolute
        bottom 0
        left 0
        z-index 0
        width 100%
</style>