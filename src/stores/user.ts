import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router';

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
      if (!this.token) {
        ElMessage.error('未登录或登录已过期')
        return false
      }

      try {
        axios.defaults.headers.common['satoken'] = this.token
        const res = await axios.get('http://localhost:8080/api/users/info')
        const { role, fullname, username, userid } = res.data
        
        this.setUserInfo({
          userid,
          username,
          role: typeof role === 'string' ? role.toLowerCase() : 'visitor',
          fullname
        })

        return true
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            ElMessage.error('登录已过期，请重新登录')
          } else if (error.response?.status === 403) {
            ElMessage.error('没有访问权限')
          } else {
            ElMessage.error('验证失败：' + (error.response?.data?.message || '未知错误'))
          }
        } else {
          ElMessage.error('服务器错误，请稍后重试')
        }
        
        this.clearUserInfo()
        router.push('/login')
        return false
      }
    },

    setUserInfo(user: UserInfo) {
      this.userid = user.userid || ''
      this.userInfo = user
      this.userRole = user.role || 'visitor'
      
      if (this.token) {
        axios.defaults.headers.common['satoken'] = this.token
      }
    },
    
    setToken(token: string) {
      this.token = token
      axios.defaults.headers.common['satoken'] = token
    },
    
    clearUserInfo() {   
      this.token = ''
      this.userInfo = {}
      this.userRole = 'visitor'
      delete axios.defaults.headers.common['satoken']
      
      localStorage.removeItem('lastLoginTime')
      sessionStorage.clear()
    }
  },

  getters: {
    getUserid: (state) => state.userid,
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
    isBlogger: (state) => state.userRole === 'blogger' || state.userRole === 'admin'
  }
}) 