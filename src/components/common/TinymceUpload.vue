<template>
  <!-- <div class="modal-upload" v-if="panelShow"> -->
  <div class="modal-upload" v-if="Show">
    <div class="modal-mask"></div>
    <div class="model-alert">
      <div>
        <i @click="Close" style="display:flex;justify-content:flex-end;margin: 10px;" class="el-icon-close"></i>
      </div>
      <el-upload
        ref="doctypeCrfile"
        name="file"
        action="/api/api/dichan/company/fileUpLoad"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="9999"
        :on-success="handleSuccess"
      >
        <el-button size="mini" type="primary">选择本地图片</el-button>
      </el-upload>
       <div style="margin: 20px;display:flex;flex-wrap: wrap;">
         <div style="margin: 10px;" :class="imgid==i?'on':''" @click="imgclick(i,itme)"  v-for="(itme,i) in photographUrllist" :key="i" >
           <img   :src="itme" alt="">
         </div>
       </div>

          <el-button @click="confirm" style="display:block;margin:0 auto" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    panelShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      imgid: -1,
      Show: true,
      imgUrl: [],
      // photographUrllist: ['https://www.tjsichuang.cn:1443/api/dichan/category/getPicture?id=320', 'https://www.tjsichuang.cn:1443/api/dichan/category/getPicture?id=318']
      photographUrllist: []
    }
  },
  watch: {
    panelShow: {
      handler (newValue, oldValue) {
        if (newValue && !oldValue) {
          // setTimeout(() => { // 模拟上传成功
          //   // this.$emit('successUpload', ['http://placehold.it/100x150/eeee00/000000', 'http://placehold.it/200x350'])
          //   // this.$emit('hidePanel', false)
          // }, 1500)
        }
      },
      immediate: true
    }
  },
  methods: {
    confirm () {
      this.$emit('successUpload', this.imgUrl)
      this.Show = false
    },
    imgclick (e, itme) {
      this.imgid = e
      console.log(e)
      console.log(itme)
      this.imgUrl = []
      this.imgUrl.push(itme)
    },
    Close () {
      this.Show = !this.Show
    },
    handlePreview (file) {
      console.log(file)
      // eslint-disable-next-line no-undef
      // var fileUrl = library.isEmpty(file.url) ? file.response.url : file.url
      // eslint-disable-next-line no-undef
      // fileUrl = fileUrl.indexOf(apis.api_file_urlNew) >= 0 ? fileUrl : (apis.api_file_urlNew + fileUrl)
      // window.open(fileUrl)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      for (var i = 0; i < this.fileList.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.fileList[i].uid == file.uid) {
          this.fileList.splice(i, 1)
          break
        }
      }
    },
    beforeRemove (file, fileList) {
      // eslint-disable-next-line eqeqeq
      if (this.Qualified == '') {
        return this.$confirm(`确定移除 ${file.name}？`)
        // eslint-disable-next-line eqeqeq
      } else if (this.Qualified == '1') {
        return true
      }
    },
    handleSuccess (response) {
      // eslint-disable-next-line eqeqeq
      console.log(response)
      this.photographUrllist.push(response.data)
      if (response.status === 200) {
        this.$message.success('上传成功')
        this.uploadVisible = false
      }
    },
    uploadConfirm () {
      var vm = this
      vm.$refs.doctypeCrfile.submit()
      this.centerDialogEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
%fixed {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal-upload {
  .modal-mask {
    @extend %fixed;
    background-color: rgba($color: #F6F6F6F6, $alpha: 0.5);
    z-index: 1000000000;
  }
  .model-alert {
    @extend %fixed;
    width: 40%;
    height: 80%;
    background-color: #fff;
    z-index: 10000000000;
    border: 1px solid #CCCCCC;
    margin: auto;
    overflow:auto;
  }
  img {
    width: 80px;
    height: 100px;

  }
  .on {
    border:1px solid brown;
  }
}
</style>
