<template>
  <div>
    <x-header :left-options="{backText: ''}" style="background-color:#16afff; position: fixed; top: 0; z-index: 1; width: 100%">Motionlog</x-header>
    <div class="content-box">
      <card>
        <div slot="content">
          <div class="card-header" @click="pushHome(data.uid)">
            <img :src="data.avatar" alt="avatar" class="avatar">
            <div class="header-right">
              <div style="margin-left: 15px;">{{data.userName}}</div>
              <div style="margin-left: 15px; color: #666; font-size: 12px;">{{data.createdAt|createdAtFilter}}</div>
            </div>
          </div>
          <div class="card-content">
            <div>{{data.content}}</div>
            <div style="margin-top: 20px;">
              <img :src="data.postIMG" alt="pic" style="max-width: 100%; max-height:100%;" v-show="data.postIMG != ''">
            </div>
            <div class="btn-box">
              <div class="btn-inbox" style="border-right: 1px solid #ccc" v-if="!data.isFaved"><img  src="../../assets/images/fav-dis.png" alt="fav" class="myicon" @click="fav(data)"></div>
              <div class="btn-inbox" style="border-right: 1px solid #ccc" v-if="data.isFaved"><img src="../../assets/images/fav.png" alt="fav" class="myicon" @click="disfav(data)"></div>
              <div class="btn-inbox"><img src="../../assets/images/review.png" alt="icon" class="myicon" @click="isReviewShow=true"></div>
            </div>
          </div>
        </div>
      </card>
      <card>
        <div slot="content">
          <div class="review-box" v-for="(item,key) in data.reviews" :key="'item'+key">
            <div class="avatar-box">
              <img :src="item.avatar" alt="avatar" class="r-avatar" @click="pushHome(item.uid)">
              <div class="header-right">
                <div @click="pushHome(item.uid)">
                  <div style="margin-left: 15px; font-size:12px">{{item.userName}}</div>
                  <div style="margin-left: 15px; color: #666; font-size: 10px;">{{item.createdAt|createdAtFilter}}</div>
                </div>
                <div style="margin-left: 15px; font-size: 14px;" @click="popAction(key, item.id)">{{item.content}}</div>
              </div>
            </div>
          </div>
          <div v-if="data.reviews == ''" style="text-align: center; padding:20px">暂无评论</div>
        </div>
      </card>
    </div>

    <div>
      <x-dialog :show.sync="isReviewShow" class="dialog-demo">
        <div class="review-dialog">
          <group title="评论">
            <x-textarea v-model="myReview" :max="140" placeholder="写点什么吧~" :show-counter="false" :height="200"></x-textarea>
          </group>
        </div>
        <div class="r-btn-box">
          <x-button mini plain @click.native="cancelClick" class="cusc-btn">取消</x-button>
          <x-button mini plain class="cusp-btn" @click.native="submitClick">提交</x-button>
        </div>
      </x-dialog>
    </div>

    <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-delete="deleteComment"></actionsheet>

    <toast v-model="isToastShow" type="text" :time="1500">{{toastContent}}</toast>
    
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XButton, Card, Toast, XDialog, XTextarea, Group, XHeader, Actionsheet } from 'vux'
  import { setTimeout } from 'timers';
  import moment from 'moment'

  export default {
    components: {
      Tabbar, 
      TabbarItem,
      XButton,
      Card,
      Toast,
      XDialog,
      XTextarea,
      Group,
      XHeader,
      Actionsheet
    },
    data() {
      return {
        data: {},
        isToastShow: false,
        toastContent:'',
        isReviewShow:false,
        myReview:'',
        showMenus: false,
        menus: {
          delete: '<span style="color:red">删除</span>',
        },
        myKey:null,
        targetID: null,
      }
    },
    filters: {
      createdAtFilter(v) {
        return moment(v).format('YYYY-MM-DD HH:mm')
      }
    },
    methods: {
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
      cancelClick() {
        this.isReviewShow=false;
        this.myReview = '';
      },
      submitClick() {
        //添加评论api

        this.isReviewShow = false;
        this.myReview = '';
      },
      popAction(key,id) {
        //判断是否是本人操作

        this.showMenus = true;

        this.myKey = key;
        this.targetID = id
        
      },
      deleteComment() {
        //删除评论api

        this.data.reviews.splice(this.myKey, 1);
      },
      pushHome(id) {
        this.$router.push({path: 'home', query: {id: id}})
      }
    },
    mounted() {
      //获取详情api

      //假数据
      this.data = {uid: 1, userName: '和菜头', avatar:'https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg', createdAt:'2018-07-12 09:41', content:'昨天晚上，在北京古北水镇的长城城墙上看了一部露天电影。片名叫做《邪不压正》，导演是姜文。只有姜文，才会让数百人驱车一百三十多公里，花两个小时赶去看一部露天电影；也只有姜文的电影，才会无论他拍什么题材都让人充满期待，觉得那是一年里有数的几件事之一。', postIMG:'https://ws3.sinaimg.cn/large/006tKfTcgy1fr62nl7gi1j30sg0sgweq.jpg', isFaved: true, 
                  reviews: [{uid: 1, avatar:'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg', userName: 'SegueXiong', createdAt: '2018-07-12 09:41', id: 1, content:'姜文的电影值得一看'},{uid: 2, avatar:'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg', userName: 'SegueXiong', createdAt: '2018-07-12 09:41', id: 2, content:'姜文的电影bu值得一看'}]};
                  //reviews:[]}
    }
  }
</script>

<style lang="less" scoped>
  .content-box {
    margin-top: 60px;
  }
  .card-header {
    display: flex;
    align-items: center;
    padding: 5px 15px;
  }
  .avatar {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: cover;
  }
  .header-right {
    display: flex;
    align-items: left;
    flex-direction: column;
  }
  .card-content {
    position: relative;
    padding: 15px;
  }
  .myicon {
    width: 20px;
    height: 20px;
  }
  .btn-box {
    display: flex;
    align-items: center;
  }
  .btn-inbox {
    text-align: center;
    flex: 1;
    margin-top: 10px;
  }
  .review-box {
    padding: 15px;
  }
  .avatar-box {
    display: flex;
    align-items: top;
  }
  .r-avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    object-fit: cover;
  }
  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .r-btn-box {
      margin-bottom: 15px;
    }
  }
  .cusp-btn {
    margin-left: 15px;
    color: #fff;
    background-color: #16afff;
    border: 1px solid #16afff;
  }
  .cusc-btn {
    color: #16afff;
    border: 1px solid #16afff;
  }
</style>
