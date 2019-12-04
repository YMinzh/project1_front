<template>
    <div class="attrShow">
            <div class="block" v-for="(item, index) in attrs" :key="index" >
                <div class="delete" @click="remove(index)"></div>
                {{item}}
                
            </div>
    </div>
</template>

<script>
export default {
    props: ["attrs"],
    methods:{
        remove(index){
            this.attrs.splice(index,1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .attrShow{
        width: 98%;
        margin: 0 auto;
        display: flex;
        overflow-y: visible;
        align-items: center;
        overflow-x: auto;
        .block{
            position: relative;
            padding: 0 10px;
            border-radius: 100px;
            background-color: #bbbbbb;
            color: white;
            margin: 2px 5px;
            flex-wrap: nowrap;
            height: 80%;
            border: 1px solid #bbbbbb;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            .delete{
                width: 10px;
                height: 10px;
                border-radius: 100%;
                position: absolute;
                right: -3px;
                top: -3px;
                background-color: red;
            }
        }
    }
</style>