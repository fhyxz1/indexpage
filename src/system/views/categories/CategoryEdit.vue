<template>
    <el-card>
      <el-form :model="form" label-width="120px" ref="formRef">
        <el-form-item label="分类名称" required>
          <el-input v-model="form.category_name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="关联标签">
          <el-select v-model="form.tags" multiple placeholder="请选择标签">
            <el-option
              v-for="tag in tags"
              :key="tag.tag_id"
              :label="tag.tag_name"
              :value="tag.tag_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  const router = useRouter();
  const route = useRoute();
  
  const form = reactive({
    category_name: "",
    description: "",
    tags: [],
  });
  
  const tags = ref([
    // 示例标签数据
    { tag_id: 1, tag_name: "Vue" },
    { tag_id: 2, tag_name: "JavaScript" },
  ]);
  
  function submitForm() {
    console.log("表单提交", form);
    // 提交数据请求
  }
  
  function cancelEdit() {
    router.back();
  }
  
  // 如果是编辑模式，加载数据
  if (route.query.id) {
    console.log("加载分类详情", route.query.id);
    // 请求分类详情
  }
  </script>
  