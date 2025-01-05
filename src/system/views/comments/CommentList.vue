<template>
  <div class="Guestbook-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>留言管理</span>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="待审核" value="pending" />
            <el-option label="已通过" value="approved" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 留言列表 -->
      <el-table :data="paginatedGuestbooks" v-loading="loading" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="content" label="留言内容" show-overflow-tooltip />
        <el-table-column prop="createTime" label="留言时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button 
                v-if="row.status === 'pending'"
                type="success" 
                link
                @click="handleApprove(row)"
              >
                通过
              </el-button>
              <el-button 
                v-if="row.status === 'pending'"
                type="danger" 
                link
                @click="handleReject(row)"
              >
                拒绝
              </el-button>
              <el-button 
                type="primary" 
                link
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

// 定义接口
interface Guestbook {
  id: number;
  username: string;
  content: string;
  createTime: string;
  status: string;
}

interface SearchForm {
  username: string;
  status: string;
}

// 状态定义
const loading = ref(false);
const allGuestbooks = ref<Guestbook[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 搜索表单
const searchForm = ref<SearchForm>({
  username: '',
  status: ''
});

// 工具方法
const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'danger'
  };
  return types[status] || 'info';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'pending': '待审核',
    'approved': '已通过',
    'rejected': '已拒绝'
  };
  return labels[status] || '未知';
};

// 处理过滤和分页
const filteredGuestbooks = computed(() => {
  return allGuestbooks.value.filter(Guestbook => {
    const matchesUsername = !searchForm.value.username || Guestbook.username.includes(searchForm.value.username);
    const matchesStatus = !searchForm.value.status || Guestbook.status === searchForm.value.status;
    return matchesUsername && matchesStatus;
  });
});

const paginatedGuestbooks = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  total.value = filteredGuestbooks.value.length;
  return filteredGuestbooks.value.slice(start, end);
});

// 获取留言列表
const fetchGuestbookList = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:8080/api/guestbook/getlist');
    allGuestbooks.value =response.data
    console.log(response.data);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElMessage.error('获取留言列表失败');
  } finally {
    loading.value = false;
  }
};

// 搜索相关方法
const handleSearch = () => {
  currentPage.value = 1;
};

const resetSearch = () => {
  searchForm.value = {
    username: '',
    status: ''
  };
  handleSearch();
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

// 留言操作相关方法
const handleApprove = async (row: Guestbook) => {
  try {
    await axios.post(`http://localhost:8080/api/guestbook/${row.id}/approve`);
    ElMessage.success('审核通过成功');
    fetchGuestbookList();
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

const handleReject = async (row: Guestbook) => {
  try {
    await axios.post(`http://localhost:8080/api/guestbook/${row.id}/reject`);
    ElMessage.success('拒绝成功');
    fetchGuestbookList();
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

const handleDelete = (row: Guestbook) => {
  ElMessageBox.confirm(
    '确定要删除该留言吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      await axios.delete(`http://localhost:8080/api/guestbook/${row.id}`);
      ElMessage.success('删除成功');
      fetchGuestbookList();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  });
};

// 初始化
onMounted(() => {
  fetchGuestbookList();
});
</script>

<style scoped>
.Guestbook-list {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-form {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table) {
  margin-top: 20px;
}
</style>
