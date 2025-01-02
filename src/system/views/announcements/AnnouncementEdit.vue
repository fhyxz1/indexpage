<template>
  <div class="announcement-edit">
    <h2>{{ isEdit ? '编辑公告' : '新建公告' }}</h2>
    
    <el-form :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入公告标题" />
      </el-form-item>
      
      <el-form-item label="内容">
        <el-input
          v-model="form.content"
          type="textarea"
          rows="6"
          placeholder="请输入公告内容"
        />
      </el-form-item>
      
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="草稿" value="draft" />
          <el-option label="已发布" value="published" />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEdit = !!route.params.id

const form = ref({
  title: '',
  content: '',
  status: 'draft'
})

onMounted(async () => {
  if (isEdit) {
    // 获取公告详情数据
  }
})

const handleSubmit = async () => {
  // 实现保存逻辑
}
</script> 