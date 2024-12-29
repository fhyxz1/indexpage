import { defineStore } from 'pinia'
import axios from 'axios'

interface UserInfo {
  userid?: string;
  username?: string;
  role?: string;
  fullname?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userid: '',
    token: '',
    userInfo: {} as UserInfo,
    userRole: 'visitor'
  }),
  
  persist: true,  // 启用持久化
  
  actions: {
    async checkAuth() {
      if (!this.token) return false

      try {
        // 修改请求头名称为 satoken
        axios.defaults.headers.common['satoken'] = this.token
        
        // 验证 token
        const res = await axios.get('http://localhost:8080/api/users/info')
        const { role, fullname, username, userid } = res.data
        
        this.setUserInfo({
          userid,
          username,
          role: typeof role === 'string' ? role.toLowerCase() : 'visitor', // 添加类型检查
          fullname
        })

        return true
      } catch (error) {
        console.error('Token验证失败:', error)
        this.clearUserInfo()
        return false
      }
    },

    setUserInfo(user: UserInfo) {
      this.userid = user.userid || ''
      this.userInfo = user
      this.userRole = user.role || 'visitor'
      
      if (this.token) {
        // 这里也需要修改
        axios.defaults.headers.common['satoken'] = this.token
      }
    },
    
    setToken(token: string) {
      this.token = token
      // 这里也需要修改
      axios.defaults.headers.common['satoken'] = token
    },
    
    clearUserInfo() {   
      this.token = ''
      this.userInfo = {}
      this.userRole = 'visitor'
      // 这里也需要修改
      delete axios.defaults.headers.common['satoken']
    }
  },

  getters: {
    getUserid: (state) => state.userid,
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
    isBlogger: (state) => state.userRole === 'blogger' || state.userRole === 'admin'
  }
}) 