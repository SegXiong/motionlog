<template>
  <div>
    <x-header :left-options="{backText: ''}" style="background-color:#16afff; position: fixed; top: 0; z-index: 1; width: 100%">我的关注
      <img slot="left" :src="myAvatar" alt="avatar" class="avatar">
    </x-header>
    <div class="content-box">
      <div class="card-body">
        <swipeout v-for="(item,key) in dataList" :key="'item'+key" class="my-swipeout">
          <swipeout-item transition-mode="follow" auto-close-on-button-click>
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('delete')" type="warn">取消关注</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <group gutter="0">
                <cell is-link :title="item.name" :inline-desc="item.moto" @click.native="pushHomepage(item.uid)">
                  <img slot="icon" :src="item.avatar" alt="avatar" class="avatar-image">
                </cell>
              </group>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </div>

  </div>
</template>

<script>
  import { Card, Cell, Group, XHeader, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

  export default {
    components: {
      Card,
      Cell,
      Group,
      XHeader,
      Swipeout, 
      SwipeoutItem, 
      SwipeoutButton
    },
    data() {
      return {
        myAvatar:'',
        dataList:[],
      }
    },
    methods: {
      pushHomepage(id) {
        this.$router.push({path: 'home', query: {id: id}})
      },
      onButtonClick() {
        //取消关注api

      }
    },
    mounted() {
      //从cookie取currentUser

      //获取关注列表api

      //假数据
      this.myAvatar = 'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg'
      this.dataList = [{uid: 1, avatar: "https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg",name: "和菜头",moto:"这个家伙很懒，什么都没留下～"},{uid: 2, avatar: "https://ws1.sinaimg.cn/large/006tNc79gy1fs2ptjlo7oj314w1523za.jpg",name: "和菜头",moto:"这个家伙很懒，什么都没留下～"}]
    }
  }
</script>

<style scoped>
  .content-box {
    margin-top: 60px;
  }
  .avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    object-fit: cover;
    margin-left: 18px;
    position: absolute;
    top:-5px;
  }
  .avatar-image {
    border-radius: 50%;
    height: 36px;
    width: 36px;
    object-fit: cover;
    margin-right: 15px;
  }
  .card-head {
    position: sticky;
    top: 46px;
    z-index: 1;
    margin-bottom: 10px;
  }
  .my-swipeout {
    margin-bottom: 10px;
  }
</style>
