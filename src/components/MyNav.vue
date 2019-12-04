<template>
    <div class="MyVue">
        <b-nav vertical class="w-25" pills>
            <b-nav-item disabled >导航栏</b-nav-item>
            <b-nav-item :to="item.href" :active="index==acIndex" v-for="(item, index) in items" :key="index">{{item.name}}</b-nav-item>

        </b-nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    props: ["items","acIndex"],
    methods: {

    }
}
</script>

<style lang="scss">
    .MyVue{
        
        .w-25{
            width: 100%!important;
            .nav-item{
                background-color: #17a2b8;
                color: white;
                a{
                    color: white;
                }
                .active{
                    background-color: #fff;
                    color: #17a2b8;
                    border-radius: 0;
                }
            
            }
        }
    }
</style>