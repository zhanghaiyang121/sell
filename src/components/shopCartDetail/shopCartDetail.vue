<template>
    <div class="shop_cart_detail">
        <transition name="move">
            <div class="shop_cart_detail_BS_wrapper" v-show="listShow">
                <div class="shop_cart_detail_content">
                    <header>
                        <span class="title">购物车</span>
                        <span class="clear">清空</span>
                    </header>
                    <div class="chart_food_list_wrapper">
                        <div class="chart_food_list_content">
                            <div class="chart_food_list" v-if="shopGoods">
                                <div class="foods_item" v-for="(foods,index) in shopGoods" v-if="foods.count>0" >
                                    <div class="food_item" v-for="(food,foodindex) in foods.foods"  v-if="food.count">
                                        <div class="food_item_name">
                                            {{food.name}}
                                        </div>
                                        <div class="food_item_price">
                                            ￥{{food.price}}
                                        </div>
                                        <div class="detail_chart_control_wraperr">
                                            <cartControl :food="food" :goodTypeFoods="foods" @addfood="addfood" @decreasefood="decreasefood"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="mask" v-show="listShow" @click="hide"></div>
        </transition>
    </div>
</template>

<script>
import BScroll from "better-scroll"
import cartControl from "../cartControl/cartControl"
export default {
    props:{
        show:Boolean,
        shopGoods:Array
    },
    components:{
        cartControl
    },
    data(){
        return{
            foodListScroll:null
        }
    },
    computed:{
        listShow(){
            if(this.show){
                if(!this.foodListScroll){
                    this.$nextTick(()=>{
                        this.foodListScroll=new BScroll(".chart_food_list_wrapper",{
                            click:true
                        })
                    })
                }else{
                    this.$nextTick(()=>{
                        this.foodListScroll.refresh()
                    })
                    
                }
                    
            }
            return this.show
        }
    },
    methods:{
        hide(){
            this.$emit("hide")
        },
        addfood(food,goodTypeFoods){
            this.$emit("addfood",food,goodTypeFoods)
        },
        decreasefood(food,goodTypeFoods){
            this.$emit("decreasefood",food,goodTypeFoods)
        }
    },
    mounted(){
    }
}
</script>

<style lang="stylus">
.shop_cart_detail
    width 100%
    position relative
    .mask
        height 100vh
        width 100%
        position absolute
        bottom 0
        left 0
        background rgba(7,17,27,0.6)
        z-index 0
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.4s linear
        &.fade-enter, &.fade-leave-to
            opacity: 0
    .shop_cart_detail_BS_wrapper
        position absolute
        bottom 50px
        left 0
        max-height 250px
        width 100%
        z-index 100
        background #fff
        &.move-enter-active, &.move-leave-active
            transition: all 0.4s linear
        &.move-enter, &.move-leave-to
            opacity 0
            transform translate3d(0,100%,0)
        .shop_cart_detail_content
            max-height 250px
            display flex
            flex-direction column
            header 
                flex-shrink 0
                display flex
                height 40px
                border-bottom 1px solid rgba(7,17,27,0.1)
                align-items center
                &>.title
                    color rgb(7,17,27)
                    line-height 40px
                    font-weight 200
                    margin-left 18px
                    flex 1
                &>.clear
                    color rgb(0,160,220)
                    line-height 40px
                    font-weight 200
                    margin-right 18px
            .chart_food_list_wrapper
                flex 1
                overflow hidden
                .chart_food_list_content
                    .chart_food_list
                        .foods_item
                            .food_item
                                display flex
                                align-items center
                                .food_item_name
                                    margin-left 18px
                                    font-size 14px
                                    flex 1
                                .food_item_price
                                    color rgb(240,20,20)
                                    font-size 14px
                                    font-weight 700


                                




</style>