<template>
    <div class="header_detail" @click.stop.prevent>
        <div class="detail_wrapper">
            <div class="main_wrapper">
                <p class="name">{{seller.name}}</p>
                <div class="star_wrapper">
                    <star :size="20" :score="seller.score"/>
                </div>
                <div class="split_line">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <div class="supports">
                    <p class="supports_item" v-for="(supports_item,index) in seller.supports" :key="index">
                        <span :class="'bulletin_icon_'+(supports_item.type+1)"></span>
                        <span class="bulletin_text">{{supports_item.description}}</span>
                    </p>
                </div>
                <div class="split_line">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                </div>
                <div class="bulletin">
                    {{seller.bulletin}}
                </div>
            </div>
        </div>
        <div class="detail-close" @click="hide">
            <i class="icon-close"></i>
        </div>
    </div>
</template>

<script>
import star from "../star/star"
export default {
    props:{
        seller:Object
    },
    components:{
        star
    },
    methods:{
        hide(){
            console.log(2)
            this.$emit("hide")
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.header_detail
    position absolute
    overflow auto
    z-index 300
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7,17,27,0.8)
    backdrop-filter blur(10px)
    .detail_wrapper
        min-height 100%
        .main_wrapper
            padding 64px 36px
            .name
                font-size 16px
                color #fff
                line-height 16px
                font-weight 700
                text-align center
                margin-bottom 16px
            .star_wrapper
                text-align center
                margin-top 16px
                margin-bottom 28px
            .split_line
                display flex
                align-items center
                .line
                    flex 1
                    border-bottom 1px solid rgba(255,255,255,0.2)
                .text
                    margin 0 12px
                    font-size 16px
                    color #fff
                    line-height 16px
                    font-weight 700
            .supports
                padding-left 12px 
                margin-top 24px
                margin-bottom 28px
                .supports_item
                    margin-bottom 12px
                    font-size 0
                    &:last-child
                        margin-bottom 0
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
                        color #fff
                        margin-left 6px
            .bulletin  
                margin-top 24px
                padding 0 12px
                line-height 24px
                font-size 12px
                font-weight 200
                color #fff


    .detail-close
        position relative
        margin-top -64px
        text-align center
        line-height 64px
        .icon-close
            font-size 32px
            color rgba(255,255,255.0.2)
</style>