<template>
  <div class="common_star">
      <span 
      :class="'star_'+item+'_'+size" 
      :style="{width:size+'px',height:size+'px','margin-right':space+'px'}" 
      v-for="(item,index) in starList" 
      :key="index"></span>
  </div>
</template>

<script>
export default {
    props:{
        score:Number,
        size:Number
    },
    data(){
        return{
        }
    },
    computed:{
        starList(){
            const initscore=this.score
            const remainder=initscore*10 % 10
            const intnum=Math.floor(initscore)
            let onLength=0
            let halfLength=0
            let offLength=0
            let onarr=[]
            let halfarr=[]
            let offarr=[]
            // console.log(intnum)
            if(intnum){
                onLength=intnum
                for(let i=1;i<=intnum;i++){
                    onarr.push('on')
                }
            }
            if(remainder>=5){
                halfLength=1
                halfarr.push("half")
            }
            if(intnum+halfLength<5){
                offLength=5-onLength-halfLength
                for(let i=1;i<=offLength;i++){
                    offarr.push('off')
                }
            }
            let starlist=onarr.concat(halfarr,offarr)
            return starlist
        },
        space(){
            if(this.size==20){
                return 22
            }else if(this.size==15){
                return 6
            }else if(this.size==10){
                return 3
            }else{
                return 5
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.common_star
    .star_on_20
        display inline-block
        background-repeat no-repeat
        background-size 20px 19px
        bg-image("./images/star48_on") 
    .star_half_20
        display inline-block
        background-repeat no-repeat
        background-size 20px 19px
        bg-image("./images/star48_half") 
    .star_off_20
        display inline-block
        background-repeat no-repeat
        background-size 20px 19px
        bg-image("./images/star48_off") 
    .star_on_15
        display inline-block
        background-repeat no-repeat
        background-size 15px 15px
        bg-image("./images/star24_on") 
    .star_half_15
        display inline-block
        background-repeat no-repeat
        background-size 15px 15px
        bg-image("./images/star24_half") 
    .star_off_15
        display inline-block
        background-repeat no-repeat
        background-size 15px 15px
        bg-image("./images/star24_off") 
    .star_on_10
        display inline-block
        background-repeat no-repeat
        background-size 10px 9px
        bg-image("./images/star24_on") 
    .star_half_10
        display inline-block
        background-repeat no-repeat
        background-size 10px 9px
        bg-image("./images/star24_half") 
    .star_off_10
        display inline-block
        background-repeat no-repeat
        background-size 10px 9px
        bg-image("./images/star24_off") 
    span
        &:last-child
            margin-right 0 !important
</style>