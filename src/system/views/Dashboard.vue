<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statistics" :key="index">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <div class="statistic-card">
            <el-icon :size="40" :class="item.color">
              <component :is="item.icon"></component>
            </el-icon>
            <div class="content">
              <div class="value">{{ item.value }}</div>
              <div class="label">{{ item.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>博客发布趋势</span>
              <el-radio-group v-model="timeRange" size="small">
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">全年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里可以集成 ECharts 等图表库 -->
            <el-empty description="暂无数据" v-if="false"></el-empty>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
              <el-button link>查看全部</el-button>
            </div>
          </template>
          <div class="timeline-container">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in recentActivities"
                :key="index"
                :type="activity.type"
                :timestamp="activity.time"
                :hollow="activity.hollow"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷操作区 -->
    <el-card shadow="hover" class="quick-actions">
      <template #header>
        <div class="card-header">
          <span>快捷操作</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(action, index) in quickActions" :key="index">
          <el-card shadow="hover" @click="handleQuickAction(action)">
            <div class="action-card">
              <el-icon :size="24">
                <component :is="action.icon"></component>
              </el-icon>
              <span>{{ action.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Document,
  Edit,
  View,
  Setting,
  User,
  Picture,
  Share,
  Upload
} from '@element-plus/icons-vue'

const router = useRouter()
const timeRange = ref('week')

// 统计数据
const statistics = [
  { label: '总博客数', value: '128', icon: 'Document', color: 'text-primary' },
  { label: '本月发布', value: '32', icon: 'Edit', color: 'text-success' },
  { label: '总访问量', value: '8,546', icon: 'View', color: 'text-warning' },
  { label: '活跃用户', value: '256', icon: 'User', color: 'text-danger' }
]

// 最近活动
const recentActivities = [
  {
    content: '发布了新博客《Vue3 最佳实践》',
    time: '刚刚',
    type: 'primary'
  },
  {
    content: '更新了博客《React 入门指南》',
    time: '2小时前',
    type: 'success'
  },
  {
    content: '上传了 3 张新图片',
    time: '昨天 14:36',
    type: 'info',
    hollow: true
  },
  {
    content: '完成了个人资料更新',
    time: '2天前',
    type: 'warning',
    hollow: true
  }
]

// 快捷操作
const quickActions = [
  { label: '写博客', icon: 'Edit', path: '/system/blog/edit' },
  { label: '图片上传', icon: 'Picture', path: '/system/media' },
  { label: '内容分享', icon: 'Share', path: '/system/share' },
  { label: '资源导入', icon: 'Upload', path: '/system/import' }
]

const handleQuickAction = (action) => {
  router.push(action.path)
}
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 160px);
}

.statistic-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.content {
  flex: 1;
}

.value {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 4px;
}

.label {
  color: #909399;
  font-size: 14px;
}

.chart-row {
  margin-top: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-container {
  height: 350px;
  overflow-y: auto;
}

.quick-actions {
  margin-top: 20px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-card:hover {
  background-color: #f5f7fa;
}

/* 图标颜色 */
.text-primary {
  color: #409EFF;
}

.text-success {
  color: #67C23A;
}

.text-warning {
  color: #E6A23C;
}

.text-danger {
  color: #F56C6C;
}

:deep(.el-card__body) {
  padding: 20px;
}

:deep(.el-timeline-item__node--normal) {
  left: -2px;
}

:deep(.el-card.is-hover-shadow:hover) {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
