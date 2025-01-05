<template>
  <div class="message-center">
    <div class="message-header">
      <h2>消息中心</h2>
      <div class="message-tabs">
        <span 
          v-for="tab in tabs" 
          :key="tab.key"
          :class="['tab-item', { active: currentTab === tab.key }]"
          @click="switchTab(tab.key)"
        >
          {{ tab.name }}
          <span v-if="tab.key === 'unread' && unreadCount > 0" class="unread-badge">
            {{ unreadCount }}
          </span>
        </span>
      </div>
    </div>

    <div class="message-list">
      <div 
        v-for="message in filteredMessages" 
        :key="message.id"
        :class="['message-item', { unread: !message.isRead }]"
        @click="toggleReadStatus(message)"
      >
        <div class="message-content">
          <h3 class="message-title">{{ message.title }}</h3>
          <p class="message-text">{{ message.content }}</p>
          <span class="message-time">{{ message.createAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessageCenter',
  data() {
    return {
      currentTab: 'all',
      tabs: [
        { key: 'all', name: '全部' },
        { key: 'unread', name: '未读' },
        { key: 'read', name: '已读' }
      ],
      messages: [], // 初始为空，通过API获取消息
    };
  },
  computed: {
    filteredMessages() {
      if (this.currentTab === 'unread') {
        return this.messages.filter(msg => !msg.isRead);
      } else if (this.currentTab === 'read') {
        return this.messages.filter(msg => msg.isRead);
      }
      return this.messages;
    },
    unreadCount() {
      return this.messages.filter(msg => !msg.isRead).length;
    }
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    fetchMessages() {
      axios.get('http://localhost:8080/api/announcements/userlist') // 请根据实际的后端接口调整
        .then(response => {
          // 假设返回的数据格式包含 id, title, createAt
          this.messages = response.data.map(msg => ({
            ...msg,
            isRead: false, // 假设所有消息默认是未读
            content: msg.content || '', // 如果API返回了content字段，添加它
          }));
        })
        .catch(error => {
          console.error("获取消息时出错:", error);
        });
    },
    toggleReadStatus(message) {
      // 切换消息的阅读状态
      message.isRead = !message.isRead;
    }
  },
  created() {
    this.fetchMessages();
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
.message-center {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.message-header {
  margin-bottom: 20px;
}

.message-tabs {
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.tab-item {
  position: relative;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
  margin-right: 32px;
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  color: #0098ff;
  border-bottom: 2px solid #0098ff;
  font-weight: 500;
  background-color: transparent;
}

.tab-item:hover {
  color: #0098ff;
  background-color: transparent;
}

.tab-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0098ff;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tab-item:hover::after {
  transform: scaleX(1);
}

.tab-item.active::after {
  display: none;
}

.unread-badge {
  position: absolute;
  top: 0;
  right: -12px;
  background-color: #2fb3ff;
  color: white;
  border-radius: 10px;
  padding: 0 6px;
  font-size: 12px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  transform: translateY(-50%);
  font-weight: normal;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-item {
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 152, 255, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.message-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 152, 255, 0.1);
}

.message-item.unread {
  background-color: #e6f7ff;
  border-left: 4px solid #0098ff;
}

.message-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #1f1f1f;
  font-weight: 600;
}

.message-text {
  margin: 0;
  color: #434343;
  line-height: 1.6;
}

.message-time {
  font-size: 12px;
  color: #666;
  margin-top: 12px;
  display: block;
}
</style>
