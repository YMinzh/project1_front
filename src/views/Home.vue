<template>
    <div class="home">
        <MyHeader></MyHeader>
        <div class="main">
          <div class="navBgc" ><MyNav :items="navItems" acIndex=0></MyNav></div>
          <div class="page"><Page :list="list" @again="request"></Page></div>
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
import alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'

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
      list:[],
      baseURL: this.GLOBAL.baseURL
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
        url: "/category/getall/",
        baseURL: this.baseURL,
      }).then((res)=>{
        var str;
        console.log(res.data.data)
        for(let i in res.data.data){
          res.data.data[i].created_at=res.data.data[i].created_at.split(".")[0];
          res.data.data[i].updated_at=res.data.data[i].updated_at.split(".")[0];

          console.log(res.data.data[i].property)
          var pro = res.data.data[i].property

          if(pro==""){
            res.data.data[i].property = ["","",""]  
          }else{
            let arr1 = pro.split('":"')
            console.log(arr1)
            if(arr1.length==2){
              console.log(arr1[1].split('"')[0])
              res.data.data[i].property = [arr1[1].split('"')[0],"",""]
            }else if(arr1.length==3){
              console.log(arr1[1].split('"')[0],arr1[2].split('"')[0])
              res.data.data[i].property = [arr1[1].split('"')[0],arr1[2].split('"')[0],""]

            }else if(arr1.length==3){
              console.log(arr1[1].split('"')[0],arr1[2].split('"')[0],arr1[3].split('"')[0])
              res.data.data[i].property = [arr1[1].split('"')[0],arr1[2].split('"')[0],arr1[3].split('"')[0]]   
            }else{
              res.data.data[i].property = ["","",""]  

            }
          }


        }
        this.list = res.data.data
        this.isLoading = false
      }).catch((err)=>{
        console.log(err)
      })
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