<template>
    <header class="common_header" @click="showdetail">
        <div class="content_wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟必达
                </div>
                <div class="supports" v-if="seller.supports">
                    <span class="supports_icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="supports_counts">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin_wrapper">
            <span class="bulletin_icon"></span>
            <span class="bulletin">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="bg">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
    </header>
</template>

<script>

export default {
    props:{
        seller:Object
    },
    data(){
        return{
            show:false
        }
    },
    methods:{
        showdetail(){
            this.$emit("showdetail")
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.common_header
    position relative
    background rgba(7,17,27,0.5)
    .content_wrapper
        position relative
        display flex
        padding 24px 12px 18px 24px
        .avatar
            img 
                border-radius 2px 
        .content
            padding-top 2px
            margin-left 16px
            .title
                font-size 0
                .brand
                    display inline-block
                    vertical-align top
                    width 30px
                    height 18px
                    background-repeat no-repeat
                    background-size 30px 18px
                    bg-image('./images/brand')
                .name
                    display inline-block
                    margin-left 6px
                    font-size 16px
                    font-weight bold
                    line-height 18px
                    color #fff    
            .description
                font-size 12px
                margin-top 8px 
                font-weight 200px
                color #fff
            .supports
                margin-top 8px
                font-size 0
                .supports_icon
                    display inline-block
                    vertical-align top
                    width 12px
                    height 12px
                    background-repeat no-repeat
                    background-size 12px 12px
                    bg-image('./images/decrease_1')
                .text
                    display inline-block
                    margin-left 4px
                    font-size 10px
                    line-height 12px
                    color #fff
        .supports_counts   
            position absolute
            right 0
            bottom 18px
            right 20px
            border-radius 15px
            padding 7px 8px
            background rgba(0,0,0,0.2)
            font-size 0
            .count
                font-size 10px
                color #fff
            .icon-keyboard_arrow_right
                font-size 10px
                color #fff
    .bulletin_wrapper
        padding 11px 12px
        background rgba(7,17,27,0.2)
        display flex
        .bulletin_icon
            display inline-block
            height 12px
            width 22px
            background-repeat no-repeat
            background-size 22px 12px
            bg-image('./images/bulletin')
        .bulletin
            flex 1
            font-size 10px
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 10px;
            line-height 12px
            margin 0 4px
            color #fff
        .icon-keyboard_arrow_right
            font-size 10px    
            line-height 12px    
            color #fff
    .bg    
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        z-index -1
        filter blur(10px)

</style>