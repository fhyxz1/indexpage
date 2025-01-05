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
        <el-table-column prop="postId" label="文章ID" width="100" align="center" />
        <el-table-column prop="title" label="标题">
          <template #default="scope">
            <div class="title-cell">
              <el-text truncated>{{ scope.row.title }}</el-text>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120" align="center" />
        <el-table-column prop="fbDate" label="创建时间" width="180" align="center" />
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
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const blogList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// API调用
const loadData = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:8080/api/article', {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value
      }
    })
    console.log(response.data)
    blogList.value = response.data.items || response.data // 根据实际返回结构调整
    total.value = response.data.total || response.data.length
  } catch (error) {
    console.error('获取博客列表失败:', error)
    ElMessage.error('获取博客列表失败')
  } finally {
    loading.value = false
  }
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
  router.push(`/system/blog/detail/${row.postId}`)
}

const handleEdit = (row) => {
  router.push(`/system/blog/edit/${row.postId}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这篇博客吗？此操作不可恢复',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true
      }
    )
    
    await axios.delete(`http://localhost:8080/api/articles/${row.postId}`)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除博客失败:', error)
      ElMessage.error('删除失败')
    }
  }
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
