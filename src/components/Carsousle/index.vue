<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carsousle",
  props: ['carouselList'],
  mounted() {
    // this.$nextTick(()=>{
    //   new Swiper(this.$refs.floor1Swiper, {
    //     loop: true, // 循环模式选项
    //
    //     // 如果需要分页器
    //     pagination: {
    //       el: ".swiper-pagination",
    //     },
    //
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //   });
    // })
  },

  watch: {
    carouselList: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },

}
</script>

<style scoped>

</style>
