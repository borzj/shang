<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="geiQian(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin/myMixin";
export default {
  name: 'Daughter',
  mixins:[myMixin],
  data () {
    return {
      money: 20000
    }
  },

  methods: {
    
  }
}
</script>
