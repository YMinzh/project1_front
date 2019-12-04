<template>
    <table><tbody class="tbody">
        <tr>
            <td v-for="(item, index) in list" :key="index">{{item}}</td>
            <td>原价</td>
            <td>售价</td>
            <td>库存</td>
            <td>状态</td>
            <td>排序值</td>
        </tr>
        <tr v-for="(item, index) of items" :key="index">
            <td v-show="Object.keys(list).length>0">{{item.attr1}}</td>
            <td v-show="Object.keys(list).length>1">{{item.attr2}}</td>
            <td v-show="Object.keys(list).length>2">{{item.attr3}}</td>
            <td>
                <b-input size="sm" type="number" v-model="item.original_price">

                </b-input>
            </td>
            <td>
                <b-input size="sm" type="number" v-model="item.price">

                </b-input>                
            </td>
            <td>
                <b-input size="sm" type="number" v-model="item.quantity">

                </b-input>                
            </td>
            <td>
                <b-form-select :options="options" v-model="item.status" value-field="item" text-field="name" size="sm">

                </b-form-select>
            </td>
            <td>
                <b-input size="sm" type="number" v-model="item.sort">

                </b-input>  
            </td>

        </tr>
        
    </tbody></table>
</template>

<script>
export default {
    data(){
        return{
           
            options: [
                {item: 1, name: "上架"},
                {item: 2, name: "下架"},
                
            ],

        }
    },
    props: ["list","items"],
    mounted(){
        
    },
    methods: {
        add(){
            if(this.selected==""){
                return
            }


            var json = {attr1: this.attr1V, attr2: this.attr2V, attr3: this.attr3V, original_price: this.original_price, price: this.price, status: this.status, sort: this.sort}
            this.items.push(json)
            this.attr1V = null
            this.attr2V = null
            this.attr3V = null
            this.status = 1
            this.sort = 10
            this.original_price = ''
            this.price = ''
        },
        remove(index){
            console.log(index)
        },

    },
    watch:{
       items(){
           console.log(this.items,this.list)
       }
    }
}
</script>

<style lang="scss" scoped>
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