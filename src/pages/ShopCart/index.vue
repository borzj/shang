<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart, index) in shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="shopCart.isChecked" @change="checkShop(shopCart)">
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{ shopCart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum(shopCart, -1)">-</a>
            <input autocomplete="off" ref="skuNum" type="text" minnum="1" class="itxt" :value="shopCart.skuNum"
                   @change="changeNum(shopCart, $event.target.value * 1 - shopCart.skuNum * 1, $event)"/>
            <a href="javascript:void(0)" class="plus" @click="changeNum(shopCart, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopCart.skuPrice * shopCart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0)" class="sindelet" @click="deleteShop(index)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#" @click.prevent="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'ShopCart',
  async mounted() {
    await this.$store.dispatch('getShopCartList');
  },
  computed: {
    ...mapState({
      shopCartList: state => state.shopCart.shopCartList
    }),
    sumPrice() {
      let sum = 0
      this.shopCartList.forEach(shop => {
        sum += shop.skuPrice * shop.skuNum
      })
      return sum
    },
    isAllCheck: {
      get() {
        if (!this.shopCartList.length) {
          return false
        }
        return this.shopCartList.every(shop => Boolean(shop.isChecked) === true);
      },
      set(isChecked) {
        const needChangShopSkuIds = this.shopCartList.filter(shop => Boolean(shop.isChecked) !== isChecked)
            .map(shop => shop.skuId)
        this.shopCartList.forEach(shop => {
          shop.isChecked = isChecked
        })
        this.$store.dispatch('allCheck', {needChangShopSkuIds, isChecked}).catch(e => {
          console.error(e)
        })
      }
    },
  },
  methods: {
    async deleteChecked() {
      try {
        await this.$store.dispatch('deleteChecked');
        this.shopCartList = this.shopCartList.filter(shop => !shop.isChecked)
      } catch (e) {
        alert('删除失败')
      }
    },
    checkShop(shopCart) {
      const {isChecked, skuId} = shopCart;
      this.$store.dispatch('checkCart', {isChecked: Number(isChecked), skuId}).catch(e => {
        console.log(e)
      })
    },
    changeNum(shopCart, number, event) {
      // 校验值
      if (isNaN(number)) {
        event.target.value = shopCart.skuNum
        return
      }
      const newSkuNum = shopCart.skuNum + number;
      if (newSkuNum < 1) {
        alert('不能为负数')
        event.target.value = shopCart.skuNum
        return
      }

      // 修改输入框的值
      shopCart.skuNum = newSkuNum;

      // 发送修改请求
      const skuId = shopCart.skuId
      const skuNum = number
      this.$store.dispatch('addOrUpdateShoppingCar', {skuId, skuNum})
    },

    async deleteShop(index) {
      const {skuId} = this.shopCartList[index]
      try {
        await this.$store.dispatch('deleteShopInCart', skuId);
        this.shopCartList.splice(index, 1)
      } catch (e) {
        alert(e.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 17%;

        }

        .cart-list-con5 {
          width: 10%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
