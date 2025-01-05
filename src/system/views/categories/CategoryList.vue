<template>
    <el-card class="category-list">
      <el-row justify="space-between" align="middle" class="mb-4">
        <el-col>
          <h3>分类管理</h3>
        </el-col>
        <el-col>
          <el-button type="primary" @click="navigateToAdd">新增分类</el-button>
        </el-col>
      </el-row>
      <el-table :data="categories" border style="width: 100%">
        <el-table-column prop="category_name" label="分类名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column
          label="操作"
          align="center"
          width="200"
        >
          <template #default="scope">
            <el-button size="small" type="text" @click="navigateToEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteCategory(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const categories = ref([
    // 示例数据
    { category_id: 1, category_name: "技术", description: "技术相关分类" },
    { category_id: 2, category_name: "生活", description: "生活点滴分类" },
  ]);
  
  const router = useRouter();
  
  function navigateToAdd() {
    router.push({ name: "CategoryEdit" });
  }
  
  function navigateToEdit(row) {
    router.push({ name: "CategoryEdit", query: { id: row.category_id } });
  }
  
  function deleteCategory(row) {
    // 发送删除请求，重新加载数据
    console.log("删除分类", row);
  }
  </script>
  
  <style scoped>
  .category-list {
    padding: 20px;
  }
  .mb-4 {
    margin-bottom: 16px;
  }
  </style>
  