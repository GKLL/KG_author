<template>
    <div>
        <quill-editor
          ref="myTextEditor"
          :options="editorOption"
          @change="onChange"
          @blur="onBlur"
          :blurActive="blurActive"
          :changeBlurActive="changeBlurActive"
          :uploadUrl="uploadUrl"
          v-model='mycontent'
        >
            <div id="toolbar" slot="toolbar">
                <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
                <!-- <span class="ql-formats"><button type="button" class="ql-strike"></button></span> -->
                <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                <!-- <span class="ql-formats"><button type="button" class="ql-code-block"></button></span> -->
                <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
      <!-- <span class="ql-formats"><select class="ql-size">
        <option value="small">小</option>
        <option selected>正常</option>
        <option value="large">中</option>
        <option value="huge">大</option>
      </select></span> -->

    <span class="ql-formats"><select class="ql-color" ref="colorPicker">
  <!-- <option ></option> -->
  <option selected="selected" value="#000"></option>
  <option value="#FF3333"></option>
>
</select></span>
  <span class="ql-formats">
    <select class="ql-align">
    <option selected="selected"></option>
    <option value="center"></option>
    <option value="right"></option>
    <option value="justify"></option>
  </select>
  </span>
      <span class="ql-formats">
          <button type="button" class="ql-link"></button>
      </span>
      <span class="ql-formats">
          <button type="button" @click="imgClick">
            <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
            </svg>
          </button>
      </span>
     </div>
        </quill-editor>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import axios from "axios";
import $ from "jquery";
import C from "./../../assets/js/config.js";
// import CropUpload from './CropUpload';
export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: String
    },
    /*上传图片的地址*/
    /*            uploadUrl: {
                type: String
            },*/
    /*上传图片的file控件name*/
    fileName: {
      type: String
    },
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 400 //kb
    },
    /*使用使用裁切*/
    canCrop: {
      type: Boolean,
      default: false
    },
    /*裁切的最小尺寸*/
    width: {
      type: Number,
      default: 200
    },
    /*裁切的最小尺寸*/
    height: {
      type: Number,
      default: 800
    },

    onEditorChange: {},
    onEditorBlur: {},
    content: {},
    changeContent: {},
    blurActive: false,
    changeBlurActive: {}
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: "#toolbar"
        }
      },
      uploadUrl: "",
      /*显示裁切控件*/
      showCrop: false,
      timer: null,
      mycontent:this.content
    };
  },
  methods: {
    onChange({ editor, html, text }) {
      this.onEditorChange(html, text);
    },
    onBlur() {
      this.onEditorBlur();
      let $editor = $(this.$refs.myTextEditor.$el).find(".ql-editor");
      let html = $editor.find("p").html();
      if (html.indexOf("&nbsp;") > -1) {
        let flag = html.endsWith("&nbsp;");
        if (flag) {
          if (html.match(/&nbsp;/g).length > 1) {
            html = html.replace(/&nbsp;/g, "");
            html += "&nbsp;";
            $editor.find("p").html(html);
            var sel = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents($editor.find("p")[0]);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } else {
          html = html.replace(/&nbsp;/g, "");
          $editor.find("p").html(html);
          var sel = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents($editor.find("p")[0]);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    },
    /*选择上传图片切换*/
    onFileChange(e) {
    
      var fileInput = e.target;
      if (fileInput.files.length == 0) {
        return;
      }
      if (fileInput.files[0].size > 1024 * 1024 * 2) {
        this.$message({
          type:'warning',
          message:'上传图片大于2M，请重新选择'
        })
        return;
      }
     
      var self = this;
      var formData = new FormData();
      formData.append("name", "file");
      formData.append("file", fileInput.files[0]);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.post(
          C.uploadImgUrlHost,
          formData,
          config
        )
        .then(function(res) {
          console.log(res)
          if(res.data.code === '10000') {
             const url = C.imgHost + res.data.responseBody[0].filePath
              self.editor.insertEmbed(
                self.editor.getSelection().index,
                "image",
                url
              );
          }else {
            self.$message({
              type:'warning',
              message:res.data.message
            })
          }
         
          // }
        })
        .catch(function(error) {});
    },
    /*裁切上传成功 res根据上传接口值获取*/
    onUploadSuccess: function(res) {
      this.editor.focus();
      this.editor.insertEmbed(
        this.editor.getSelection().index,
        "image",
        res.url
      );
    },
    /*点击上传图片按钮*/
    imgClick() {
      /*创建input file 不裁切，自己控制*/
      var input = document.createElement("input");
      input.type = "file";
      input.name = this.fileName;
      input.accept = "image/jpeg,image/png,image/jpg";
      input.onchange = this.onFileChange;
      input.click();
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },
  components: {
    quillEditor
  },
  mounted() {
   
  },
  watch: {
    content(val) {
      this.mycontent =val
    }
  },
};
</script>
<style>
.ql-toolbar {
  margin-top: 30px;
  border: 0 !important;
  border-top: 1px solid #ebebeb !important;
  border-bottom: 1px solid #ebebeb !important;
  padding-bottom: 30px !important;
  padding-top: 30px !important;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 600px;
}
.ql-size-huge {
  line-height: 50px !important;
}
.ql-size-large {
  line-height: 40px !important;
}
.ql-size-small {
  line-height: 18px !important;
}
.ql-container.ql-snow,
.ql-editor p,
.ql-editor ol,
.ql-editor ul,
.ql-editor pre,
.ql-editor blockquote,
.article pre,
.article p {
  border: 0 !important;
  margin-bottom: 28px !important;
  line-height: 28px;
  font-family: "微软雅黑", "PingFangSC";
  font-size: 16px;
  color: #666;
  word-break: break-word;
  word-wrap: break-word;
}
.ql-editor h1 {
  border: 0 !important;
  margin-bottom: 28px !important;
  line-height: 40px;
  font-family: "微软雅黑", "PingFangSC";
  font-size: 16px;
  word-break: break-word;
  word-wrap: break-word;
}
.ql-editor h2 {
  border: 0 !important;
  margin-bottom: 28px !important;
  font-family: "微软雅黑", "PingFangSC";
  font-size: 16px;
  word-break: break-word;
  word-wrap: break-word;
   color: #333;
}
.ql-container.ql-snow {
  border-bottom: 1px solid #ebebeb !important;
}
.ql-editor.ql-blank::before {
  font-size: 16px;
  font-style: inherit !important;
  color: #999 !important;
}
.article .ql-align-center {
  text-align: center;
}
.article .ql-align-right {
  text-align: right;
}
.article .ql-align-center img {
  margin: 0 auto;
}
.ql-editor h1 {
  font-size: 20px;
  color: #333333;
}
.ql-editor .ql-video {
  width: 100% !important;
  min-height: 520px !important;
}
</style>
