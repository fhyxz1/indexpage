<template>
  <div class="favorite-container">
    <h2 class="page-title">我的收藏</h2>
    
    <div class="favorites-list">
      <div v-for="item in favorites" :key="item.id" class="favorite-card">
        <div class="card-image">
          <img :src="item.image" :alt="item.title">
          <div class="image-overlay">
            <span class="category">{{ item.category }}</span>
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
          <div class="card-meta">
            <span class="date">
              <i class="far fa-clock"></i>
              {{ item.date }}
            </span>
            <span class="views">
              <i class="far fa-eye"></i>
              {{ item.views }} 次浏览
            </span>
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn" @click="removeFavorite(item.id)">
            <i class="fas fa-star"></i>
            <span>取消收藏</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Favorite',
  data() {
    return {
      favorites: [
        {
          id: 1,
          title: '示例收藏项',
          description: '这是一个收藏项的描述文本，可以展示更多内容...',
          image: 'https://example.com/image.jpg',
          date: '2024-03-20',
          category: '技术文章'
        },
        // 更多收藏项...
      ]
    }
  },
  methods: {
    removeFavorite(id) {
      this.favorites = this.favorites.filter(item => item.id !== id)
    }
  }
}
</script>

<style scoped>
.favorite-container {
  padding: 2rem;
  background-color: #f0f7ff;
  min-height: 100vh;
}

.page-title {
  color: #2c5282;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  position: relative;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #4299e1, #63b3ed);
  border-radius: 2px;
}

.favorites-list {
  max-width: 1000px;
  margin: 0 auto;
}

.favorite-card {
  display: flex;
  background: white;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(66, 153, 225, 0.1);
  position: relative;
}

.favorite-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(66, 153, 225, 0.05), rgba(99, 179, 237, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(66, 153, 225, 0.15);
}

.favorite-card:hover::before {
  opacity: 1;
}

.card-image {
  width: 300px;
  min-width: 300px;
  height: 220px;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.favorite-card:hover .card-image img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.category {
  color: white;
  background: linear-gradient(135deg, #4299e1, #63b3ed);
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(66, 153, 225, 0.2);
  transition: transform 0.3s ease;
}

.favorite-card:hover .category {
  transform: translateY(-2px);
}

.card-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-content::before {
  content: '';
  position: absolute;
  left: 0;
  top: 2rem;
  bottom: 2rem;
  width: 3px;
  background: linear-gradient(to bottom, #4299e1, transparent);
}

.card-title {
  color: #2c5282;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-left: 1rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.favorite-card:hover .card-title {
  color: #4299e1;
}

.card-description {
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
  margin-left: 1rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  margin-left: 1rem;
}

.date i, .views i {
  margin-right: 0.5rem;
  color: #4299e1;
  transition: transform 0.3s ease;
}

.favorite-card:hover .date i,
.favorite-card:hover .views i {
  transform: scale(1.1);
}

.card-actions {
  display: flex;
  align-items: center;
  padding: 2rem;
  border-left: 1px solid rgba(66, 153, 225, 0.1);
  background: rgba(66, 153, 225, 0.02);
  transition: background-color 0.3s ease;
}

.favorite-card:hover .card-actions {
  background: rgba(66, 153, 225, 0.05);
}

.action-btn {
  background: none;
  border: 2px solid #4299e1;
  color: #4299e1;
  cursor: pointer;
  padding: 0.8rem 1.4rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: #4299e1;
  transform: translate(-50%, -50%) rotate(45deg) translateY(100%);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.action-btn:hover::before {
  transform: translate(-50%, -50%) rotate(45deg) translateY(0);
}

.action-btn i,
.action-btn span {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.action-btn:hover {
  border-color: transparent;
}

.action-btn:hover i,
.action-btn:hover span {
  color: white;
}

@media (max-width: 768px) {
  .favorite-card {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
    height: 200px;
  }
  
  .card-content::before {
    display: none;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-title, .card-description, .card-meta {
    margin-left: 0;
  }
  
  .card-actions {
    border-left: none;
    border-top: 1px solid rgba(66, 153, 225, 0.1);
    padding: 1.5rem;
    justify-content: flex-end;
  }
}
</style>

