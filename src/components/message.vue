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
      >
        <div class="message-content">
          <h3 class="message-title">{{ message.title }}</h3>
          <p class="message-text">{{ message.content }}</p>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      messages: [
        {
          id: 1,
          title: '系统通知',
          content: '您的账号已经成功激活',
          time: '2024-03-20 10:30',
          isRead: false
        },
        // 更多消息数据...
      ]
    }
  },
  computed: {
    filteredMessages() {
      if (this.currentTab === 'unread') {
        return this.messages.filter(msg => !msg.isRead)
      } else if (this.currentTab === 'read') {
        return this.messages.filter(msg => msg.isRead)
      }
      return this.messages
    },
    unreadCount() {
      return this.messages.filter(msg => !msg.isRead).length
    }
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style scoped>
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
