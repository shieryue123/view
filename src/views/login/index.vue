<template>
  <div class="page login-page">
    <img src="//img.dmallcdn.com//dshop/201912/13b7b397-1d7b-4fda-80df-1c4030410765" class="banner" />
    <div class="form-wrap">
      <el-form :mode="formData" :rule="formRule" ref="form">
        <el-form-item>
          <el-input v-model="formData.phone" type="phone" placeholder="请输入您的手机号" />
          <el-button
            transparent
            class="get-code-btn"
            type="primary"
            radius
            :disabled="btnDisabled"
            @click="getCode"
          >{{time === 0 ? '获取验证码' : time + '秒后重新获取'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.code"  type="code" placeholder="请输入手机短信验证码" />
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" radius @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        phone: '',
        code: ''
      },
      formRule: {
        phone: [
          { required: true, message: '手机号不能为空' },
          { type: 'phone', message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { regexp: /\d{6}/, message: '验证吗是6位数字' }
        ]
      },
      time: 0
    }
  },
  computed: {
    btnDisabled () {
      return !(this.time <= 0)
    }
  },
  methods: {
    countdown () {
      this.time = 30
      const interval = setInterval(() => {
        this.time -= 1
        if (this.time <= 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    getCode () {
      console.log(this.$router.currentRoute === this.$route)
      this.countdown()
      this.$api.user.message_code({
        phone: this.formData.phone
      }).then((res) => {
        console.log(res)
      })
    },
    onSubmit () {
      this.$refs.form.validate().then((value) => {
        this.$store.dispatch('user/login', value).then((res) => {
          const path = this.$route.query.callbackUrl || '/home'
          this.$router.replace(path)
        })
      }).catch((error) => {
        this.$message.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  @include wh(100%, auto);
  margin-bottom: 20px;
}
.get-code-btn {
   display: inline-block;
   flex-shrink: 0;
   width: auto;
   padding: 0 40px;
}
.btn-group {
  margin: 0 20px;
  margin-top: 40px;
}
</style>
