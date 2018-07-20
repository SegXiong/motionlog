<template>
  <div class="content-box">
    <x-header :left-options="{backText: ''}" style="background-color:#16afff; position: fixed; top: 0; z-index: 1; width: 100%">设置
      <img slot="left" :src="avatar" alt="avatar" class="avatar">
    </x-header>
    <div class="option-card">
      <card >
        <div slot="content">
          <group gutter="0">
            <cell title="头像" is-link @click.native="onAvatarChange">
              <img slot="icon" width="20" style="display:block;margin-right:15px;" src="../../assets/images/avatar.png" alt="icon">
              <img width="20" style="display:block;" :src="avatar" alt="icon" class="my-avatar">
            </cell>
            <cell title="昵称" is-link :value="name" @click.native="onNametagChange">
              <img slot="icon" width="20" style="display:block; margin-right: 15px;" src="../../assets/images/name-tag.png" alt="icon">
            </cell>
            <cell title="签名" is-link :value="getTruncate(moto)" @click.native="onMotoChange">
              <img slot="icon" width="20" style="display:block; margin-right: 15px;" src="../../assets/images/signature.png" alt="icon">
            </cell>
          </group>
        </div>
      </card>
    </div>

    <div>
      <popup v-model="isAvatarShow" height="100%">
        <div class="popup1">
          <div class="image-box">
            <img class="preview-img" :src="avatarTemp">
          </div>
          <x-button plain style="border:1px solid #eca527; width: 80%; color: #eca527; touch-action: none;">上传照片</x-button>
          <input type="file"  name="fileupload"  @change="uploadClick" ref="upFile" style="width:80% ;height:42px; position:absolute; z-index:1; top: 409px; left: 10%; opacity:0; touch-action: none; background-color: red;">
          <x-button plain @click.native="onAvatarSubmit" class="m-btn">完成</x-button>
          <x-button plain @click.native="isAvatarShow=!isAvatarShow" class="c-btn">取消</x-button>
        </div>
      </popup>
    </div>

    <div>
      <popup v-model="isNametagShow" height="100%">
        <div class="popup1">
          <group>
            <x-input v-model="nameTemp" placeholder="请输入昵称"></x-input>
          </group>
          <x-button plain @click.native="onNametagSubmit" class="m-btn">完成</x-button>
          <x-button plain @click.native="isNametagShow=!isNametagShow" class="c-btn">取消</x-button>
        </div>
      </popup>
    </div>

    <div>
      <popup v-model="isMotoShow" height="100%">
        <div class="popup1">
          <group>
            <x-input v-model="motoTemp" placeholder="请输入签名"></x-input>
          </group>
          <x-button plain @click.native="onMotoSubmit" class="m-btn">完成</x-button>
          <x-button plain @click.native="isMotoShow=!isMotoShow" class="c-btn">取消</x-button>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import { Card, Cell, Group, Popup, XButton, XInput, XHeader, AlertModule } from 'vux'

  export default {
    components: {
      Card,
      Cell,
      Group,
      Popup,
      XButton,
      XInput,
      XHeader,
      AlertModule
    },
    data() {
      return {
        uid: null,
        avatar: "",
        avatarTemp:'',
        name: "",
        nameTemp:'',
        moto:"",
        motoTemp:'',
        isAvatarShow: false,
        isNametagShow: false,
        isMotoShow: false,

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
            this.avatarTemp = src;
          }).catch(err => {
            console.log(err)  
          })
        }).catch(err=>{
          console.log(err)  
        })
      },
      getTruncate(s) {
        if (s.length <= 10) {
          return s;
        } else {
          return s.substr(0, 8) + '...';
        }
      },
      onAvatarChange() {
        this.avatarTemp = this.avatar;
        this.isAvatarShow = true;
      },
      onNametagChange() {
        this.nameTemp = this.name;
        this.isNametagShow = true;
      },
      onMotoChange() {
        this.motoTemp = this.moto;
        this.isMotoShow = true;
      },
      onAvatarSubmit() {
        //修改头像api

        this.avatar = this.avatarTemp;
        this.isAvatarShow = false;
      },
      onNametagSubmit() {
        //修改昵称api

        this.name = this.nameTemp;
        this.isNametagShow = false;
      },
      onMotoSubmit() {
        //修改签名api

        this.moto = this.motoTemp;
        this.isMotoShow = false;
      }
    },
    mounted() {
      this.uid = this.$route.query.id;
      this.name = this.$route.query.name;
      this.avatar = this.$route.query.avatar;
      this.moto = this.$route.query.moto;
    }
  }
</script>

<style scoped>
  .content-box {
    margin-top: 60px;
    margin-bottom: 10px;
  }
  .option-card {
    margin-top: 12px;
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
  .my-avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    object-fit: cover;
  }
  .m-btn {
    color: #fff;
    background-color: #16afff;
    width: 80%;
    border: 0;
    margin-top: 20px
  }
  .c-btn {
    color: #16afff;
    width: 80%;
    border: 1px solid #16afff;
    margin-top: 20px;
  }
  .preview-img {
    height: 300px;
    width: 300px;
    object-fit: cover;
  }
  .image-box {
    margin: 50px auto;
    text-align: center;
  }
</style>
