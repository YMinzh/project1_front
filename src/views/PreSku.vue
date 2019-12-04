<template>
    <div class="PreSku">
        <MyHeader></MyHeader>
        <div class="main">
          <div class="navBgc" ><MyNav :items="navItems" acIndex=4></MyNav></div>
          <div class="page">


            <!-- 状态 -->
            <b-row class="my-1 mb-3">
              <b-col sm="4"></b-col>
              <b-col sm="1">
                <label for="input-small">商品:</label>
              </b-col>
              <b-col sm="3">
                <b-form-select
                  v-model="selected"
                  id="initialSortSelect"
                  size="sm"
                  :options="list"
                  value-field="id"
                  text-field="name"
                  @input="change"
                >
                <template v-slot:first>
                  <option :value="null" disabled>请选择你要编辑的商品</option>
                </template>
                
                </b-form-select>
              </b-col>
              <b-col sm="4"></b-col>
            </b-row>
 




            <!-- 添加的主题 -->
            <myTable
            :list="this.tableList"
            :items="items"
            :flag = "flag"
            :selected = "selected"
            
            
            
            
            ></myTable>






            <!-- 按钮 -->
            <b-row class="my-1 mb-3">
              <b-col sm="5"></b-col>
              <b-col sm="3">
                <b-button @click="commit"> 确认 </b-button>
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
      selected: null,
      options: [
        {item:'1',name:"上架"},
        {item:'2',name:"下架"},
      ],
      baseURL: this.GLOBAL.baseURL,

      attrList1:[],
      attrList2:[],
      attrList3:[],
      attr1: "",
      attr2: "",
      attr3: "",
      text: "",
      items:{},
      flag: false,
      tableList:{},
      category_id: '',
      list: []
    }
  },
  methods: {
    errorBack(){
      this.errorFlag = false
    },
    
    commit(){
      this.isLoading = true
      var array=[]

      for(var index in this.items){
        array.push(this.items[index])
      }


      axios.request({
        method: "POST",
        url: "/sku/add/",
        baseURL: this.baseURL,
        data: {
          product_id: this.selected,

          data: array


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
      this.isLoading = true
      this.flag = !this.flag
      this.items = {}
      this.tableList = {}
      axios.request({
        method: "get",
        url: "/product/details?id="+this.selected,
        baseURL: this.baseURL,
      }).then((res)=>{ 
        this.isLoading = false
        this.tableList = JSON.parse(res.data.data.property)
        var attrList1 = res.data.data.attrList1;
        var attrList2 = res.data.data.attrList2;
        var attrList3 = res.data.data.attrList3;

        var num1 = attrList1.length;
        var num2 = attrList2.length;
        var num3 = attrList3.length;

        if(num1==0){
          num1 = 1;
          attrList1.push("")
        }
        if(num2==0){
          num2 = 1;
          attrList2.push("")
        }
        if(num3==0){
          num3 = 1;
          attrList3.push("")
        }

        for(var i = 0; i < num1; i++){
          for(var j= 0; j < num2; j++){
            for(var k = 0; k < num3; k++){
              this.items[attrList1[i]+attrList2[j]+attrList3[k]] = {attr1: attrList1[i], attr2: attrList2[j], attr3: attrList3[k]}
            }
          }
        }

        this.getExist()

        this.items = JSON.parse(JSON.stringify(this.items))

      }).catch((err)=>{
        console.log(err)
      })
    },
    getExist(){
      this.isLoading = true
      axios.request({
        method: "get",
        url: "/sku/getAll?product_id="+this.selected,
        baseURL: this.baseURL,
      }).then((res)=>{ 
        this.isLoading = false
        var arr = res.data.data
        for(var i in arr){
          // this.items[arr[i].attr1+arr[i].attr2+arr[i].attr3] = arr[i]
          this.$set(this.items, arr[i].attr1+arr[i].attr2+arr[i].attr3, arr[i])
        }



      }).catch((err)=>{
        console.log(err)
      })
    }

  },
  mounted(){
    this.isLoading = true
    axios.request({
        method: "get",
        url: "/product/getall/",
        baseURL: this.baseURL,
      }).then((res)=>{ 
        this.isLoading = false
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
    .PreSku{
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