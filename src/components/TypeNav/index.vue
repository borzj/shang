<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="restoreIndex" @mouseenter="showCategory">
        <h2 class="all">全部商品分类</h2>
        <!--name用于做过渡动画-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!--.prevent 用於阻止點擊的默認事件(對於a標籤來說就是跳轉href)-->
            <div class="all-sort-list2" @click.prevent="goSearch">
              <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.cateforyId"
                  :class="{ curItem: curIndex === index }"
              >
                <h3 @mouseenter="changeCurIndex(index)">
                  <a href="" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div
                    class="item-list clearfix"
                    :style="{ display: curIndex === index ? 'block' : 'none' }"
                >
                  <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.cateforyId"
                  >
                    <dl class="fore">
                      <dt>
                        <a href="" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.cateforyId">
                          <a href="" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
      show: true
    };
  },
  mounted() {
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    goSearch(event){
      const location = {name: 'search'}
      // 触发事件的元素
      const element = event.target
      const {
        categoryname: categoryName,
        category1id: category1Id,
        category2id: category2Id,
        category3id: category3Id,
      } = element.dataset

      if (categoryName) {
        const query = {categoryName}
        if (category1Id) {
          query.category1Id = category1Id
        } else if (category2Id) {
          query.category2Id = category2Id;
        } else {
          query.category3Id = category3Id
        }

        if(this.$route.params){
          location.params = this.$route.params
        }

        location.query = query

        this.$router.push(location)
      }
    },

    // throttle由lodash提供, 用于限流
    changeCurIndex: throttle(function (index){
      this.curIndex = index;
    }, 50),

    restoreIndex() {
      this.curIndex = -1;
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },

    showCategory() {
      this.show = true
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .curItem {
          background-color: skyblue;
        }

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    // 过渡动画开始
    .sort-enter {
      height: 0;
    }

    // 过渡动画结束
    .sort-enter-to {
      height: 461px;
    }

    // 动画的时间和速率
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>
