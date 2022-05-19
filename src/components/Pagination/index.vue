<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="sendPageNumber(pageNo - 1)">上一页</button>
    <button v-show="pageStartAndEndNumber.startNumber > 1" @click="sendPageNumber(1)" :class="{active: pageNo === 1}">1</button>
    <button v-show="pageStartAndEndNumber.startNumber > 2">···</button>
    <button v-for="page in pageStartAndEndNumber.endNumber" v-if="page >= pageStartAndEndNumber.startNumber" @click="sendPageNumber(page)" :class="{active: page === pageNo}">
      {{ page }}
    </button>

    <button v-show="pageStartAndEndNumber.endNumber < totalPage - 1">···</button>
    <button v-show="pageStartAndEndNumber.endNumber < totalPage" @click="sendPageNumber(totalPage)" :class="{active: pageNo === totalPage}">{{ totalPage }}</button>

    <button :disabled="pageNo===totalPage" @click="sendPageNumber(pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'size', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.size)
    },
    pageStartAndEndNumber() {
      if (this.totalPage < this.continues) {
        return {startNumber: 1, endNumber: this.totalPage}
      }

      const step = parseInt(this.continues / 2)
      let startNumber = this.pageNo - step
      let endNumber = this.pageNo + step
      if (startNumber < 1) {
        startNumber = 1
        endNumber = startNumber + this.continues - 1;
      } else if (endNumber > this.totalPage) {
        endNumber = this.totalPage
        startNumber = endNumber - this.continues + 1
      }

      return {startNumber, endNumber}
    }
  },
  methods: {
    sendPageNumber(page){
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
