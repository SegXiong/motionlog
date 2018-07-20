y<template>
  <div class="home-page">
    <div class="info-card">
      <card >
        <div slot="content" class="info-head">
          <img :src = "homeObj.avatar ? homeObj.avatar : 'https://ws4.sinaimg.cn/large/006tNc79gy1ftf0jax7pnj316o16oq57.jpg'" class="avatar">
          <div class="user-name">{{homeObj.name}}</div>
          <div class="user-moto">{{homeObj.moto}}</div>
        </div>
      </card>

      <card style="margin-top: 0px;">
        <div slot="content" class="info-content">
          <flexbox>
            <flexbox-item style="margin-left: 0 important;" >
              <div class="flex-demo" style="border-right: 1px solid #ddd;">
                <span style="font-size: 16px; color: #969696;">我的关注</span>
                <br/>
                <div style="margin-top: 10px;" >{{homeObj.myFollow}}</div>
              </div>
            </flexbox-item>

            <flexbox-item style="margin-left:0px; " >
              <div class="flex-demo">
                <span style="font-size: 16px; color: #969696;">我的动态</span>
                <br/>
                <div style="margin-top: 10px;" >{{homeObj.myLog}}</div>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
      </card>
    </div>

    <div class="option-card">
      <card >
        <div slot="content">
          <group gutter="0">
            <cell title="关注" is-link :link="{path: 'follow', query: {id: homeObj.uid}}">
              <img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../assets/images/my-follow.png" alt="icon">
            </cell>
            <cell title="收藏" is-link :link="{path: 'favs', query: {id: homeObj.uid}}">
              <img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../assets/images/fav.png" alt="icon">
            </cell>
            <cell title="动态" is-link :link="{path: 'home', query: {id: homeObj.uid}}">
              <img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../assets/images/time-machine.png" alt="icon">
            </cell>
            <cell title="设置" is-link :link="{path: 'settings', query: {id: homeObj.uid, avatar: homeObj.avatar, name: homeObj.name, moto: homeObj.moto}}">
              <img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../assets/images/setting.png" alt="icon">
            </cell>
          </group>
        </div>
      </card>
    </div>

    <tabbar style="position:fixed">
      <tabbar-item link="/mobile/timeline">
        <img slot="icon" src="../../assets/images/home.png">
        <img slot="icon-active" src="../../assets/images/home-active.png">
        <span slot="label">Timeline</span>
      </tabbar-item>
      <tabbar-item link="/mobile/fill">
        <img slot="icon" src="../../assets/images/aperture.png">
        <img slot="icon-active" src="../../assets/images/aperture-active.png">
        <span slot="label">Post</span>
      </tabbar-item>
      <tabbar-item selected>
        <img slot="icon" src="../../assets/images/profile.png">
        <img slot="icon-active" src="../../assets/images/profile-active.png">
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
  import { Card, Cell, Flexbox, FlexboxItem, XButton, Group, Tabbar, TabbarItem } from 'vux'

  export default {
    components: {
      Card,
      Cell,
      Flexbox,
      FlexboxItem,
      XButton,
      Group,
      Tabbar, 
      TabbarItem,
    },
    data() {
      return {
        homeObj: {
          uid: null,
          avatar: "",
          name: "",
          myFollow: "",
          myLog: "",
          moto: "",
        },
      }
    },
    methods: {
     
    },
    mounted() {
      //获取me界面数据api
      
      //假数据
      this.homeObj= { uid: 1, avatar: "https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg",name: "SegueXiong",myFollow: "23",myLog: "233",moto:"这个家伙很懒，什么都没留下～" }
    }
  }
</script>

<style scoped>
  .info-head {
    text-align: center;
    padding: 26px 0 20px;
  }
  .avatar {
    height: 60px;
    width: 60px;
    border: 0;
    border-radius: 50%;
    margin: 0 auto;
  }
  .user-name {
    font-size: 18px;
    color: #333;
    padding-top: 5px;
  }
  .user-moto {
    font-size: 12px;
    color: #333;
    padding-top: 5px;
  }
  .flex-demo {
    text-align: center;
    font-size: 17px;
    margin: 20px 0;
  }
  .option-card {
    margin-top: 12px;
  }
  .weui-btn {
    padding: 0 10px 0
  }

</style>
