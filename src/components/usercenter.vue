<template>
    <div class="user-center">
      <!-- 用户信息卡片 -->
      <el-card class="user-profile-card">
        <div class="user-header">
          <el-avatar :src="user.avatar" size="large" />
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
          </div>
        </div>
        <el-divider />
        <div class="user-actions">
          <el-button type="primary" @click="editProfile">编辑资料</el-button>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </el-card>
  
      <!-- 用户操作选项卡 -->
      <el-tabs v-model="activeTab" class="user-tabs">
        <el-tab-pane label="我的订单" name="orders">
          <div class="tab-content">
            <el-table :data="orders" border>
              <el-table-column prop="id" label="订单号" width="180" />
              <el-table-column prop="date" label="日期" width="180" />
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="amount" label="金额" />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的收藏" name="favorites">
          <div class="tab-content">
            <el-empty description="暂无收藏记录" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="账号设置" name="settings">
          <div class="tab-content">
            <el-form label-width="100px">
              <el-form-item label="用户名">
                <el-input v-model="user.name" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="user.email" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  
  // 用户数据
  const user = ref({
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "https://via.placeholder.com/100",
  });
  
  // 当前激活的选项卡
  const activeTab = ref("orders");
  
  // 订单数据
  const orders = ref([
    { id: "20231234", date: "2023-12-01", status: "已完成", amount: "¥120.00" },
    { id: "20231235", date: "2023-12-02", status: "待支付", amount: "¥320.00" },
  ]);
  
  // 编辑资料
  const editProfile = () => {
    ElMessage({
      message: "编辑资料功能待实现",
      type: "info",
    });
  };
  
  // 退出登录
  const logout = () => {
    ElMessageBox.confirm("确定要退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        ElMessage({
          type: "success",
          message: "已退出登录",
        });
        // 执行退出逻辑
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消退出",
        });
      });
  };
  
  // 保存设置
  const saveSettings = () => {
    ElMessage({
      message: "设置已保存",
      type: "success",
    });
    // 执行保存逻辑
  };
  </script>
  
  <style scoped>
  .user-center {
    max-width: 800px;
    margin: 20px auto;
  }
  
  .user-profile-card {
    margin-bottom: 20px;
  }
  
  .user-header {
    display: flex;
    align-items: center;
  }
  
  .user-info {
    margin-left: 20px;
  }
  
  .user-info h3 {
    margin: 0;
    font-size: 20px;
  }
  
  .user-actions {
    margin-top: 10px;
    display: flex;
    gap: 10px;
  }
  
  .user-tabs {
    margin-top: 20px;
  }
  
  .tab-content {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
  </style>
  