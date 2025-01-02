<template>
  <div class="comment-list">
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
      <el-table :data="commentList" v-loading="loading" border>
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
                @click="handleReply(row)"
              >
                回复
              </el-button>
              <el-button 
                type="danger" 
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

    <!-- 回复对话框 -->
    <el-dialog
      v-model="replyDialogVisible"
      title="回复留言"
      width="500px"
    >
      <el-form
        ref="replyFormRef"
        :model="replyForm"
        :rules="replyRules"
      >
        <el-form-item 
          label="回复内容" 
          prop="content"
          :label-width="'80px'"
        >
          <el-input
            v-model="replyForm.content"
            type="textarea"
            :rows="4"
            placeholder="请输入回复内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="replyDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitReply">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';

// 定义接口
interface Comment {
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
const commentList = ref<Comment[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const replyDialogVisible = ref(false);
const replyFormRef = ref<FormInstance>();

// 搜索表单
const searchForm = ref<SearchForm>({
  username: '',
  status: ''
});

// 回复表单
const replyForm = ref({
  commentId: null as number | null,
  content: ''
});

// 回复表单验证规则
const replyRules = {
  content: [
    { required: true, message: '请输入回复内容', trigger: 'blur' },
    { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
  ]
};

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

// 获取留言列表
const fetchCommentList = async () => {
  loading.value = true;
  try {
    // TODO: 调用后端API获取留言列表
    // const { data } = await getCommentList({
    //   page: currentPage.value,
    //   pageSize: pageSize.value,
    //   ...searchForm.value
    // });
    // commentList.value = data.list;
    // total.value = data.total;
  } catch (error) {
    ElMessage.error('获取留言列表失败');
  } finally {
    loading.value = false;
  }
};

// 搜索相关方法
const handleSearch = () => {
  currentPage.value = 1;
  fetchCommentList();
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
  fetchCommentList();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchCommentList();
};

// 留言操作相关方法
const handleApprove = async (row: Comment) => {
  try {
    // TODO: 调用后端API通过留言
    // await approveComment(row.id);
    ElMessage.success('审核通过成功');
    fetchCommentList();
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

const handleReject = async (row: Comment) => {
  try {
    // TODO: 调用后端API拒绝留言
    // await rejectComment(row.id);
    ElMessage.success('拒绝成功');
    fetchCommentList();
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

const handleReply = (row: Comment) => {
  replyForm.value = {
    commentId: row.id,
    content: ''
  };
  replyDialogVisible.value = true;
};

const submitReply = async () => {
  if (!replyFormRef.value) return;
  
  await replyFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // TODO: 调用后端API提交回复
        // await replyComment(replyForm.value);
        ElMessage.success('回复成功');
        replyDialogVisible.value = false;
        fetchCommentList();
      } catch (error) {
        ElMessage.error('回复失败');
      }
    }
  });
};

const handleDelete = (row: Comment) => {
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
      // TODO: 调用后端API删除留言
      // await deleteComment(row.id);
      ElMessage.success('删除成功');
      fetchCommentList();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  });
};

// 初始化
onMounted(() => {
  fetchCommentList();
});
</script>

<style scoped>
.comment-list {
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

.dialog-footer {
  padding-top: 20px;
  text-align: right;
}
</style> 