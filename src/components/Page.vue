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
        <template v-slot:cell(sort)="row">{{row.value}}</template>
        <template v-slot:cell(created_at)="row">{{row.value}}</template>
        <template v-slot:cell(updated_at)="row">{{row.value}}</template>
        <template v-slot:cell(property)="row">
          <div class="row">

            <div style="width: 50px;margin-right:3px;">
              <b-form-input size="sm" :value="row.value[0]" disabled v-show="row.value[0]!=''"/>
            </div>
            <div style="width: 50px;margin-right:3px;">
              <b-form-input size="sm" :value="row.value[1]" disabled v-show="row.value[1]!=''"/>
            </div>
            <div style="width: 50px;">
            
              <b-form-input size="sm" :value="row.value[2]" disabled v-show="row.value[2]!=''&&row.value[1]!=''"/>
            </div>

          </div>
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
                <label for="name">分类名字</label>
             </b-col>
             <b-col sm="9">
                <b-form-input size="sm" id="name" v-model="row.item.name" placeholder="修改你的名字"></b-form-input>
             </b-col>
           </b-row>
           <b-row class="my-1">
             <b-col sm="3">
                <label for="name">分类属性</label>
             </b-col>
             <b-col sm="9">
                <div class="row" style="padding-left:15px;">

                    <div style="width: 50px;margin-right:3px;">
                      <b-form-input v-model="row.item.property[0]" size="sm"/>
                    </div>
                    <div style="width: 50px;margin-right:3px;">
                      <b-form-input v-model="row.item.property[1]"  @change="clearPro(row)" v-show="row.item.property[0]!=''" size="sm"/>
                    </div>
                    <div style="width: 50px;">
                    
                      <b-form-input v-model="row.item.property[2]" v-show="row.item.property[1]!=''" size="sm"/>
                    </div>

                </div>
             </b-col>
           </b-row>
           <b-row class="my-1">
             <b-col sm="3">
                <label for="sort">排序值</label>
             </b-col>
             <b-col sm="9">
                <b-form-input size="sm" id="sort" v-model="row.item.sort" placeholder="修改你的排序值"></b-form-input>
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
import alert from '@/components/Alert.vue'
import loading from '@/components/loading.vue'

  export default {
    components: {
      alert,loading
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
                { key: 'property', label: '商品属性'},
                { key: 'status', label: '状态'},
                { key: 'created_at', label: '创建时间'},
                { key: 'updated_at', label: '更新时间'},
                { key: 'sort', label: '排序值'},
                { key: 'actions', label: '操作'},
            ],
            options: [
                {item:'1',name:"上架"},
                {item:'2',name:"下架"},
            ]
      }
    },
    props: ["list"],
    methods: {
    errorBack(){
      this.errorFlag = false
    },
        goWarning(row){
            console.log(row)
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
          this.isLoading = true
          axios.request({
            method: "POST",
            url: "/category/delete/",
            baseURL: "http://127.0.0.1:3001/",
            params: {id: item.id}
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
          console.log(item)
          var newPro = {};
          if(item.property[0]==""){
            
          }else if(item.property[1]==""){
            newPro.attr1=item.property[0]
          }else if(item.property[2]==""){
            newPro.attr1=item.property[0]
            newPro.attr2=item.property[1]

          }else{
            newPro.attr1=item.property[0]
            newPro.attr2=item.property[1]
            newPro.attr3=item.property[2]
          }
          this.isLoading =true
          axios.request({
            method: "POST",
            url: "/category/update/",
            baseURL: "http://127.0.0.1:3001/",
            data: {
              id: item.id,
              name: item.name,
              sort: item.sort,
              property: newPro,
              status: this.list[index].status  
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
    }
  }

//   , sortable: true, sortDirection: 'desc' 
</script>