<template>
    <div class="addCategory">
        <MyHeader></MyHeader>
        <div class="main">
          
          <div class="navBgc" ><MyNav :items="navItems" acIndex=5></MyNav></div>
          <div class="page">

            <template>
                <div style="display: none">
                    <b-form-file v-model="file" id="file-small" size="sm"></b-form-file>

                </div>
                <table><tbody class="tbody">
                    <tr>
                        <td>名字</td>
                        <td>类型</td>
                        <td>图片</td>
                        <td>链接类型</td>
                        <td>链接目标</td>
                        <td>排序</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                    <tr>
                        <td>
                          <b-input v-model="title" size="sm">

                          </b-input>
                        </td>
                        <td>
                          <b-form-select v-model="type_id" size="sm" :options="typeSelect" value-field="item" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>导航类型</option>
                            </template>
                          </b-form-select>
                        </td>
                        <td>
                            <div style="height: 80px">
                              <label for="file-small">
                                  <img style="width: 100%;height: 80px" :src="picUrl" alt="">
                              </label>
                            </div>
                        </td>
                        <td>
                          <b-form-select @input="linkChange" v-model="link_type" size="sm" :options="linkSelect" value-field="item" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>链接类型</option>
                            </template>
                          </b-form-select>
                        </td>
                        <td>
                          <b-form-select v-model="link_target" size="sm" :options="targetSelect" value-field="id" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>目标</option>
                            </template>
                          </b-form-select>
                        </td>
                        <td>
                          <b-input v-model="sort" size="sm" type="number">

                          </b-input>
                        </td>
                        <td>
                          <b-form-select v-model="status" size="sm" :options="statusSelect" value-field="item" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>状态</option>
                            </template>
                          </b-form-select>
                        </td>

                        <td>
                          <b-button @click="add" size="sm">
                            添加
                          </b-button>
                        </td>
                    </tr>

                    <tr v-for="(item, index) in items" :key="index">
                        <td>
                          <b-input v-model="item.title" size="sm">

                          </b-input>
                        </td>
                        <td>
                          <b-form-select v-model="item.type_id" size="sm" :options="item.typeSelect" value-field="item" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>导航类型</option>
                            </template>
                          </b-form-select>
                        </td>
                        <td>
                            <div style="height: 80px">
                              <label>
                                  <img style="width: 100%;height: 80px" :src="item.picture" alt="">
                                  <b-form-file style="display: none" @input="commit(item,index)" v-model="item.file" id="file" size="sm"></b-form-file>
                              </label>
                            </div>
                        </td>
                        <td>
                          <b-form-select @input="linkChange(item,index)" v-model="item.link_type" size="sm" :options="item.linkSelect" value-field="item" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>链接类型</option>
                            </template>
                          </b-form-select>
                        </td>
                        <td>
                          <b-form-select v-model="item.link_target" size="sm" :options="item.targetSelect" value-field="id" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>目标</option>
                            </template>
                          </b-form-select>
                        </td>
                        <td>
                          <b-input v-model="item.sort" size="sm" type="number">

                          </b-input>
                        </td>
                        <td>
                          <b-form-select v-model="item.status" size="sm" :options="item.statusSelect" value-field="item" text-field="name">
                            <template v-slot:first>
                              <option :value="null" disabled>状态</option>
                            </template>
                          </b-form-select>
                        </td>

                        <td>
                          <b-button class="mr-1" variant="success"  @click="update(item,index)" size="sm">
                            修改
                          </b-button>
                          <b-button @click="remove(item)" variant="danger" size="sm">
                            删除
                          </b-button>
                        </td>
                    </tr>

                    
                </tbody></table>
                
              
            </template>
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
      baseURL: this.GLOBAL.baseURL,
      file:null,
      title: "",
      typeSelect: [
        {name: "顶部导航", item: 1},
        {name: "banner图", item: 2},
        {name: "icon", item: 3},
        {name: "大图", item: 4},
      ],
      picUrl: "http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg",
      type_id: null,
      linkSelect: [
        {name: "分类", item: 1},
        {name: "商品", item: 2},
      ],
      link_type: null,
      statusSelect: [
        {name: "上架", item: 1},
        {name: "下架", item: 2},
      ],
      status: null,
      sort: 10 ,
      targetSelect:[],
      link_target:null,
      items: [],
    }
  },
  methods: {
    errorBack(){
      this.errorFlag = false
    },
    commit(item,index){
      this.isLoading = true
      let param = new FormData(); //创建form对象
      var file = null;
      if(index==undefined){
        file = this.file
      } else{
        file = this.items[index].file
      }
      
        param.append('file',file);//通过append向form对象添加数据      



      if(file==null||file==undefined){
        return
      }

      
      axios.request({
        method: "POST",
        url: "/upload/",
        baseURL: this.baseURL,
        headers:{'Content-Type':'multipart/form-data'},
        data: param
        
      }).then((res)=>{ 
        this.isLoading = false
        if(index==undefined){
          this.picUrl = res.data.data
        }else{

          this.items[index].picture = res.data.data
        }
      }).catch((err)=>{
        console.log(err,"111")
      })
    },
    linkChange(val,index){
      var url;
      var link;
      if(index==undefined){
        link = this.link_type
      }else {
        link = this.items[index].link_type
      }


      if(link==1){
        url = "/category/getall"
      }else if(link==2){
        url = "/product/getall"
      }else {
        return
      }

      axios.request({
        method: "get",
        url: url,
        baseURL: this.baseURL
      }).then((res)=>{ 
        
        if(index==undefined){
          this.targetSelect = res.data.data
        }else{
          this.items[index].targetSelect = res.data.data
          this.items = JSON.parse(JSON.stringify(this.items))
        }
        
      }).catch((err)=>{
        console.log(err,"222")
      })
    },
    add(){
      this.isLoading = true
      axios.request({
        method: "POST",
        url: "/nav/add",
        baseURL: this.baseURL,
        data: {
          title: this.title,
          type_id: this.type_id,
          sort: this.sort,
          picture: this.picUrl,
          link_type: this.link_type,
          link_target: this.link_target,
          status: this.status,
        }
        
      }).then((res)=>{ 
        this.isLoading = false
        this.again()
        this.title = ""
        this.type_id = null
        this.picUrl = "http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg"
        this.link_type = null
        this.link_target = null
        this.sort = 10
        this.status = null
        this.errorNews = "添加成功"
        this.errorFlag = true
      }).catch((err)=>{
        console.log(err,"333")
      })
    },
    again(){
      this.isLoading = true
      axios.request({
        method: "get",
        url: "/nav/getall",
        baseURL: this.baseURL,
        
      }).then((res)=>{ 
        this.items = res.data.data
        this.isLoading = false
        for(var index in this.items){
          this.items[index].typeSelect= JSON.parse(JSON.stringify(this.typeSelect))
          this.items[index].linkSelect= JSON.parse(JSON.stringify(this.linkSelect))
          this.items[index].statusSelect = JSON.parse(JSON.stringify(this.statusSelect))
          this.items = JSON.parse(JSON.stringify(this.items))
          this.linkChange(this.items[index].link_type,index)
          this.items = JSON.parse(JSON.stringify(this.items))
        }
        this.items = JSON.parse(JSON.stringify(this.items))
        this.$forceUpdate()
        
      }).catch((err)=>{
        console.log(err)
      })
    },
    update(item,index){
      this.isLoading = true
      axios.request({
        method: "POST",
        url: "/nav/update",
        baseURL: this.baseURL,
        data: {
          id: item.id,
          title: item.title,
          type_id: item.type_id,
          sort: item.sort,
          picture: item.picture,
          link_type: item.link_type,
          link_target: item.link_target,
          status: item.status,
        }
        
      }).then((res)=>{ 
        this.again()
        this.isLoading = false
        this.errorNews= "更新成功"
        this.errorFlag = true
      }).catch((err)=>{
        console.log(err,"444")
      })

    },
    remove(item){
      if(!confirm("你确定要删除吗")){
        return
      }
      axios.request({
        method: "get",
        url: "/nav/delete?id="+item.id,
        baseURL: this.baseURL,
      }).then((res)=>{ 
        this.again()
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }

  },
  mounted(){
    this.again();
  },
  watch: {
    file(){
      this.commit();

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
    table{
        width: 100%;
        table-layout: fixed;
        outline: 1px solid rgba(0,0,0,0.05);
        .tbody{
            tr{
                &:nth-of-type(2n-1){
                    background-color: rgba(0,0,0,0.05);
                }
                td{
                    height: 50px;
                    padding: 3px 10px;
                    text-align: center;
                }
            }
        }
    }
</style>