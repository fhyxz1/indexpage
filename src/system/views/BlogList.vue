<template>
  <div class="blog-list">
    <el-card class="list-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h2>博客列表</h2>
            <el-tag type="info" class="count-tag">共 {{ blogList.length }} 篇</el-tag>
          </div>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>新建博客
          </el-button>
        </div>
      </template>

      <el-table 
        :data="blogList" 
        style="width: 100%"
        v-loading="loading"
        border
        stripe
      >
        <el-table-column prop="title" label="标题">
          <template #default="scope">
            <div class="title-cell">
              <el-text truncated>{{ scope.row.title }}</el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="180" align="center" />
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="scope">
            <el-button-group>
              <el-button type="primary" link @click="handleView(scope.row)">
                <el-icon><View /></el-icon>查看
              </el-button>
              <el-button type="primary" link @click="handleEdit(scope.row)">
                <el-icon><Edit /></el-icon>编辑
              </el-button>
              <el-button type="danger" link @click="handleDelete(scope.row)">
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container" v-if="blogList.length > 0">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, View, Edit, Delete } from '@element-plus/icons-vue'

const router = useRouter()
const loading = ref(false)
const blogList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模拟数据
const mockData = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  title: `示例博客标题${index + 1} - 这是一个较长的标题，用于测试省略号效果`,
  author: `作者${index + 1}`,
  createTime: '2024-12-07 12:00:00'
}))

const loadData = () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    total.value = mockData.length
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    blogList.value = mockData.slice(start, end)
    loading.value = false
  }, 500)
}

onMounted(() => {
  loadData()
})

const handleSizeChange = (val) => {
  pageSize.value = val
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

const handleAdd = () => {
  router.push('/system/blog/edit')
}

const handleView = (row) => {
  router.push(`/system/blog/detail/${row.id}`)
}

const handleEdit = (row) => {
  router.push(`/system/blog/edit/${row.id}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除这篇博客吗？此操作不可恢复',
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true
    }
  ).then(() => {
    // 实际项目中这里应该调用删除API
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    loadData() // 重新加载数据
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    })
  })
}
</script>

<style scoped>
.blog-list {
  padding: 20px;
}

.list-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.count-tag {
  margin-left: 8px;
}

.title-cell {
  max-width: 500px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-card__header) {
  padding: 15px 20px;
}

:deep(.el-button-group) {
  display: flex;
  gap: 8px;
}
</style>
