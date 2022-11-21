<template>
  <div class="edit-page">
    <el-form :mode="formData" :rule="formRule" ref="form">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" type="text" placeholder="请输入收货人姓名" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.phone" type="phone" placeholder="请输入您的手机号" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.location.addressComponent" placeholder="选择小区、街道、大厦" readonly @click.native="$router.push('/map')" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="formData.address" placeholder="请输入详细地址" />
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  name: 'EditAddress',
  data () {
    return {
      formData: {
        name: '12312',
        phone: '',
        address: '',
        location: {}
      },
      editFlg: false,
      formRule: {}
    }
  },
  created () {
    this.setFormData()
  },
  activated () {
    this.setFormData()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path !== '/map') {
      if (this.editFlg) {
        storage.removeItem('consignee')
        next()
      } else {
        if (confirm('编辑未完成是否离开？')) {
          storage.removeItem('consignee')
          next()
        } else {
          next(false)
        }
      }
    } else {
      storage.setItem('consignee', this.formData, {
        maxAge: 1000 * 60 * 60 * 2
      })
      next()
    }
  },
  methods: {
    setFormData () {
      const consignee = storage.getItem('consignee') || {
        name: '',
        phone: '',
        address: '',
        location: {}
      }
      this.formData = consignee
    },
    submit () {
      this.$api.address.create(this.formData).then(() => {
        this.editFlg = true
        this.$store.dispatch('user/address')
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-page {
  .btn-group {
    margin-top: 40px;
  }
  /deep/ .form-item {
    box-sizing: padding-box;
    height: 98px;
  }
}
</style>
