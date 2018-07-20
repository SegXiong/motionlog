<template>
  <div>
    <div class="content-box">
      <card >
        <div slot="content" class="card-content">
          <div class="logo-box">
            <img src = "../../assets/images/logo.png" class="avatar">
          </div>

          <button-tab v-model="tabIndex" class="btn-tab">
            <button-tab-item >登陆</button-tab-item>
            <button-tab-item >注册</button-tab-item>
          </button-tab>

          <div v-if="tabIndex==0">
            <group>
              <x-input v-model="login.account" placeholder="请输入邮箱">
                <div slot="label" class="input-label">账号</div>
              </x-input>
              <x-input type="password" v-model="login.password" placeholder="请输入" >
                <div slot="label" class="input-label">密码</div>
              </x-input>
            </group>

            <div style="text-align:center;">
              <x-button plain class="commit-btn" @click.native="onLoginClick" :show-loading="isLoadingShow">登录</x-button>
            </div>
          </div>

          <div v-if="tabIndex==1">
            <group>
              <x-input v-model="signup.account" placeholder="请输入邮箱">
                <div slot="label" class="input-label">账号</div>
              </x-input>
              <x-input type="password" v-model="signup.password" placeholder="请输入" >
                <div slot="label" class="input-label">密码</div>
              </x-input>
              <x-input type="password" v-model="password2" placeholder="请输入" >
                <div slot="label" class="input-label">确认密码</div>
              </x-input>
            </group>

            <div style="text-align:center;">
              <x-button plain class="commit-btn" @click.native="onSignupClick" :show-loading="isLoadingShow">提交</x-button>
            </div>
          </div>
          
        </div>        
      </card>
    </div>
    
    <toast v-model="isToastShow" type="text" :time="1500">{{toastContent}}</toast>
    <toast v-model="willToastShow" type="cancel" :time="1500">{{toastContent}}</toast>
    
  </div>
</template>

<script>
  import { XButton, Card, Toast, Group, ButtonTab, ButtonTabItem, XInput } from 'vux'
  import { setTimeout } from 'timers';
  import schema from 'async-validator'

  export default {
    components: {
      XButton,
      Card,
      Toast,
      Group,
      ButtonTab, 
      ButtonTabItem,
      XInput,
    },
    data() {
      return {
        isToastShow: false,
        toastContent:'',
        tabIndex:null,
        login: {
          account: '',
          password: '',
        },
        signup: {
          account: '',
          password: '',
        },
        password2: '',
        isLoadingShow: false,
        isPosted: false,
        willToastShow: false,
      }
    },
    methods: {
      onLoginClick() {
        if (this.isPosted == false) {
          this.isLoadingShow = true
          this.isPosted = true;
          let descriptor = {
            account: {type: "email", required: true, message:"账号为邮箱，且必填"},
            passwrd: {type: "string", required: true, min: 8, message:"密码至少8位，且必填"}
          }
          let validator = new schema(descriptor);
          validator.validate({account: this.login.account.trim(), passwrd: this.login.password.trim()}, (errors, fields) => {
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
      },
      onSignupClick() {
        if (this.isPosted == false) {
          this.isLoadingShow = true;
          this.isPosted = true;
          let descriptor = {
            account: {type: "email", required: true, message:"账号为邮箱，且必填"},
            passwrd: {type: "string", required: true, min: 8, message:"密码至少8位，且必填"},
            password2(rule, value, callback, source, options) {
              var errors = [];
              if(source.passwrd != source.password2) {
                errors.push(
                  new Error(
                    "两次密码不一致"));
                console.log(errors)
              }
              callback(errors);
            }
          }
          let validator = new schema(descriptor);
          validator.validate({account: this.signup.account.trim(), passwrd: this.signup.password.trim(), password2: this.password2}, (errors, fields) => {
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
      
    },
    created() {
      this.tabIndex = parseInt(this.$route.query.tabIndex)
    },
  }
</script>

<style scoped>
  .card-content {
    height: 100vh;
  }
  .logo-box {
    text-align: center;
    padding: 45px 0;
  }
  .avatar {
    height: 97px;
    width: 156px;
    object-fit: cover;
  }
  .btn-tab {
    padding:15px; 
    width:300px;  
    margin:0 auto;
  }
  .vux-button-group > a.vux-button-tab-item-first:after,
  .vux-button-group > a.vux-button-tab-item-last:after {
    border: 1px solid #16afff;
  }
  .vux-button-group > a.vux-button-group-current {
    color: #FFF;
    background: #16afff;
  }
  .input-label {
    width: 105px;
    text-align: right;
    padding-right: 15px;
    margin-right: 15px;
    border-right: 1px solid #ccc;
  }
  .commit-btn {
    border-color: #16afff;
    background-color: #16afff;
    color: #FFF;
    margin: 45px auto;
    width: 50%;
    border-radius: 30px;
  }
</style>
