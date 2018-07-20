<template>
  <div>
    <x-header :left-options="{backText: ''}" style="background-color:#16afff; position: fixed; top: 0; z-index: 1; width: 100%">我的收藏
      <img slot="left" :src="myAvatar" alt="avatar" class="my-avatar">
    </x-header>
    <div class="content-box">
      <!-- <div class="card-head">
        <card>
          <div slot="content" class="info-content" style="text-align: center">
            <img src="../../assets/images/fav.png" alt="avatar" class="avatar">
          </div>
        </card>
      </div> -->
      
      <card v-for="(item,key) in dataList" :key="'item'+key">
        <div slot="content">
          <div class="card-header">
            <img :src="item.avatar" alt="avatar" class="avatar" @click="pushHome(item.uid)">
            <div style="display: inline-block; margin-left: 10px;" @click="pushHome(item.uid)">{{item.name}}</div>
            <img src="../../assets/images/fav.png" alt="fav" class="pull-right fav-icon" @click="disfav(key)">
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
    
    <toast v-model="isToastShow" type="text" :time="1500">{{toastContent}}</toast>
    
  </div>
</template>

<script>
  import { Card, Toast, XHeader } from 'vux'
  import { setTimeout } from 'timers';
  import moment from 'moment'

  export default {
    components: {
      Card,
      Toast,
      XHeader
    },
    data() {
      return {
        myAvatar: '',
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
      pushDetail(id) {
        this.$router.push({path: 'detail', query: {id: id}})
      },
      disfav(k) {
        //取消收藏api
        
        this.dataList.splice(k, 1);
        this.isToastShow = true;
        this.toastContent = '已取消收藏～'
      },
      pushHome(id) {
        this.$router.push({path: 'home', query: {id: id}})
      }
    },
    mounted() {
      //从cookie取currentUser

      //获取收藏api

      //假数据
      this.myAvatar = 'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg';
      this.dataList = [{uid: 1, avatar: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg', name: '和菜头1', id: 1, postIMG:'https://ws4.sinaimg.cn/large/006tNc79gy1ftf0jax7pnj316o16oq57.jpg', postContent:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', createdAt:'2018-07-12 09:31',},
                      {uid: 2, avatar: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fr62nn76hpj306o06oq2s.jpg', name: '和菜头2', id: 2, postIMG:'https://ws4.sinaimg.cn/large/006tNc79gy1ftf0jax7pnj316o16oq57.jpg', postContent:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', createdAt:'2018-07-12 09:31',},]
    }
  }
</script>

<style scoped>
  .content-box {
    margin-top: 60px;
    margin-bottom: 10px;
  }
  .card-head {
    position: sticky;
    top: 0;
    z-index: 1;
    margin-bottom: 10px;
  }
  .card-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    padding: 5px 15px;
  }
  .my-avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    object-fit: cover;
    margin-left: 18px;
    position: absolute;
    top:-5px;
  }
  .avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
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
