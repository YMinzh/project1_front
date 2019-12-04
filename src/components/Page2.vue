<template>
  <div>
    <b-table striped hover :items="list" :fields="fields">
        <!-- 名字 -->
        <template v-slot:cell(name)="row">{{row.value}}</template>
        <!-- 状态 -->
        <template v-slot:cell(status)="row">
            <!-- {{row.value==1?"在线":""}}
            {{row.value==2?"下架":""}} -->
            <!-- {{row.value}} -->
            <b-form-select
                class="mb-3"
                v-model="row.value"
                id="initialSortSelect"
                size="sm"
                :options="options"
                value-field="item"
                text-field="name"
            ></b-form-select>
        </template>
        <!-- 排序 -->
        <template v-slot:cell(sort)="row">{{row.value}}</template>
        <!-- 创建时间 -->
        <template v-slot:cell(created_at)="row">{{row.value}}</template>
        <!-- 更新时间 -->
        <template v-slot:cell(updated_at)="row">{{row.value}}</template>
        <template v-slot:cell(sale_num)="row">
          {{row.value}}
        </template>
        <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="goChange(row)" class="mr-1">
            {{row.detailsShowing?"取消":"修改"}}
            </b-button>
            <b-button size="sm" @click="goWarning(row)">
            {{row.detailsShowing?"确定":"删除"}}
            </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
           <b-row class="my-1">
             <b-col sm="3">
                <label for="name">商品名字</label>
             </b-col>
             <b-col sm="9">
                <b-form-input size="sm" id="name" v-model="row.item.name" placeholder="修改你的名字"></b-form-input>
             </b-col>
           </b-row>
           
           <b-row class="my-1 mt-2">
             <b-col sm="3">
                <label for="sort">排序值</label>
             </b-col>
             <b-col sm="9">
                <b-form-input size="sm" id="sort" v-model="row.item.sort" placeholder="修改你的排序值"></b-form-input>
             </b-col>
           </b-row>
           
           <b-row class="my-1 mt-2">
             <b-col sm="3">
                <label for="content">描述</label>
             </b-col>
             <b-col sm="9">
                <b-form-textarea size="sm" id="content" v-model="row.item.content" placeholder="修改你的描述(可选)"></b-form-textarea>
             </b-col>
           </b-row>
<!-- attr1 -->
           <b-row class="my-1 mt-2"  v-show="JSON.parse(propertyList[row.item.id].property).attr1!=null||JSON.parse(propertyList[row.item.id].property).attr1!=undefined">
              <b-col sm="3">
                  <label for="attr1">{{JSON.parse(propertyList[row.item.id].property).attr1}}</label>
              </b-col>
              <b-col sm="1">
                  <b-form-input size="sm" id="attr1" v-model="attr1" @blur="addAttr(1,row.item.id)"></b-form-input>
              </b-col>
              <b-col class="attrbox" sm="8">
                <attrShow :attrs="propertyList[row.item.id].attrList1"></attrShow>
              </b-col>
            </b-row>
<!-- attr2 -->
            <b-row class="my-1 mt-2"  v-show="JSON.parse(propertyList[row.item.id].property).attr2!=null||JSON.parse(propertyList[row.item.id].property).attr2!=undefined">
              <b-col sm="3">
                  <label for="attr2">{{JSON.parse(propertyList[row.item.id].property).attr2}}</label>
              </b-col>
              <b-col sm="1">
                  <b-form-input size="sm" id="attr2" v-model="attr2" @blur="addAttr(2,row.item.id)"></b-form-input>
              </b-col>
              <b-col class="attrbox" sm="8">
                <attrShow :attrs="propertyList[row.item.id].attrList2"></attrShow>
              </b-col>
            </b-row>
<!-- attr3 -->
            <b-row class="my-1 mt-2"  v-show="JSON.parse(propertyList[row.item.id].property).attr3!=null||JSON.parse(propertyList[row.item.id].property).attr3!=undefined">
              <b-col sm="3">
                  <label for="attr3">{{JSON.parse(propertyList[row.item.id].property).attr3}}</label>
              </b-col>
              <b-col sm="1">
                  <b-form-input size="sm" id="attr3" v-model="attr3"  @blur="addAttr(3,row.item.id)"></b-form-input>
              </b-col>
              <b-col class="attrbox" sm="8">
                <attrShow :attrs="propertyList[row.item.id].attrList3"></attrShow>
              </b-col>
            </b-row>
        </b-card>
      </template>
        
    </b-table>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
    >
      {{measure}}
    </b-alert>

        <alert :errorNews="errorNews" v-show="errorFlag" @callback="errorBack"></alert>
        <loading :isLoading="isLoading"/>

  </div>
  

  
</template>

<script>
import axios from 'axios'
import attrShow from '@/components/AttrShow.vue'
import alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'


  export default {
    components: {
      attrShow,alert,loading
    },
    data() {
        return {
            isLoading: false,
            errorNews: "",
            errorFlag: false,
            dismissCountDown: 0,
            measure:"",
            isShow: false,
            status:this.list==1?"上架":"下架",
            fields: [
                { key: 'name', label: '商品名字'},
                { key: 'sale_num', label: '销量'},
                { key: 'status', label: '状态'},
                { key: 'created_at', label: '创建时间'},
                { key: 'updated_at', label: '更新时间'},
                { key: 'sort', label: '排序值'},
                { key: 'actions', label: '操作'},
            ],
            options: [
                {item:'1',name:"上架"},
                {item:'2',name:"下架"},
            ],
            attr1: "",
            attr2: "",
            attr3: "",
      }
    },
    props: ["list","propertyList"],
    methods: {
        errorBack(){
          this.errorFlag = false
        },
        goWarning(row){
     
            if(!row.detailsShowing){
              this.delete(row.item)
            }else{
              this.change(row.item,row.index)
            }
        },
        clearPro(val){
          if(val.item.property[1]==""){
            val.item.property[2]=""
          }
        },
        goChange(row){
  
          row.toggleDetails()
          if(!row.detailsShowing){
            return
          }
          this.$emit("again")
        },
        delete(item){
          if(!confirm("你确定要删除吗")){
            return
          }
          this.isLoading =true
          axios.request({
            method: "POST",
            url: "/product/delete/",
            baseURL: "http://127.0.0.1:3001/",
            data: {id: item.id}
          }).then((res)=>{
            this.isLoading = false
            this.errorNews = "删除成功"
            this.errorFlag = true
            if(res.data.code==0){
              this.measure = "删除成功"
              this.dismissCountDown = 2
              this.$emit("again")
            }
          }).catch((err)=>{
            alert(err)
          })
        },
        change(item,index){
          // console.log(item.id,item.name,item.sort,item.status,item.content,this.propertyList[item.id])
          // return;

          this.isLoading = true

          axios.request({
            method: "POST",
            url: "/product/update/",
            baseURL: "http://127.0.0.1:3001/",
            data: {
              id: item.id,
              name: item.name,
              sort: item.sort,
              status: item.status,  
              attrList1: this.propertyList[item.id].attrList1,
              attrList2: this.propertyList[item.id].attrList2,
              attrList3: this.propertyList[item.id].attrList3,
              content: item.content,

            }
          }).then((res)=>{
            this.isLoading =false
            this.errorNews = "修改成功"
            this.errorFlag = true
            if(res.data.code==0){
              this.measure = "修改成功"
              this.dismissCountDown = 2
              this.$emit("again")
            }
          }).catch((err)=>{
            alert(err)
          })

          
        },
        addAttr(num,id){
          if(num==1&&this.attr1!=""){
            this.propertyList[id].attrList1.push(this.attr1)
            this.attr1 = ""
          }else if(num==2&&this.attr2!=""){
            this.propertyList[id].attrList2.push(this.attr2)
            this.attr2 = ""
          }else if(num==3&&this.attr3!=""){
            this.propertyList[id].attrList3.push(this.attr3)
            this.attr3 = ""
          }
          this.$emit("callback")
          
        }
    },
    mounted(){
      console.log(this.propertyList)
      
    }
  }

//   , sortable: true, sortDirection: 'desc' 
</script>

<style lang="scss" scoped>
   
</style>