/*
 * @Author: 郑义进
 * @Date: 2020-05-31 08:53:28
 * @LastEditTime: 2020-06-06 17:36:44
 * @LastEditors: Please set LastEditors
 * @Description: 主入口
 * @FilePath: \lwbzzm-frontend\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import configInfo from './static/js/config'



Vue.config.productionTip = false
Vue.prototype.GLOBAL_CONFIG = configInfo;

//调试工具
import Vconsole from 'vconsole'

if (configInfo.baseUrl == 'https://ydzj.nimble.cn/bzzmapi/uat') {
    let vconsole = new Vconsole()
    Vue.use(vconsole)
}

//全局样式
import '../src/assets/css/base.css'

//解决移动端300毫秒点击延迟问题
import FastClick from 'fastclick'
FastClick.attach(document.body)

// vant ui 按需导入
import {
    Button,
    Field,
    NavBar,
    Cell,
    CellGroup,
    Picker,
    Popup,
    Form,
    Icon,
    Col,
    Row,
    Uploader,
    Checkbox,
    CheckboxGroup,
    Image as VanImage,
    Dialog,
    ImagePreview,
    Search,
    DropdownMenu,
    DropdownItem,
    Tabbar,
    TabbarItem,
    Tag,
    Loading,
    Tab,
    Tabs,
    List
} from 'vant'


Vue.use(Button)
Vue.use(Field);
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Col)
Vue.use(Row)
Vue.use(Uploader)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(VanImage)
Vue.use(Dialog)
Vue.use(ImagePreview)
Vue.use(Search)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Tag)
Vue.use(Loading)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '敏捷劳务'
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')