const baseURL = 'http://127.0.0.1:3001/'
const navItems = [
  {name: "分类管理",href: "/"},
  {name: "商品管理", href: "/product"},
  {name: "添加分类", href: "/category/add"},
  {name: "添加商品", href: "/product/add"},
  {name: "库存管理", href: "/sku"},
  {name: "添加导航", href: "/nav/add"},
]

export default {
  baseURL,navItems
}