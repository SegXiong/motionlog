<template>
  <div>
    <div class="content-box">
      <card v-for="(item,key) in dataList" :key="'item'+key">
        <div slot="content">
          <div class="card-header">
            <img :src="item.avatar" alt="avatar" class="avatar" @click="pushHome(item.uid)">
            <div style="display: inline-block; margin-left: 10px;" @click="pushHome(item.uid)">{{item.userName}}</div>
            <span v-show="isLogin" class="pull-right fav-icon">
              <img v-if="!item.isFaved" src="../../assets/images/fav-dis.png" alt="fav" class="fav-icon" @click="fav(item)">
              <img v-if="item.isFaved" src="../../assets/images/fav.png" alt="fav" class="fav-icon" @click="disfav(item)">
            </span>
          </div>
          <div class="card-content" @click="pushDetail(item.id)">
            <div class="left">
              <img :src="item.postIMG" alt="headPic" style="height: 128px; width: 112px; object-fit:cover">
            </div>
            <div class="right">
              <div class="up">{{getTruncate(item.postContent)}}</div>
              <div class="down">
                <span style="margin-left: 10px;">{{item.createdAt|fromNowFilter}}</span>
                <span class="pull-right">{{item.createdAt|createdAtFilter}}</span>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
    <tabbar v-if="isLogin" style="position:fixed">
      <tabbar-item selected>
        <img slot="icon" src="../../assets/images/home.png">
        <img slot="icon-active" src="../../assets/images/home-active.png">
        <span slot="label">Timeline</span>
      </tabbar-item>
      <tabbar-item link="/mobile/fill">
        <img slot="icon" src="../../assets/images/aperture.png">
        <img slot="icon-active" src="../../assets/images/aperture-active.png">
        <span slot="label">Post</span>
      </tabbar-item>
      <tabbar-item link="/mobile/me">
        <img slot="icon" src="../../assets/images/profile.png">
        <img slot="icon-active" src="../../assets/images/profile-active.png">
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar>
    <div v-if="!isLogin" class="btn-box">
      <flexbox>
        <flexbox-item>
          <x-button class="signup" @click.native="pushSignup">注册</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button class="login" @click.native="pushLogin">登录</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <toast v-model="isToastShow" type="text" :time="1500">{{toastContent}}</toast>
    
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XButton, Flexbox, FlexboxItem, Card, Toast } from 'vux'
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
      Toast
    },
    data() {
      return {
        isLogin:null,
        // isFaved:null,
        dataList:[],
        isToastShow: false,
        toastContent:'',
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
      pushDetail(uid) {
        if (this.isLogin) {
          this.$router.push({path: 'detail', query: {uid: uid}})
        } else {
          this.isToastShow = true;
          this.toastContent = '请先登录～';
          setTimeout(() => {
            this.$router.push({path: 'login', query: {tabIndex: 0}})
          }, 2000)
        }
      },
      pushLogin() {
        this.$router.push({path: 'login', query: {tabIndex: 0}})
      },
      pushSignup() {
        this.$router.push({path: 'login', query: {tabIndex: 1}})
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
      pushHome(id) {
        this.$router.push({path: 'home', query: {id: id}})
      }
    },
    mounted() {
      //currentUser存入cookie

      //获取列表api（isLogin是与否）
      
      //假数据
      this.isLogin = true;
      this.isFaved = true;
      this.dataList = [{uid: 1, avatar: 'https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg', userName: '和菜头', id: 1, postIMG: 'https://ws3.sinaimg.cn/large/006tKfTcgy1fr62nl7gi1j30sg0sgweq.jpg', postContent: '昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', createdAt: '2018-07-17 11:30', isFaved: true},{uid: 2, avatar: 'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg', userName: 'SegueXiong', id: 2, postIMG: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg', postContent: '昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', createdAt: '2018-07-12 11:23', isFaved: false},
      {uid: 1, avatar: 'https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg', userName: '和菜头', id: 1, postIMG: 'https://ws3.sinaimg.cn/large/006tKfTcgy1fr62nl7gi1j30sg0sgweq.jpg', postContent: '昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', createdAt: '2018-07-17 11:30', isFaved: true},{uid: 2, avatar: 'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg', userName: 'SegueXiong', id: 2, postIMG: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg', postContent: '昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', createdAt: '2018-07-12 11:23', isFaved: false}]
    }
  }
</script>

<style scoped>
  .content-box {
    margin-bottom: 60px;
  }
  .btn-box {
    z-index: 1;
    position: sticky;
    bottom: 0px;
    padding: 15px;
  }
  .signup {
    background-color: #16afff;
    color: #fff;
  }
  .login {
    color: #16afff;
    border: 1px solid #16afff;
  }
  .weui-btn:after {
    border: 0
  }
  .card-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    padding: 5px 15px;
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
