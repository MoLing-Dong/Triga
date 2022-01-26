import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/reset.less' // 全局样式

import {
  Button,
  Select,
  Radio,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Submenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Option,
  CheckboxGroup,
  Checkbox,
  DatePicker,
  Dialog
} from 'element-ui'

Vue.prototype.$message = Message

Vue.config.productionTip = false
// Vue.use(ElementUI);

// Vue.component(Button.name, Button);

Vue.use(Button)
Vue.component(Select.name, Select)
Vue.component(Radio.name, Radio)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Dialog)

Vue.prototype.$axios = axios
if (process.env.NODE_ENV === 'development') require('@/api/mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
