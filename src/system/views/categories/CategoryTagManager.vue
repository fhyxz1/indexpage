<template>
    <div class="category-tag-manager">
      <el-tabs v-model="activeTab">
        <!-- 分类管理 -->
        <el-tab-pane label="分类管理" name="categories">
          <div class="toolbar">
            <el-button type="primary" @click="openCategoryDialog">添加分类</el-button>
          </div>
          <el-table :data="categories" border>
            <el-table-column prop="name" label="分类名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="editCategory(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteCategory(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
  
        <!-- 标签管理 -->
        <el-tab-pane label="标签管理" name="tags">
          <div class="toolbar">
            <el-button type="primary" @click="openTagDialog">添加标签</el-button>
          </div>
          <el-table :data="tags" border>
            <el-table-column prop="name" label="标签名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="editTag(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteTag(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
  
        <!-- 标签与分类关系管理 -->
        <el-tab-pane label="分类与标签关系管理" name="relations">
          <el-select v-model="selectedCategory" placeholder="选择分类" style="width: 200px">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
          <el-table :data="filteredTags" border>
            <el-table-column prop="name" label="标签名称" />
            <el-table-column prop="assigned" label="分配状态">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.assigned"
                  @change="updateTagCategoryRelation(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
  
        <!-- 为文章分配分类和标签 -->
        <el-tab-pane label="文章分类与标签" name="articles">
          <el-table :data="articles" border>
            <el-table-column prop="title" label="文章标题" />
            <el-table-column label="分类">
              <template #default="scope">
                <el-select
                  v-model="scope.row.category"
                  placeholder="选择分类"
                  @change="updateArticleCategory(scope.row)"
                >
                  <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="标签">
              <template #default="scope">
                <el-select
                  v-model="scope.row.tags"
                  multiple
                  placeholder="选择标签"
                  @change="updateArticleTags(scope.row)"
                >
                  <el-option
                    v-for="tag in tags"
                    :key="tag.id"
                    :label="tag.name"
                    :value="tag.id"
                  />
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
  
      <!-- 分类/标签对话框 -->
      <el-dialog :visible.sync="dialogVisible" title="编辑信息">
        <el-form :model="dialogForm">
          <el-form-item label="名称">
            <el-input v-model="dialogForm.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="dialogForm.description" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDialogForm">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref ,computed} from "vue";
  
  // 数据
  const activeTab = ref("categories");
  const categories = ref([]);
  const tags = ref([]);
  const articles = ref([]);
  const selectedCategory = ref(null);
  const dialogVisible = ref(false);
  const dialogForm = ref({});
  
  // 过滤标签（根据分类）
  const filteredTags = computed(() =>
    tags.value.map((tag) => ({
      ...tag,
      assigned: tag.categories.includes(selectedCategory.value),
    }))
  );
  
  // 方法
  const openCategoryDialog = () => {
    dialogForm.value = { name: "", description: "" };
    dialogVisible.value = true;
  };
  
  const openTagDialog = () => {
    dialogForm.value = { name: "", description: "" };
    dialogVisible.value = true;
  };
  
  const saveDialogForm = () => {
    // 保存逻辑
    dialogVisible.value = false;
  };
  
  const editCategory = (category) => {
    dialogForm.value = { ...category };
    dialogVisible.value = true;
  };
  
  const deleteCategory = (category) => {
    // 删除逻辑
  };
  
  const updateTagCategoryRelation = (tag) => {
    // 更新标签与分类的关系逻辑
  };
  
  const updateArticleCategory = (article) => {
    // 更新文章分类逻辑
  };
  
  const updateArticleTags = (article) => {
    // 更新文章标签逻辑
  };
  </script>
  
  <style scoped>
  .toolbar {
    margin-bottom: 16px;
  }
  </style>
  