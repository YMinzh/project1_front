import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '../views/Demo.vue'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import AddCategory from '../views/AddCategory.vue'
import AddProduct from '../views/AddProduct.vue'
import PreSku from '../views/PreSku.vue'
import AddNav from '../views/AddNav.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/category/add',
    component: AddCategory
  },
  {
    path: '/product/add',
    component: AddProduct
  },
  {
    path: '/sku',
    component: PreSku
  },
  {
    path: '/nav/add',
    component: AddNav
  },

]

const router = new VueRouter({
  routes
})

export default router
