<template>
    <div class="home">
        <MyHeader></MyHeader>
        <div class="main">
          <div class="navBgc" ><MyNav :items="navItems" acIndex=1></MyNav></div>
          <div class="page"><Page2 :list="list" :propertyList="propertyList" @again="request" @callback="refresh()"></Page2></div>
        </div>
        <alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></alert>
        <loading :isLoading="isLoading"/>
    </div>
</template>

<script>
// @ is an alias to /src
import MyNav from '@/components/MyNav.vue'
import MyHeader from '@/components/MyHeader.vue'
import Page2 from '@/components/Page2.vue'
import axios from 'axios'
import loading from '@/components/loading.vue'
import alert from '@/components/Alert.vue'

export default {
  name: 'home',
  components: {
    MyNav,MyHeader,Page2,alert,loading
  },
  data(){
    return{
      isLoading: false,
      errorNews: "",
      errorFlag: false,
      navItems:this.GLOBAL.navItems,
      list:[],
      baseURL: this.GLOBAL.baseURL,
      propertyList: {},
    }
  },
  methods: {
    errorBack(){
      this.errorFlag = false
    },
    request(){
      this.isLoading = true
      axios.request({
        method: "get",
        url: "/product/getall/",
        baseURL: this.baseURL,
      }).then((res)=>{
        var str;
        for(let i in res.data.data){
          res.data.data[i].created_at=res.data.data[i].created_at.split(".")[0];
          res.data.data[i].updated_at=res.data.data[i].updated_at.split(".")[0];

          this.forProperty(res.data.data[i].id)
          this.isLoading =false          

        }
        this.list = res.data.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    forProperty(id){
      axios.request({
        method: "get",
        url: "/product/details?id="+id,
        baseURL: this.baseURL,
        
      }).then((res)=>{
        this.propertyList[id] = res.data.data
        
      }).catch((err)=>{
        console.log(err)
      })
    },
    refresh(){
      this.propertyList = JSON.parse(JSON.stringify(this.propertyList))
    }
  },
  mounted(){
    this.request();
  }
  
}
</script>

<style lang="scss" scoped>
    .home{
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