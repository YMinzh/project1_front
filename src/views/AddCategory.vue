<template>
    <div class="addCategory">
        <MyHeader></MyHeader>
        <div class="main">
          <div class="navBgc" ><MyNav :items="navItems" acIndex=2></MyNav></div>
          <div class="page">
            <!-- 名字 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">分类名字:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input v-model="name" id="input-small" size="sm" placeholder="分类名字不多于16位"></b-form-input>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
            <!-- 属性 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">分类属性:</label>
              </b-col>
              <b-col sm="3">

                <b-row>
                  <b-col sm="4">
                    <b-form-input 
                    v-model="property[0]" 
                    id="input-small" 
                    size="sm"
                    @input="blur1(0)"
                    ></b-form-input>
                  </b-col>
                  <b-col sm="4">
                    <b-form-input @input="blur1(1)" v-model="property[1]" id="input-small" size="sm" v-show="property[0]!=''"></b-form-input>
                  </b-col>
                  <b-col sm="4">
                    <b-form-input v-model="property[2]" id="input-small" size="sm" v-show="property[1]!=''"></b-form-input>
                  </b-col>
                </b-row>

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
import alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'
import axios from 'axios'


export default {
  name: 'home',
  components: {
    MyNav,MyHeader,Page,alert,loading
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
      baseURL: this.GLOBAL.baseURL
    }
  },
  methods: {
    errorBack(){
      this.errorFlag = false
    },
    commit(){
      this.isLoading = true
      axios.request({
        method: "POST",
        url: "/category/add/",
        baseURL: this.baseURL,
        data: {
          name: this.name,
          sort: this.sort,
          property: {attr1: this.property[0],attr2: this.property[1],attr3: this.property[2],},
          status: this.selected,
        }
      }).then((res)=>{ 
        this.isLoading = false
        this.errorNews = "添加成功"
        this.errorFlag = true
      }).catch((err)=>{
        console.log(err)
      })
    },
    blur1(index){
      if(this.property[index]==""){
        this.property.splice(index,1)
        this.property.splice(2,1,"")
      }
    }
  },
  mounted(){
    
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
</style>