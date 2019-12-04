<template>
  <div class="goods_page">
      <div class="goods_content">
          <div class="menu_wrapper">
              <div class="menu_content">
                  <div class="menu_item" :class="{hightlight:currentindex==index}" v-for="(item,index) in shopGoods" :key="index">
                    <div class="menu_item_box" @click="selecttype(index)">
                        <div class="text">
                            <span v-if="item.type!=-1" :class="'bulletin_icon_'+(item.type+1)"></span><span class="bulletin_text">{{item.name}}</span>
                            <div class="slect_food_count" v-if="item.count">{{item.count}}</div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="food_wrapper">
              <div class="foods_content" ref="food_content">
                  <div class="food_type_wrapper" v-for="(goodsItem,index) in shopGoods" :key="index">
                      <div class="food_type">
                          {{goodsItem.name}}
                      </div>
                      <div class="food_type_list" v-for="(food,itemindex) in goodsItem.foods" :key="itemindex">
                          <div class="food_item" @click="showFoodDetail(food,goodsItem)">
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
                                    <div class="cart_control_wrapper">
                                        <cartControl :food="food" :goodTypeFoods="goodsItem" @addfood="addfood" @decreasefood="decreasefood"/>
                                    </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <transition name="food-move">
          <div class="food_detail" v-show="showFood">
            <div class="food_content">
                <div class="food_detail_wrapper">
                    <div>
                        <div class="avatar">
                            <i @click="closeFoodShow" class="icon-arrow_lift"></i>
                            <img :src="currentFood.image" width="100%" alt="">
                        </div>
                        <div class="food">
                            <p class="name">{{currentFood.name}}</p>
                            <p class="sell_count">
                                <span class="count">月售{{currentFood.sellCount}}份</span>
                                <span class="rate">好评率{{currentFood.rating}}%</span>
                            </p>
                            <p class="shop_control">
                                <span class="price">￥{{currentFood.price}}</span>
                                <span class="add_food_btn right" v-show="!currentFood.count" @click.stop.prevent="addfood(currentFood,currentTypeFoods)">加入购物车</span>
                                <span class="right" v-show="currentFood.count>0">
                                    <cartControl :food="currentFood" :goodTypeFoods="currentTypeFoods" @addfood="addfood" @decreasefood="decreasefood"/>
                                </span>
                            </p>
                        </div>
                        <div class="split"></div>
                        <div class="food_info_wrapper">
                            <p class="title">商品信息</p>
                            <section class="text">{{currentFood.info}}</section>
                        </div>
                        <div class="split"></div>
                        <div class="food_rating_wrapper">
                            <p class="title">商品评价</p>
                            <div class="tabs_content">
                                <div class="all" @click="slectRating('allRatings',1)" :class="{highlight:curretIndex==1}">全部{{allRatings.length}}</div>
                                <div class="good" @click="slectRating('goodRatings',2)" :class="{highlight:curretIndex==2}">满意{{goodRatings.length}}</div>
                                <div class="bad" @click="slectRating('badRatings',3)" :class="{highlight:curretIndex==3}">不满意{{badRatings.length}}</div>
                            </div>
                            <div class="filter_rating" @click="filterShow=!filterShow">
                                <i class="icon-check_circle" :class="{highlight:!filterShow}"></i>
                                <span class="text">只看有内容的评价</span>
                            </div>
                            <div class="rating_list_wrapper">
                                <div class="rating_item" v-for="(item,index) in ratings" :key="index" v-if="filterShow ? true:item.text!=''">
                                    <div class="avatar">
                                        <span class="rating_time">{{item.rateTime}}</span>
                                        <span class="user">{{item.username}}</span>
                                        <img :src="item.avatar" width="12" height="12" alt="">
                                    </div>
                                    <div class="rate_text">
                                        <span :class="item.rateType==1?'icon-thumb_down':'icon-thumb_up'"></span>
                                        {{item.text}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </transition>
      <div class="shop_cart_wrapper">
          <shopCart :totalFee="totalFee" :totalNum="totalNum" :shopGoods="shopGoods" @addfood="addfood" @decreasefood="decreasefood"/>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import cartControl from "../../components/cartControl/cartControl"
import shopCart from "../../components/shopCart/shopCart"
import {reqShopGoods} from "../../api/index"
export default {
    data(){
        return{
            shopGoods:[],
            menuScroll:{},
            goodsScroll:{},
            heightarr:[],
            scrollY:0,
            currentFood:{},
            currentTypeFoods:{},
            showFood:false,
            foodScroll:null,
            curretIndex:0,
            goodRatings:[],
            badRatings:[],
            allRatings:[],
            curretIndex:1,
            filterShow:true,
            ratings:[]
        }
    },
    components:{
        cartControl,
        shopCart
    },
    computed:{
        currentindex(){
            for(let i=0;i<this.heightarr.length;i++){
                let height1=this.heightarr[i]
                let height2=this.heightarr[i+1]
                if(this.scrollY<=0){
                    if(!height2||-this.scrollY<-height2&&-this.scrollY>=-height1){
                        return i
                    }
                }
            }
            if(this.scrollY>0){
                return 0
            }
            return 0
        },
        totalFee(){
            let sum=0
            for(let i=0;i<this.shopGoods.length;i++){
                if(this.shopGoods[i].count>0){
                    for(let j=0;j<this.shopGoods[i].foods.length;j++){
                        if(this.shopGoods[i].foods[j].count>0){
                            sum+=this.shopGoods[i].foods[j].price*this.shopGoods[i].foods[j].count
                        }
                    }
                }
            }
            return sum
        },
        totalNum(){
            let num=0
            for(let i=0;i<this.shopGoods.length;i++){
                if(this.shopGoods[i].count>0){
                    num+=this.shopGoods[i].count
                }
            }
            return num
        }
    },
    methods:{
        selecttype(index){
            this.scrollY=this.heightarr[index]
            this.goodsScroll.scrollTo(0,this.heightarr[index],500)
        },
        addfood(food,foodTypeGoods){
            if(food.count>=0){
                food.count++
                foodTypeGoods.count++
            }else{
                this.$set(food,"count",1)
                if(foodTypeGoods.count>=0){
                    foodTypeGoods.count++
                }else{
                    this.$set(foodTypeGoods,"count",1)
                }
            }
        },
        decreasefood(food,foodTypeGoods){
            food.count--
            foodTypeGoods.count--
        },
        async getShopGoods(){
            const result=await reqShopGoods()
            this.shopGoods=result.data
            this.$nextTick(()=>{
                this.goodsScroll=new BScroll('.food_wrapper', {
                    click: true,
                    probeType:2
                })
                this.menuScroll=new BScroll('.menu_wrapper', {
                    click: true
                })
                let foodchild=this.$refs['food_content'].children
                let heightarr=[0]
                let itemheight=0
                for(let i=0;i<foodchild.length;i++){
                    itemheight=foodchild[i].clientHeight+itemheight
                    heightarr.push(-itemheight)
                }
                this.heightarr=heightarr
                this.goodsScroll.on("scroll",(pos)=>{
                    this.scrollY=pos.y
                })
            })
        },
        showFoodDetail(food,currentTypeFoods){
            this.showFood=true
            this.currentFood=food
            this.currentTypeFoods=currentTypeFoods
            let goodRating=[]
            let badRating=[]
            let allRating=food.ratings
           
            for(let i=0;i<allRating.length;i++){
                if(allRating[i].rateType==0){
                    goodRating.push(allRating[i])
                }else{
                    badRating.push(allRating[i])
                }
            }
            this.goodRatings=goodRating
            this.badRatings=badRating
            this.allRatings=allRating
            this.ratings=allRating
            this.$nextTick(()=>{
                if(this.foodScroll){
                    this.foodScroll.refresh()
                }else{
                    this.foodScroll=new BScroll(".food_detail_wrapper",{
                        click:true
                    })
                }
            })
        },
        slectRating(type,index){
            this.curretIndex=index
            this.ratings=this[type]
        },
        closeFoodShow(){
            this.showFood=false
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
    top 182px
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
            &.hightlight
                background #fff
            .menu_item_box
                height 54px
                line-height 14px
                text-align center
                display flex
                align-items center
                .text
                    position relative
                    flex 1
                    padding 0 10px
                    .slect_food_count
                        position absolute
                        top -10px
                        right 3px
                        font-size 10px
                        height 16px
                        border-radius 16px
                        line-height 16px
                        padding 0 5px
                        background: linear-gradient(to right, #fc9153, #f01414)
                        color #fff
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
                            position relative
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
                            .cart_control_wrapper
                                position absolute
                                bottom -5px
                                right 0px
.shop_cart_wrapper
    position absolute
    height 50px
    width 100%
    bottom 0
    left 0
    z-index 300
.food_detail
    height 100vh
    position absolute
    top -182px
    left 0
    width 100%
    z-index 200
    background #fff
    &.food-move-enter-active,&.food-move-leave-active
        transition transform 0.4s ease
    &.food-move-enter,&.food-move-leave-to
        transform translate3d(100%,0,0)
    .food_content
        position absolute
        top 0
        bottom 50px
        width 100%
        .food_detail_wrapper
            height 100%
            .avatar
                width 100%
                position relative
                .icon-arrow_lift
                    font-size 20px
                    padding 10px
                    position absolute
                    top 0
                    left 0
                    color #fff
            .food
                padding 18px
                .name
                    font-size 14px
                    font-weight 700
                    color #333
                    margin-bottom 8px
                    line-height 14px
                .sell_count
                    .count
                        margin-right 12px
                        font-size 10px
                        color #999
                    .rate
                        font-size 10px
                        color #999
                .shop_control
                    display flex
                    align-items center
                    .price
                        margin-right: 8px;
                        font-size: 14px;
                        color: #f01414;
                        line-height 24px
                        flex 1
                    .add_food_btn
                        height 24px
                        line-height 24px
                        padding 0 12px
                        -webkit-box-sizing border-box
                        box-sizing border-box
                        border-radius 12px
                        font-size 10px
                        color #fff
                        background #00a0dc
                        opacity 1
            .split
                width: 100%
                height: 16px
                border-top: 1px solid rgba(7,17,27,0.1)
                border-bottom: 1px solid rgba(7,17,27,0.1)
                background: #f3f5f7
            .food_info_wrapper
                padding 18px
                .title
                    line-height: 14px;
                    margin-bottom: 6px;
                    font-size: 14px;
                    color: #333;
                .text
                    line-height: 24px;
                    padding: 0 8px;
                    font-size: 12px;
                    color: #666;
            .food_rating_wrapper
                padding 18px 0
                .title
                    padding 0 18px
                    line-height: 14px;
                    font-size: 14px;
                    color: #333;
                    margin-bottom 18px
                .tabs_content
                    margin 0 18px
                    border-bottom 1px solid rgba(7,17,27,0.1)
                    padding-bottom 18px
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
                    border-bottom 1px solid rgba(7,17,27,0.1);
                    i 
                        margin-right: 4px;
                        font-size: 24px;
                        color #666
                        &.highlight
                            color #00b43c
                    .text
                        font-size: 12px;
                        color #666
                .rating_list_wrapper
                    padding 0 18px
                    .rating_item
                        padding 18px 0
                        border-bottom 1px solid rgba(7,17,27,0.1);
                        &:last-child
                            border-bottom none
                        .avatar
                            display flex
                            align-items center
                            margin-bottom 6px
                            .rating_time
                                flex 1
                                line-height: 12px
                                font-size: 10px
                                color: #999
                            .user
                                line-height: 12px
                                font-size: 10px
                                color: #999
                            img 
                                border-radius 50%
                        .rate_text
                            .icon-thumb_up
                                font-size 12px
                                color #00a0dc
                            .icon-thumb_down
                                font-size 12px
                                color #999
                            line-height: 16px;
                            font-size: 12px;
                            color: #333;
                        
                    

                    



</style>