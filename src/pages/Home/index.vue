<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState(
      {
        floorList: state => state.home.floorList
      }
    )
  }
}
</script>
<style lang="">

</style>
