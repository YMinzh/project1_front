<template>
    <div class="addCategory">
        <MyHeader></MyHeader>
        <div class="main">
          <div class="navBgc" ><MyNav :items="navItems" acIndex=3></MyNav></div>
          <div class="page">
            <!-- 名字 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">商品名字:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input v-model="name" id="input-small" size="sm" placeholder="商品名字不多于16位"></b-form-input>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
            <!-- 属性 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">分类:</label>
              </b-col >
              <b-col sm="3">
                <b-form-select
                  v-model="category"
                  size="sm"
                  :options="list"
                  value-field="name"
                  text-field="name"
                  @input="change"
                >
                <option value="" disabled>请选择你的商品分类</option>
                </b-form-select>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>

            <!-- attr1 -->
            <b-row class="my-1 mb-3" v-show="Object.keys(categoryList[category]).length>0">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">{{categoryList[category].attr1}}:</label>
              </b-col>
              <b-col sm="2">
                <b-form-input v-model="attr1" id="input-small" size="sm" :placeholder="'请添加你的'+categoryList[category].attr1"></b-form-input>
              </b-col>
              <b-col sm="1">
                <div @click="addAttr1" id="hover" style="width: 30px; height: 30px; border-radius: 30px; border: 4px solid #aaaaaa;color: #aaaaaa; font-size: 24px; text-align: center; line-height: 22px">
                  +
                </div>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
                <!-- attr1的属性详情 -->
            <b-row class="my-1 mb-3" v-show="attrList1.length>0">
              <b-col sm="4"></b-col>
              <b-col sm="4">
                <attrShow :attrs="attrList1"></attrShow>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>

            <!-- attr2 -->
            <b-row class="my-1 mb-3" v-show="Object.keys(categoryList[category]).length>1">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">{{categoryList[category].attr2}}:</label>
              </b-col>
              <b-col sm="2">
                <b-form-input v-model="attr2" id="input-small" size="sm" :placeholder="'请添加你的'+categoryList[category].attr2"></b-form-input>
              </b-col>
              <b-col sm="1">
                <div @click="addAttr2"  id="hover" style="width: 30px; height: 30px; border-radius: 30px; border: 4px solid #aaaaaa;color: #aaaaaa; font-size: 24px; text-align: center; line-height: 22px">
                  +
                </div>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
                            <!-- attr2的属性详情 -->
            <b-row class="my-1 mb-3"  v-show="attrList2.length>0">
              <b-col sm="4"></b-col>
              <b-col sm="4">
                <attrShow :attrs="attrList2"></attrShow>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>

            <!-- attr3 -->
            <b-row class="my-1 mb-3" v-show="Object.keys(categoryList[category]).length>2">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">{{categoryList[category].attr3}}:</label>
              </b-col>
              <b-col sm="2">
                <b-form-input v-model="attr3" id="input-small" size="sm" :placeholder="'请添加你的'+categoryList[category].attr3"></b-form-input>
              </b-col>
              <b-col sm="1">
                <div @click="addAttr3"  id="hover" style="width: 30px; height: 30px; border-radius: 30px; border: 4px solid #aaaaaa;color: #aaaaaa; font-size: 24px; text-align: center; line-height: 22px">
                  +
                </div>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
                            <!-- attr3的属性详情 -->
            <b-row class="my-1 mb-3" v-show="attrList3.length>0">
              <b-col sm="4"></b-col>
              <b-col sm="4">
                <attrShow :attrs="attrList3"></attrShow>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>


            <!-- 商品描述 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">商品描述:</label>
              </b-col>
              <b-col sm="3">
                <b-form-textarea v-model="text" id="input-small" size="sm" placeholder="可选"></b-form-textarea>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>





            <!-- 状态 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">状态:</label>
              </b-col>
              <b-col sm="1">
                <b-form-select
                  v-model="selected"
                  id="initialSortSelect"
                  size="sm"
                  :options="options"
                  value-field="item"
                  text-field="name"
                ></b-form-select>
              </b-col>
              <b-col sm="6"></b-col>
            </b-row>
            <!-- 排序值 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">排序值:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input v-model="sort" type="number" id="input-small" placeholder="默认为10" size="sm"></b-form-input>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>




            <!-- 添加的主题
            <myTable
            :list="this.tableList"
            :attrList1="attrList1"
            :attrList2="attrList2"
            :attrList3="attrList3"
            :items="items"
            :flag = "flag"
            :selected = "category"
            
            
            
            
            ></myTable> -->






            <!-- 按钮 -->
            <b-row class="my-1 mb-3">
              <b-col sm="5"></b-col>
              <b-col sm="3">
                <b-button @click="commit"> 添加 </b-button>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
          </div>
        </div>
        <alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></alert>
        <loading :isLoading="isLoading"/>        
    </div>
</template>

<script>
// @ is an alias to /src
import MyNav from '@/components/MyNav.vue'
import MyHeader from '@/components/MyHeader.vue'
import Page from '@/components/Page.vue'
import axios from 'axios'
import attrShow from '@/components/AttrShow.vue'
import myTable from '@/components/MyTable.vue'
import alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'

export default {
  name: 'home',
  components: {
    MyNav,MyHeader,Page,attrShow,myTable,alert,loading
  },
  data(){
    return{
      isLoading: false,
      errorNews: "",
      errorFlag: false,
      navItems:this.GLOBAL.navItems,
      name: "",
      sort: "",
      property: ["","",""],
      selected: 1,
      options: [
        {item:'1',name:"上架"},
        {item:'2',name:"下架"},
      ],
      baseURL: this.GLOBAL.baseURL,
      categoryList:{"": {}},
      list:[],
      category: "",
      attrList1:[],
      attrList2:[],
      attrList3:[],
      attr1: "",
      attr2: "",
      attr3: "",
      text: "",
      items:[{}],
      flag: false,
      tableList:{},
      category_id: ''
    }
  },
  methods: {
    errorBack(){
      this.errorFlag = false
    },
    
    commit(){
      this.isLoading = true
      this.returnSelected()
      axios.request({
        method: "POST",
        url: "/product/add/",
        baseURL: this.baseURL,
        data: {
          name: this.name,
          sort: this.sort,
          // property: {attr1: this.property[0],attr2: this.property[1],attr3: this.property[2],},
          status: this.selected,
          attrList1: this.attrList1,
          attrList2: this.attrList2,
          attrList3: this.attrList3,
          category_id: this.category_id,
          content: this.text,
        }
      }).then((res)=>{ 
        this.isLoading = false
        this.errorNews="添加成功"
        this.errorFlag = true
        this.name = ""
        this.sort = 10
        this.selected = null
        this.attrList1 = []
        this.attrList2 = []
        this.attrList3 = []
        this.category_id = ''
        this.text = ''
      }).catch((err)=>{
        console.log(err)
      })
    },
    blur1(index){
      if(this.property[index]==""){
        this.property.splice(index,1)
        this.property.splice(2,1,"")
      }
    },
    addAttr1(){
      if(this.attr1==""){
        return
      }
      this.attrList1.push(this.attr1);
      this.attr1 = ""
    },
    addAttr2(){
      if(this.attr2==""){
        return
      }
      this.attrList2.push(this.attr2);
      this.attr2 = ""
    },
    addAttr3(){
      if(this.attr3==""){
        return
      }
      this.attrList3.push(this.attr3);
      this.attr3 = ""
    },
    clear(){
      this.attr1 = ""
      this.attrList1 = []
      this.attr2 = ""
      this.attrList2 = []
      this.attr3 = ""
      this.attrList3 = []
    },
    change(){
      this.flag = !this.flag
      // this.$set(this.tableList,"go","to")
      // this.$delete(this.tableList,"go")
      this.tableList = this.categoryList[this.category]
    },
    returnSelected(){
      for(var i in this.list){
        if(this.category == this.list[i].name){
          this.category_id = this.list[i].id
        }
      }
    }
  },
  mounted(){
    this.isLoading = true
    axios.request({
        method: "get",
        url: "/category/getall/",
        baseURL: this.baseURL,
      }).then((res)=>{ 
        // console.log(res)
        this.isLoading = false
        for(var i in res.data.data){
          var item = res.data.data[i]
          if(item.property==""){
            item.property={}
          }else{
            this.categoryList[item.name] = JSON.parse(item.property)
          }
        }
        this.list = res.data.data
      }).catch((err)=>{
        console.log(err)
      })
  },
  watch: {
    category(){
      this.clear()
    }
  }
  
}
</script>

<style lang="scss" scoped>
    .addCategory{
      display: flex;
      flex-direction: column;
      min-height: 100%;
        .main{
          
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          .navBgc{
            min-width: 160px;
            flex-shrink: 0;
            flex-grow: 0;
            min-height:100%;
            background-color: #17a2b8;
          }
          .page{
            padding: 40px;
            margin: 50px;
            flex-grow: 2;
          }
        }
    }
    #hover:hover{
      cursor:pointer;
    }
</style>