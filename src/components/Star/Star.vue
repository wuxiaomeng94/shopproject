<template>
  <div class="star " :class="`star-${size}`">
    <span class="star-item on" v-for="(star, index) in starScores" :class="star" :key="index"></span>
  </div>
</template>

<script>

  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';

    export default {
        name: "Star",
        props: {
          score: Number,
          size: Number
        },
        computed: {
          starScores() {
            const score = this.score;
            let scoreArr = [];
            const onStar = Math.floor(score);
            for (let i=0;i<onStar;i++) {
              scoreArr.push(STAR_ON);
            }
            const halfStar = score-onStar;
            let halfCount = 0;
            if (halfStar>0.5) {
              scoreArr.push(STAR_HALF);
              halfCount = 1;
            }
            const offStar = 5-onStar-halfCount;
            for (let i=0;i<offStar;i++) {
              scoreArr.push(STAR_OFF);
            }
            return scoreArr;
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('/static/images/stars/star48_on')
        &.half
          bg-image('/static/images/stars/star48_half')
        &.off
          bg-image('/static/images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('/static/images/stars/star36_on')
        &.half
          bg-image('/static/images/stars/star36_half')
        &.off
          bg-image('/static/images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('/static/images/stars/star24_on')
        &.half
          bg-image('/static/images/stars/star24_half')
        &.off
          bg-image('/static/images/stars/star24_off')
</style>
