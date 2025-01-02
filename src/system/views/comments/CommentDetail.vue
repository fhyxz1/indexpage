<template>
  <div class="comment-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>留言详情</span>
          <el-button @click="goBack">返回</el-button>
        </div>
      </template>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="留言ID">{{ comment.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ comment.username }}</el-descriptions-item>
        <el-descriptions-item label="留言内容">{{ comment.content }}</el-descriptions-item>
        <el-descriptions-item label="留言时间">{{ comment.createTime }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(comment.status)">
            {{ getStatusLabel(comment.status) }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <div class="reply-section" v-if="comment.replies && comment.replies.length">
        <h3>回复记录</h3>
        <el-timeline>
          <el-timeline-item
            v-for="reply in comment.replies"
            :key="reply.id"
            :timestamp="reply.createTime"
          >
            <p class="reply-content">{{ reply.content }}</p>
            <p class="reply-info">回复人：{{ reply.replyUser }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

interface Reply {
  id: number;
  content: string;
  replyUser: string;
  createTime: string;
}

interface CommentDetail {
  id: number;
  username: string;
  content: string;
  createTime: string;
  status: string;
  replies?: Reply[];
}

const comment = ref<CommentDetail>({
  id: 0,
  username: '',
  content: '',
  createTime: '',
  status: '',
  replies: []
});

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

const fetchCommentDetail = async () => {
  try {
    // TODO: 调用后端API获取留言详情
    // const { data } = await getCommentDetail(route.params.id);
    // comment.value = data;
  } catch (error) {
    ElMessage.error('获取留言详情失败');
  }
};

const goBack = () => {
  router.push('/system/comments');
};

onMounted(() => {
  fetchCommentDetail();
});
</script>

<style scoped>
.comment-detail {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-section {
  margin-top: 30px;
}

.reply-content {
  margin: 0;
  font-size: 14px;
}

.reply-info {
  margin: 5px 0 0;
  font-size: 12px;
  color: #999;
}

:deep(.el-descriptions) {
  margin: 20px 0;
}
</style> 