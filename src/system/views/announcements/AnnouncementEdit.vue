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
          <el-select v-model="form.isActive"
          placeholder="请选择状态">
            <el-option label="草稿" :value=0 />
            <el-option label="已发布" :value=1 />
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
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  const route = useRoute()
  const isEdit = !!route.params.id
  
  const form = ref({
    title: '',
    content: '',
    isActive: ''
  })
  
  onMounted(async () => {
    if (isEdit) {
      try {
        const response = await axios.get(`http://localhost:8080/api/announcements/${route.params.id}`)
        form.value = response.data
      } catch (error) {
        console.error('加载公告详情失败:', error)
      }
    }
  })
  
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        console.log(form.value)
        await axios.put(`http://localhost:8080/api/announcements/update/${route.params.id}`, form.value)
      } else {
        await axios.post('http://localhost:8080/api/announcements', form.value)
      }
      router.push('/system/announcements')
    } catch (error) {
      console.error('保存公告失败:', error)
    }
  }
  </script>
  