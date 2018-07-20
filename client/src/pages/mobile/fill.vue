<template>
  <div>
    <div class="content-box">
      <card>
        <div slot="content" style="text-align:center; ">
          <img :src="avatar" alt="avatar" class="avatar">
          <group gutter="0">
            <x-textarea v-model="data.myPost" :max="200" placeholder="写点什么吧~" :show-counter="true" :height="200"></x-textarea>
            <div class="image-box">
              <cell-box style="height: 50px">
                <span v-show="isPlusShow">
                  <x-icon type="ios-plus-empty" size="42" style="border:1px solid #ccc; padding:0px; position:absolute; left: 5%; top:8px; touch-action: none;"></x-icon>
                  <input type="file"  name="fileupload"  @change="uploadClick" ref="upFile" style="width:42px ;height:42px; position:absolute; z-index:1; top: 8px; left: 5%; opacity:0; touch-action: none; background-color: red;">

                </span>
                <span v-show="isPicShow">
                  <img class="previewer-demo-img" slot="icon" style="width:40px; height:40px; position:absolute; left: 5%; top: 12px;" src="https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg" width="43" height="43" @click="showimg">
                  <icon type="clear" style="position:absolute; left: 4%; top: 12px;" @click.native.stop="clearbackimg"></icon> 
                </span>
                <div>
                  <previewer :list="previewList"  ref="previewer" :options="options" ></previewer>
                </div>
              </cell-box> 
            </div>
          </group>
        </div>
      </card>
      <div class="btn-box">
        <x-button plain class="submit-btn" @click.native="postArticle" :show-loading="isLoadingShow">创建</x-button>
      </div>
    </div>

    <tabbar style="position:fixed">
      <tabbar-item link="/mobile/timeline">
        <img slot="icon" src="../../assets/images/home.png">
        <img slot="icon-active" src="../../assets/images/home-active.png">
        <span slot="label">Timeline</span>
      </tabbar-item>
      <tabbar-item selected>
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
    <toast v-model="isToastShow" type="text" :time="1500">{{toastContent}}</toast>
    <toast v-model="willToastShow" type="cancel" :time="1500">{{toastContent}}</toast>
    
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XButton, Card, Toast, XDialog, XTextarea, Group, CellBox, Previewer, Icon, AlertModule } from 'vux'
  import { setTimeout } from 'timers';
  import qiniu from 'qiniu-js'
  import schema from 'async-validator'

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
      CellBox, 
      Previewer, 
      Icon,
      AlertModule
    },
    data() {
      return {
        isToastShow: false,
        willToastShow: false,
        toastContent:'',
        isPlusShow: true,
        isPicShow: false,
        // isPlusShow: false,
        // isPicShow: true,
        avatar: '',
        data: {
          myPost:'',
          image_filename: ''
        },
        previewList: [],
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[0]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
        qnurl: '',
        isLoadingShow: false,
        isPosted: false,

      }
    },
    methods: {
      uploadClick(e) {
        let file = e.target.files[0];
        let filename=file.name;
        const imgtype=filename.substr(filename.lastIndexOf('.'));
        if (imgtype != ".png" && imgtype != ".jpeg" && imgtype != ".jpg" && imgtype != ".bmp" && imgtype != ".gif") 
        {
          AlertModule.show({
            title:'请选择图片文件',
            content: '格式为 png、jpeg、jpg、bmp、gif'
          });
          return false;
        }
        filename=Date.parse(new Date())+imgtype;
        let params = new FormData(); //创建form对象
        params.append('file',file);//通过append向form对象添加数据
        params.append('key',filename);//通过append向form对象添加数据
        // params.append('chunk','0');//断点传输
        // params.append('chunks','1');
        //获取7牛token
        rpc.call("qiniu_service.qiniu_upload_bucket","get_upload_token",[],{name:this.qiniu_txt}).then(res=>{ //token API
          let qntoken='';
          
          if(typeof(res.token.token)!="undefined"){
            qntoken=res.token.token;
          }
          else{
            qntoken=res.token;
          }
          params.append('token',qntoken);
          //   let config = {
          //   headers:{'Content-Type':'multipart/form-data'}
          // };  //添加请求头
          //7牛上传
          axios.post('http://upload-z2.qiniup.com',params).then(res=>{
            let src=this.qnurl;
            if(typeof(res.data)!='undefined'){
              src += res.data.key;
            }
            else if(typeof(res.key)!='undefined'){
              src += res.key;
            }
            this.data.image_filename = src;
            if (this.data.image_filename != '') {
              this.isPlusShow = false;
              this.isPicShow = true
            }
            this.previewList.push({src: src});
          }).catch(err => {
            console.log(err)  
          })
        }).catch(err=>{
          console.log(err)  
        })
      },
      clearbackimg() {
        this.data.image_filename = '';
        this.previewList = [];
        this.isPicShow = false;
        this.isPlusShow= true;
      },
      showimg() {
        this.$refs.previewer.show(0)
      },
      postArticle() {
        if (this.isPosted == false) {
          this.isLoadingShow = true
          this.isPosted = true;
          let descriptor = {
            content: {type: "string", required: true, message:"内容不能为空"},
          }
          let validator = new schema(descriptor);
          validator.validate({content: this.data.myPost.trim()}, (errors, fields) => {
            if(errors) {
              // validation failed, errors is an array of all errors
              // fields is an object keyed by field name with an array of
              // errors per field
              this.isLoadingShow = false;
              this.isPosted = false;
              this.willToastShow = true;
              this.toastContent = errors[0].message;
              return
            }
            // validation passed
            console.log('passed')
            // api
            // 下例
            // rpc.call(model, method, [], params).then(res => {
            //   if(res.error == false) {
            //     this.isToastShow = true;
            //     this.toastContent = '创建成功';
            //     this.isLoadingShow = false;
            //     setTimeout(() => {
            //       this.$router.push({path: '/'})
            //     }, 2000)
            //   } else {
            //     this.willToastShow = true;
            //     this.toastContent = res.message;
            //     this.isLoadingShow = false;
            //     this.isPosted = false;
            //   }
            // })
          });
        }
      }
    },
    mounted() {
      //从cookie获取当前用户avatar

      //假数据
      this.avatar = 'https://ws1.sinaimg.cn/large/006tNc79gy1ft81leymicj30yi1pce81.jpg'
      this.previewList = [{src: 'https://ws3.sinaimg.cn/large/006tNc79gy1fs2mbh2tx9j30g90fkjsd.jpg'}]
    }
  }
</script>

<style lang="less" scoped>
  .avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    object-fit: cover;
    margin-top: 8px;
  }
  .submit-btn {
    color: #fff;
    background-color: #16afff;
    width: 80%;
    border: 0;
    margin-top: 20px
  }
  
</style>
