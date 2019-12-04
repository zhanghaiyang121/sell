<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreasefood">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-adds icon-add_circle" @click.stop.prevent="addfood"></div>
    </div>
</template>

<script>
export default {
    props:{
        food:Object,
        goodTypeFoods:Object
    },
    methods:{
        addfood(event){
            console.log(event)
            this.$emit("addfood",this.food,this.goodTypeFoods)
        },
        decreasefood(){
            this.$emit("decreasefood",this.food,this.goodTypeFoods)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    display: flex
    align-items: center
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      .inner
        display: inline-block
        line-height: 24px
        font-size: 20px
        color: rgb(0,160,220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      width: 12px
      line-height: 24px
      text-align: center
      font-size: 14px
      color: rgb(147,153,159)
    .cart-adds
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 20px
      color: rgb(0,160,220)
</style>