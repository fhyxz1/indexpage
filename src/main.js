import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { NavBar } from 'vant';
import 'vant/lib/index.css';
import { Icon } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Popup, Search,Cell } from 'vant';
import {
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
} from 'vant';
const app = createApp(App);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
app.use(Popup).use(Search).use(Cell);
app.use(DropdownMenu).use(Icon);
app.use(DropdownItem);
app.use(NavBar)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}