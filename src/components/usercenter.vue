<template>
    <div class="user-center">
      <!-- 用户信息卡片优化 -->
      <el-card class="user-profile-card" :body-style="{ padding: '30px' }">
        <div class="user-header">
          <el-avatar :src="user.avatar" :size="100" />
          <div class="user-info">
            <h2>{{ user.name }}</h2>
            <p class="email">{{ user.email }}</p>
            <p class="bio">{{ user.bio || '这个人很懒，还没有填写个性签名' }}</p>
          </div>
        </div>
      </el-card>
  
      <!-- 用户操作选项卡 -->
      <el-tabs v-model="activeTab" class="user-tabs" type="border-card">
        <el-tab-pane label="我的文章" name="articles" v-if="user.role === 'admin'">
          <div class="tab-content">
            <div class="article-header">
              <el-button type="primary" @click="createNewArticle">
                <el-icon><Plus /></el-icon>新建文章
              </el-button>
            </div>
            <div class="article-list">
              <div v-for="article in articles" :key="article.id" class="article-card">
                <div class="article-info">
                  <h3>{{ article.title }}</h3>
                  <p class="article-desc">{{ article.description }}</p>
                  <div class="article-meta">
                    <span>{{ article.date }}</span>
                    <span>阅读 {{ article.views }}</span>
                    <span>点赞 {{ article.likes }}</span>
                  </div>
                </div>
                <div class="article-actions">
                  <el-button type="primary" size="small" @click="openEditDialog(article)">编辑</el-button>
                  <el-button type="danger" size="small" @click="handleDeleteArticle(article.id)">删除</el-button>
                </div>
              </div>
            </div>
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
              <el-form-item label="个人简介">
                <el-input type="textarea" v-model="user.bio" :rows="4" />
              </el-form-item>
              <el-form-item label="通知设置">
                <el-switch v-model="user.notifications" />
              </el-form-item>
              <el-form-item label="隐私设置">
                <el-radio-group v-model="user.privacy">
                  <el-radio label="public">公开</el-radio>
                  <el-radio label="private">私密</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="浏览历史" name="history">
          <div class="tab-content">
            <div class="article-list">
              <div v-for="article in browsingHistory" :key="article.id" class="article-card">
                <div class="article-info">
                  <h3>{{ article.title }}</h3>
                  <p class="article-desc">{{ article.description }}</p>
                  <div class="article-meta">
                    <span>浏览时间：{{ article.viewedAt }}</span>
                    <span>阅读 {{ article.views }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
  
      <!-- 文章编辑对话框 -->
      <el-dialog
        :title="currentArticle.id ? '编辑文章' : '新建文章'"
        v-model="editDialogVisible"
        width="50%"
      >
        <el-form :model="currentArticle" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="currentArticle.title" placeholder="请输入文章标题" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="currentArticle.description"
              type="textarea"
              :rows="4"
              placeholder="请输入文章描述"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveArticle">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { Edit, SwitchButton, Plus } from '@element-plus/icons-vue'
  
  // 用户数据
  const user = ref({
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "https://via.placeholder.com/100",
    bio: "前端开发工程师",
    notifications: true,
    privacy: "public",
    role: "user"
  });
  
  // 文章数据
  const articles = ref([
    {
      id: 1,
      title: "Vue3 组件开发实践",
      description: "本文介绍了Vue3组件开发的最佳实践和常用技巧...",
      date: "2024-03-15",
      views: 1234,
      likes: 56
    },
    {
      id: 2,
      title: "前端性能优化指南",
      description: "深入探讨前端性能优化的各种技术和方法...",
      date: "2024-03-10",
      views: 2345,
      likes: 89
    }
  ]);
  
  // 当前激活的选项卡
  const activeTab = ref("articles");
  
  // 编辑文章对话框
  const editDialogVisible = ref(false);
  const currentArticle = ref({
    id: null,
    title: '',
    description: '',
  });
  
  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      // const response = await axios.get('/api/user/info');
      // user.value = response.data;
      //ElMessage.success('获取用户信息成功');
    } catch (error) {
      ElMessage.error('获取用户信息失败');
    }
  };
  
  // 获取文章列表
  const fetchArticles = async () => {
    try {
      // const response = await axios.get('/api/user/articles');
      // articles.value = response.data;
      //ElMessage.success('获取文章列表成功');
    } catch (error) {
      ElMessage.error('获取文章列表失败');
    }
  };
  
  // 删除文章
  const handleDeleteArticle = async (articleId) => {
    try {
      await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
        type: 'warning'
      });
      
      // await axios.delete(`/api/articles/${articleId}`);
      articles.value = articles.value.filter(article => article.id !== articleId);
      ElMessage.success('删除成功');
    } catch (error) {
      if (error !== 'cancel') {
        ElMessage.error('删除失败');
      }
    }
  };
  
  // 打开编辑对话框
  const openEditDialog = (article) => {
    currentArticle.value = { ...article };
    editDialogVisible.value = true;
  };
  
  // 保存文章
  const saveArticle = async () => {
    try {
      if (currentArticle.value.id) {
        // 编辑现有文章
        // await axios.put(`/api/articles/${currentArticle.value.id}`, currentArticle.value);
        const index = articles.value.findIndex(a => a.id === currentArticle.value.id);
        articles.value[index] = { ...currentArticle.value };
      } else {
        // 创建新文章
        // const response = await axios.post('/api/articles', currentArticle.value);
        const newArticle = {
          ...currentArticle.value,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          views: 0,
          likes: 0
        };
        articles.value.unshift(newArticle);
      }
      editDialogVisible.value = false;
      ElMessage.success('保存成功');
    } catch (error) {
      ElMessage.error('保存失败');
    }
  };
  
  // 创建新文章
  const createNewArticle = () => {
    currentArticle.value = {
      id: null,
      title: '',
      description: ''
    };
    editDialogVisible.value = true;
  };
  
  // 保存用户设置
  const saveSettings = async () => {
    try {
      // await axios.put('/api/user/settings', user.value);
      ElMessage.success('设置已保存');
    } catch (error) {
      ElMessage.error('保存失败');
    }
  };
  
  // 添加浏览历史数据
  const browsingHistory = ref([
    {
      id: 1,
      title: "Vue3 组件开发实践",
      description: "本文介绍了Vue3组件开发的最佳实践和常用技巧...",
      viewedAt: "2024-03-20 15:30",
      views: 1234
    },
    {
      id: 2,
      title: "前端性能优化指南",
      description: "深入探讨前端性能优化的各种技术和方法...",
      viewedAt: "2024-03-19 10:15",
      views: 2345
    }
  ]);
  
  // 获取浏览历史
  const fetchBrowsingHistory = async () => {
    try {
      // const response = await axios.get('/api/user/browsing-history');
      // browsingHistory.value = response.data;
      //ElMessage.success('获取浏览历史成功');
    } catch (error) {
      ElMessage.error('获取浏览历史失败');
    }
  };
  
  // 页面加载时获取数据
  onMounted(() => {
    fetchUserInfo();
    fetchArticles();
    fetchBrowsingHistory();
  });
  </script>
  
  <style scoped>
  .user-center {
    max-width: 1000px;
    margin: 40px auto;
    padding: 0 20px;
  }
  
  .user-profile-card {
    margin-bottom: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .user-header {
    display: flex;
    align-items: flex-start;
    gap: 30px;
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-info h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
  }
  
  .user-info .email {
    margin: 0 0 20px 0;
    color: #909399;
    font-size: 14px;
  }
  
  .user-actions {
    display: flex;
    gap: 15px;
  }
  
  .user-tabs {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  :deep(.el-tabs__header) {
    margin: 0;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 20px;
  }
  
  :deep(.el-tabs__nav) {
    border: none !important;
  }
  
  :deep(.el-tabs__item) {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #606266;
    border: none !important;
    transition: all 0.3s ease;
  }
  
  :deep(.el-tabs__item:hover) {
    color: var(--el-color-primary);
  }
  
  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
    font-weight: 600;
  }
  
  :deep(.el-tabs__active-bar) {
    height: 3px;
    border-radius: 3px;
    background-color: var(--el-color-primary);
  }
  
  .tab-content {
    padding: 30px;
    min-height: 300px;
  }
  
  /* 表格样式优化 */
  :deep(.el-table) {
    border-radius: 8px;
    overflow: hidden;
  }
  
  :deep(.el-form-item) {
    margin-bottom: 25px;
  }
  
  .article-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .article-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    background: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .article-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  
  .article-info {
    flex: 1;
  }
  
  .article-info h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
  }
  
  .article-desc {
    color: #666;
    margin: 0 0 8px 0;
  }
  
  .article-meta {
    display: flex;
    gap: 16px;
    color: #999;
    font-size: 14px;
  }
  
  .article-actions {
    display: flex;
    gap: 8px;
  }
  
  /* 菜单项样式优化 */
  .menu-item {
    display: flex;
    align-items: center;
    padding: 16px;
    margin: 4px 0;
    background: var(--van-background);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }
  
  .menu-item:hover {
    background: var(--van-gray-1);
    transform: translateX(4px);
  }
  
  .menu-item.active {
    background: var(--van-primary-color-light);
    color: var(--van-primary-color);
  }
  
  .menu-icon {
    font-size: 20px;
    margin-right: 12px;
    transition: transform 0.3s ease;
  }
  
  .menu-item:hover .menu-icon {
    transform: scale(1.1);
  }
  
  .menu-item.active .menu-icon {
    transform: scale(1.2);
  }
  
  .menu-text {
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    transition: transform 0.3s ease;
  }
  
  .menu-item:hover .menu-text {
    transform: translateX(4px);
  }
  
  .arrow-icon {
    font-size: 14px;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }
  
  .menu-item:hover .arrow-icon {
    opacity: 1;
    transform: translateX(0);
  }
  
  .menu-item.active .arrow-icon {
    opacity: 1;
    transform: translateX(0) rotate(-90deg);
    color: var(--van-primary-color);
  }
  
  /* 添加点击涟漪效果 */
  .menu-item::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(var(--van-primary-color-rgb), 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .menu-item:active::after {
    transform: translate(-50%, -50%) scale(2);
    opacity: 1;
    transition: 0s;
  }
  
  /* 分组标题样式优化 */
  .section-title {
    padding: 8px 16px;
    margin: 16px 0 8px;
    font-size: 14px;
    color: var(--van-gray-6);
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  /* 菜单组样式优化 */
  .menu-list {
    background: transparent;
    border-radius: 16px;
    padding: 4px;
  }
  
  .menu-section {
    margin-bottom: 24px;
  }
  
  /* 添加菜单组过渡动画 */
  .menu-section {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 优化移动端触摸反馈 */
  @media (hover: none) {
    .menu-item:active {
      background: var(--van-gray-2);
    }
    
    .menu-item.active:active {
      background: var(--van-primary-color-light);
    }
  }
  
  /* 标签页导航区域背景色优化 */
  :deep(.el-tabs__nav-scroll) {
    padding: 0 4px;
    position: relative;
    overflow: hidden;
    background: #f8f9fa;  /* 添加浅灰色背景 */
    border-radius: 12px 12px 0 0;  /* 上方圆角 */
  }
  
  :deep(.el-tabs__nav-wrap) {
    margin-bottom: 0;
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);  /* 添加渐变背景 */
    border-bottom: 1px solid #ebeef5;  /* 底部分割线 */
  }
  
  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }
  
  :deep(.el-tabs__nav) {
    display: flex;
    position: relative;
    transition: transform 0.3s ease;
    padding: 4px 0;  /* 增加内边距 */
  }
  
  /* 优化滚动指示器背景 */
  :deep(.el-tabs__nav-prev),
  :deep(.el-tabs__nav-next) {
    position: absolute;
    cursor: pointer;
    line-height: 60px;
    font-size: 16px;
    color: #909399;
    width: 30px;
    text-align: center;
    z-index: 1;
    transition: all 0.3s ease;
  }
  
  :deep(.el-tabs__nav-prev) {
    left: 0;
    background: linear-gradient(to right, #f8f9fa 70%, rgba(248, 249, 250, 0));  /* 匹配新背景色 */
  }
  
  :deep(.el-tabs__nav-next) {
    right: 0;
    background: linear-gradient(to left, #f8f9fa 70%, rgba(248, 249, 250, 0));  /* 匹配新背景色 */
  }
  
  /* 标签项样式调整 */
  :deep(.el-tabs__item) {
    padding: 0 24px;
    position: relative;
    transition: all 0.3s ease;
    margin: 0 4px;  /* 增加标签间距 */
    border-radius: 8px;  /* 添加圆角 */
  }
  
  :deep(.el-tabs__item:hover) {
    background: rgba(var(--el-color-primary-rgb), 0.1);  /* 悬停背景色 */
  }
  
  :deep(.el-tabs__item.is-active) {
    background: #fff;  /* 激活状态背景色 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);  /* 添加轻微阴影 */
  }
  
  /* 内容区域背景色调整 */
  .tab-content {
    padding: 30px;
    min-height: 300px;
    background: #fff;  /* 确保内容区域为白色背景 */
    border-radius: 0 0 12px 12px;  /* 下方圆角 */
  }
  
  /* 移动端适配优化 */
  @media screen and (max-width: 768px) {
    :deep(.el-tabs__nav-scroll) {
      border-radius: 8px 8px 0 0;  /* 调整移动端圆角 */
    }
    
    :deep(.el-tabs__item) {
      padding: 0 16px;
      font-size: 14px;
      margin: 0 2px;  /* 调整移动端标签间距 */
    }
  }
  
  .bio {
    margin: 0;
    color: #606266;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .article-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
  
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  /* 文章列表的过渡动画 */
  .article-list {
    transition: all 0.3s ease;
  }
  
  .article-card {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 浏览历史卡片样式优化 */
  .article-card .article-meta span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  
  .article-card .article-meta span:not(:last-child)::after {
    content: "•";
    margin-left: 16px;
    color: #dcdfe6;
  }
  </style>
  