<template>
  <div class="blog-edit">
    <el-card class="edit-card">
      <template #header>
        <div class="card-header">
          <h2>{{ isEdit ? '编辑博客' : '新建博客' }}</h2>
          <div class="header-buttons">
            <el-button type="primary" @click="handleSubmit" :loading="saving">
              <el-icon><Check /></el-icon>保存
            </el-button>
            <el-button @click="handleCancel">
              <el-icon><Back /></el-icon>返回
            </el-button>
          </div>
        </div>
      </template>
      
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="博客标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入博客标题" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author" placeholder="请输入作者" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="博客内容" prop="content">
          <div class="editor-container">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 500px; overflow-y: hidden;"
              v-model="form.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
              @onChange="handleChange"
            />
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 图片上传对话框 -->
    <el-dialog
      v-model="uploadDialogVisible"
      title="上传图片"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-upload
        class="upload-container"
        drag
        action="http://localhost:8080/api/images/upload"  
        :auto-upload="true"
        :show-file-list="true"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :before-upload="beforeUpload"
        withCredentials:true
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽文件到此处或 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持 jpg/png 文件，且不超过 5MB
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, shallowRef, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Check, Back, UploadFilled } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)
const saving = ref(false)
const uploadDialogVisible = ref(false)
const currentInsertFn = ref(null)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const isEdit = computed(() => !!route.params.id)

const form = ref({
  title: '',
  author: '',
  content: ''
})

const rules = {
  title: [{ required: true, message: '请输入博客标题', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
  content: [{ required: true, message: '请输入博客内容', trigger: 'blur' }]
}

onMounted(() => {
  if (isEdit.value) {
    // 实际项目中这里应该调用API获取博客详情
    form.value = {
      title: '示例博客标题',
      author: '作者',
      content: '<p>博客内容...</p>'
    }
  }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor
}

const handleChange = (editor) => {
  form.value.content = editor.getHtml()
}

// 配置图片上传
const customUpload = {
  async customUpload(file, insertFn) {
    // 保存插入图片的回调函数
    currentInsertFn.value = insertFn
    uploadDialogVisible.value = true
  }
}

const mode = 'default'
const toolbarConfig = {
  excludeKeys: [
    'uploadVideo',
    'insertTable'
  ]
}

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: customUpload
  }
}

// 处理图片上传
const handleUploadSuccess = (response) => {
  // if (!response.data) {
  //   ElMessage.error('上传响应数据无效')
  //   return
  // }
  
  // 直接拼接完整的URL
  const baseUrl = 'http://localhost:8080'
  const img=response.url
  const imageUrl = `${baseUrl}${img}` 
  
  if (currentInsertFn.value) {
    // 将完整URL传入编辑器
    currentInsertFn.value(imageUrl, '图片', imageUrl)
    currentInsertFn.value = null
    uploadDialogVisible.value = false
    ElMessage.success('图片上传成功')
    console.log('插入的图片URL:', imageUrl) // 添加日志便于调试
  } else {
    ElMessage.error('图片插入函数未找到')
  }
}

const handleUploadError = () => {
  ElMessage.error('图片上传失败')
  console.log('图片上传失败'+error)
}

const beforeUpload = (file) => {
  const isImage = /^image\/(jpeg|png|gif)$/.test(file.type)
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB！')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      saving.value = true
      // 实际项目中这里应该调用保存API
      setTimeout(() => {
        ElMessage.success('保存成功')
        saving.value = false
        router.push('/system/blog')
      }, 1000)
    }
  })
}

const handleCancel = () => {
  ElMessage.warning('已取消编辑')
  router.back()
}
</script>

<style scoped>
.blog-edit {
  padding: 20px;
}

.edit-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.editor-container {
  border: 1px solid #ccc;
  z-index: 100;
  background: white;
}

.upload-container {
  display: flex;
  justify-content: center;
}

:deep(.el-upload-dragger) {
  width: 360px;
}

:deep(.el-card__header) {
  padding: 15px 20px;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
