let routes = [
    {
        path: '/login',
        component: () => import('./views/Login.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: () => import('./views/404.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/user/profile',
        component: () => import('./views/Home.vue'),
        name: 'user',
        title: '个人中心',
        hidden: true,
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/user/profile', component: () => import('./views/user/profile.vue'), title: '基本资料', name: "profile", needSearch: true },
            { path: '/user/class', component: () => import('./views/user/class.vue'), title: '班级信息', name: "class", needSearch: true },

        ]
    },
    {
        path: '/main/index',
        component: () => import('./views/Home.vue'),
        name: 'main',
        title: '首页',
        iconCls: 'fa fa-address-card',
        children: [

        ]
    },



    {
        path: '/course/index',
        component: () => import('./views/Home.vue'),
        title: '课程',
        name: 'course',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/course/index', component: () => import('./views/Course/index.vue'), name: 'courseList', title: '课程' }
        ]
    },
    {
        path: '/tiku/tikuList',
        component: () => import('./views/Home.vue'),
        name: 'tiku',
        title: '题库',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/tiku/tikuList', component: () => import('./views/Tiku/tikuList.vue'), title: '学校题库', name: "tikuList", needSearch: true },
            { path: '/tiku/collctionList', component: () => import('./views/Tiku/collctionList.vue'), title: '我的收藏', name: "collctionList", needSearch: true },
            { path: '/tiku/errorList', component: () => import('./views/Tiku/errorList.vue'), title: '我的错题', name: "errorList", needSearch: true },

        ]
    },

    // {
    //     path: '/',
    //     component: Home,
    //     name: '教程',
    //     iconCls: 'fa fa-user',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '后台管理', hidden: true },
    //         { path: '/teacherList', component: teacherList, name: '教师列表' },
    //         // { path: '/salaryList', component: SalaryList, name: '工资列表' },
    //         // { path: '/form', component: Form, name: '工资列表' },
    //         //{ path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '题目',
    //     iconCls: 'fa fa-btc',
    //     children: [
    //         { path: '/fundTypeList', component: fundTypeList, name: '基金类型' },
    //         { path: '/fundList', component: fundList, name: '基金列表' },

    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;