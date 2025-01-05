<template>
    <div class="announcement-list">
      <div class="header">
        <h2>公告管理</h2>
        <el-button type="primary" @click="$router.push('/system/announcements/edit')">
          新建公告
        </el-button>
      </div>
  
      <el-table :data="announcements" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="createAt" label="发布时间" width="180">
          <template #default="{ row }">
            {{ formatTime(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="active" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.isActive === 1 ? 'success' : 'info'"
            >
              {{ formatStatus(row.isActive) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="$router.push(`/system/announcements/edit/${row.id}`)">
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row.id)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import dayjs from 'dayjs'
  
  const router = useRouter()
  const announcements = ref([])
  
  const formatTime = (time) => {
    return time ? dayjs(time).format('YYYY-MM-DD HH:mm') : '无'
  }
  
  const formatStatus = (isActive) => {
    return isActive === 1 ? '已发布' : '草稿'
  }
  
  const getAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/announcements/list')
      announcements.value = response.data
    } catch (error) {
      console.error('获取公告列表失败:', error)
    }
  }
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/announcements/${id}`)
      getAnnouncements()
    } catch (error) {
      console.error('删除公告失败:', error)
    }
  }
  
  onMounted(getAnnouncements)
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .el-table-column {
    text-align: center;
  }
  
  .el-tag {
    font-size: 12px;
  }
  </style>
  