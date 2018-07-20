<template>
  <div>
    <x-header :left-options="{backText: ''}" style="background-color:#16afff; position: fixed; top: 0; z-index: 1; width: 100%">Motionlog
      <img slot="left" :src="myAvatar" alt="avatar" class="my-avatar">
      <img slot="right" src="../../assets/images/follow.png" alt="关注操作" class="my-option" @click="follow(homeObj.uid)" v-show="!isMyHome">
    </x-header>
    <div class="content-box">
      <card>
        <div slot="content" class="info-head">
          <img :src = "homeObj.avatar ? homeObj.avatar : 'https://ws4.sinaimg.cn/large/006tNc79gy1ftf0jax7pnj316o16oq57.jpg'" class="big-avatar">
          <div class="user-name">{{homeObj.name}}</div>
          <!-- <div class="option-area">
            <img src="../../assets/images/follow.png" alt="关注操作" class="options">
          </div> -->
        </div>
      </card>

      <card v-for="(item,key) in homeObj.posts" :key="'item'+key">
        <div slot="content">
          <div class="card-header">
            <img :src="homeObj.avatar" alt="avatar" class="avatar">
            <div style="display: inline-block; margin-left: 10px;">{{homeObj.name}}</div>
            <span v-show="isLogin" class="pull-right fav-icon">
              <img v-if="!item.isFaved" src="../../assets/images/fav-dis.png" alt="fav" class="fav-icon" @click="fav(item)">
              <img v-if="item.isFaved" src="../../assets/images/fav.png" alt="fav" class="fav-icon" @click="disfav(item)">
            </span>
          </div>
          <div class="card-content" @click="pushDetail(item.id)">
            <div class="left">
              <img :src="item.img" alt="headPic" style="height: 128px; width: 112px; object-fit:cover">
            </div>
            <div class="right">
              <div class="up">{{getTruncate(item.content)}}</div>
              <div class="down">
                <span style="margin-left: 10px;">{{item.createdAt|fromNowFilter}}</span>
                <span class="pull-right">{{item.createdAt|createdAtFilter}}</span>
              </div>
            </div>
          </div>
        </div>
      </card>
      
    </div>
    
    <toast v-model="isToastShow" type="text" :time="1500">{{toastContent}}</toast>
    
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XButton, Flexbox, FlexboxItem, Card, Toast, XHeader } from 'vux'
  import { setTimeout } from 'timers';
  import moment from 'moment'

  export default {
    components: {
      Tabbar, 
      TabbarItem,
      XButton,
      Flexbox, 
      FlexboxItem,
      Card,
      Toast,
      XHeader
    },
    data() {
      return {
        isLogin: null,
        isMyHome: null,
        isToastShow: false,
        toastContent:'',
        homeObj: {},
        myAvatar: ''
      }
    },
    filters: {
      fromNowFilter(v) {
        return moment(v).fromNow()
      },
      createdAtFilter(v) {
        return moment(v).format('YYYY-MM-DD')
      }
    },
    methods: {
      getTruncate(s) {
        if (s.length <= 48) {
          return s;
        } else {
          return s.substr(0, 48) + '...';
        }
      },
      pushDetail(id) {
        if (this.isLogin) {
          this.$router.push({path: 'detail', query: {id: id}})
        } else {
          this.isToastShow = true;
          this.toastContent = '请先登录～';
          setTimeout(() => {
            this.$router.push({path: 'login', query: {tabIndex: 0}})
          }, 2000)
        }
      },
      follow(uid) {
        //关注api
        
      },
      fav(i) {
        //添加收藏api

        i.isFaved = true;
        this.isToastShow = true;
        this.toastContent = '已加入收藏～'
      },
      disfav(i) {
        //取消收藏api
        
        i.isFaved = false;
        this.isToastShow = true;
        this.toastContent = '已取消收藏～'
      },
    },
    mounted() {
      //获取主页信息api

      //判断是否是自己的主页currentUser

      //假数据
      this.isMyHome = true;
      this.myAvatar = 'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg'
      this.isLogin = true;
      this.homeObj= {
          uid:1,
          avatar:'https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg',
          name:'和菜头',
          posts: [{
            id: 1,
            img:'https://ws3.sinaimg.cn/large/006tKfTcgy1fr62nl7gi1j30sg0sgweq.jpg',
            content:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。',
            createdAt:'2018-07-12 09:31',
            isFaved:false,
          },{
            id: 2,
            img:'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg',
            content:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。',
            createdAt:'2018-07-12 09:31',
            isFaved:true,
          },{
            id: 3,
            img:'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg',
            content:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。',
            createdAt:'2018-07-12 09:31',
            isFaved:true,
          },{
            id: 4,
            img:'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg',
            content:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。',
            createdAt:'2018-07-12 09:31',
            isFaved:true,
          }]
        }
    }
  }
</script>

<style scoped>
  .my-avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    object-fit: cover;
    margin-left: 18px;
    position: absolute;
    top:-5px;
  }
  .my-option {
    width: 20px;
  }
  .content-box {
    margin-top: 46px;
    margin-bottom: 10px;
  }
  .option-area {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #fff;
    box-shadow: 0 0 10px #888888;
    display: flex;
    align-items: center;
  }
  .options {
    width: 20px;
    margin-left: 12px;
  }
  .info-head {
    text-align: center;
    padding: 26px 0 26px;
  }
  .card-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    padding: 5px 15px;
  }
  .big-avatar {
    border-radius: 50%;
    height: 60px;
    width: 60px;
    object-fit: cover;
  }
  .user-name {
    font-size: 18px;
    color: #333;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .avatar {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    object-fit: cover;
  }
  .pull-right {
    position: absolute;
    right: 15px;
  }
  .fav-icon {
    height: 28px;
    width: 28px;
  }
  .card-content {
    height: 128px;
    position: relative;
  }
  .left {
    float: left;
    width: 112px;
    height: 128px;
    object-fit:cover;
  }
  .right {
    display: flex;
    align-items: left;
    flex-direction: column;
    margin-left: 112px;
  }
  .up {
    display: block;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    margin-right:10px;
    height: 76px;
  }
  .down {
    margin-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999999;
  }
</style>
