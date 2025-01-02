<template>
  <div class="user-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">新增用户</el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.roleid" placeholder="请选择角色">
            <el-option label="全部" value="" />
            <el-option label="管理员" value="2" />
            <el-option label="普通用户" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 用户列表 -->
      <el-table :data="userList" v-loading="loading" border>
        <el-table-column prop="userid" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="fullname" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="roleid" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.roleid === 1 ? 'info' : 'danger'">
              {{ row.roleid === 1 ? '普通用户' : '管理员' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" link @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button type="primary" link @click="handleResetPwd(row)">
                重置密码
              </el-button>
              <el-button type="danger" link @click="handleDelete(row)">
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

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增用户' : '编辑用户'"
      width="500px"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="fullname">
          <el-input v-model="userForm.fullname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="角色" prop="roleid">
          <el-select v-model="userForm.roleid" placeholder="请选择角色">
            <el-option label="普通用户" :value="1" />
            <el-option label="管理员" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogType === 'add'">
          <el-input
            v-model="userForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';
import axios from 'axios';

// 定义接口
interface User {
  userid: number;
  username: string;
  fullname: string;
  email: string;
  roleid: number;
  registerTime: string;
}

interface SearchForm {
  username: string;
  roleid: number | undefined;
}

// 状态定义
const loading = ref(false);
const userList = ref<User[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const dialogVisible = ref(false);
const dialogType = ref<'add' | 'edit'>('add');
const userFormRef = ref<FormInstance>();

// 搜索表单
const searchForm = ref<SearchForm>({
  username: '',
  roleid: undefined
});

// 用户表单
const userForm = ref({
  userid: '',
  username: '',
  fullname: '',
  email: '',
  roleid: undefined,
  password: ''
});

// 表单验证规则
const userRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  fullname: [
    { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  roleid: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
};

// 获取用户列表
const fetchUserList = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get('http://localhost:8080/api/users/list', {
      params: {
        username: searchForm.value.username,
        roleid: searchForm.value.roleid,
        currentPage: currentPage.value,
        pageSize: pageSize.value
      }
    });
    userList.value = data.list;
    total.value = data.total;
  } catch (error) {
    ElMessage.error('获取用户列表失败');
  } finally {
    loading.value = false;
  }
};

// 搜索相关方法
const handleSearch = () => {
  currentPage.value = 1;
  fetchUserList();
};

const resetSearch = () => {
  searchForm.value = {
    username: '',
    roleid: undefined
  };
  handleSearch();
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchUserList();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchUserList();
};

// 用户操作相关方法
const handleAdd = () => {
  dialogType.value = 'add';
  userForm.value = {
    userid: '',
    username: '',
    fullname: '',
    email: '',
    roleid: 1,
    password: ''
  };
  dialogVisible.value = true;
};

const handleEdit = (row: User) => {
  dialogType.value = 'edit';
  userForm.value = {
    userid: row.userid,
    username: row.username,
    fullname: row.fullname,
    email: row.email,
    roleid: row.roleid,
    password: ''
  };
  dialogVisible.value = true;
};

const handleDelete = (row: User) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${row.userid}`);
      ElMessage.success('删除成功');
      fetchUserList();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  });
};

const handleStatusChange = async (row: User) => {
  try {
    await axios.put(`http://localhost:8080/api/users/${row.userid}`, {
      ...row
    });
    ElMessage.success('更新成功');
  } catch (error) {
    ElMessage.error('更新失败');
  }
};

const handleResetPwd = (row: User) => {
  ElMessageBox.confirm('确定要重置该用户的密码吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await axios.post(`http://localhost:8080/api/users/${row.userid}/reset-password`, {
        password: '123456' // 默认密码
      });
      ElMessage.success('密码重置成功');
    } catch (error) {
      ElMessage.error('密码重置失败');
    }
  });
};

// 表单提交
const submitForm = async () => {
  if (!userFormRef.value) return;
  
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value === 'add') {
          await axios.post('http://localhost:8080/api/users/register', userForm.value);
        } else {
          await axios.put(`http://localhost:8080/api/users/${userForm.value.userid}`, userForm.value);
        }
        ElMessage.success(dialogType.value === 'add' ? '新增成功' : '更新成功');
        dialogVisible.value = false;
        fetchUserList();
      } catch (error) {
        ElMessage.error(dialogType.value === 'add' ? '新增失败' : '更新失败');
      }
    }
  });
};

// 初始化
onMounted(() => {
  fetchUserList();
});
</script>

<style scoped>
.user-list {
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