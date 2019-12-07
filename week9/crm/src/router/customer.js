export default [
    {
        path:'/crm/my',
        name:'my',
        meta:{
            type:'crm',
            rootTil:'客户管理',
            til:'我的客户',
            icon:'el-icon-user',
            power:'allcustomer'
        },
        components:()=>import(/* webpackChunkName: "customer" */ '@/components/customer/my')
    },
    {
        path:'/crm/add',
        name:'add',
        meta:{
            type:'crm',
            rootTil:'客户管理',
            til:'新增客户',
            icon:'el-icon-user',
            power:'allcustomer'
        },
        components:()=>import(/* webpackChunkName: "customer" */ '@/components/customer/add')
    },
    {
        path:'/crm/all',
        name:'all',
        meta:{
            type:'crm',
            rootTil:'客户管理',
            til:'全部客户',
            icon:'el-icon-user',
            power:'allcustomer'
        },
        components:()=>import(/* webpackChunkName: "customer" */ '@/components/customer/my')
    }
]