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
      <el-table-column prop="createTime" label="发布时间" width="180" />
      <el-table-column prop="status" label="状态" width="100" />
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
import { ref } from 'vue'

const announcements = ref([])

const handleDelete = async (id) => {
  // 实现删除逻辑
}
</script> 