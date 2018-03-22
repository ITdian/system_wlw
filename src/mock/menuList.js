const arr = [
  {
    id:'1',
    name:'基础管理',
    icon:'icon-base',
    show: 1,
    group:[
      {
        id:'1-1',
        name:'客户管理',
        tag:'cusManage',
        show: 1,
        link:'/cusManage',
      },
      {
        id:'1-2',
        name:'项目管理',
        show: 1,
        link:'/projectManage',
      },
      {
        id:'1-3',
        name:'技工管理',
        show: 1,
        link:'/home/artisanManage/list',
      },
      {
        id:'1-4',
        name:'电梯管理',
        show: 1,
        link:'/home/liftManage/list',
      },
    ]
  },
  {
    id:'2',
    name:'合同管理',
    show: 1,
    icon:'icon-contract',
    group:[
      {
        id:'2-1',
        name:'合同信息',
        show: 1,
        link:'/home/baseManage/customer/list33',
      },
      {
        id:'2-2',
        name:'应收款',
        show: 1,
        link:'/home/baseManage/customer/list333',
      }
    ]
  },
  {
    id:'3',
    name:'作业管理',
    show: 1,
    icon:'icon-jindu',
    group:[
      {
        id:'3-1',
        name:'保养管理',
        show: 1,
        link:'/home/baseManage/1/list33',
      },
      {
        id:'3-2',
        name:'维修管理',
        show: 1,
        link:'/home/baseManage/3/list333',
      },
      {
        id:'3-3',
        name:'年检管理',
        show: 1,
        link:'/home/baseManage/4/list333',
      }
    ]
  },
  {
    id:'4',
    name:'物联中心',
    show: 1,
    icon:'icon-dyiot',
    group:[
      {
        id:'4-1',
        name:'数据统计',
        show: 1,
        link:'/home/baseM2ge/1/list33',
      },
      {
        id:'4-2',
        name:'终端管理',
        show: 1,
        link:'/home/baseMan4ge/3/list333',
      },
      {
        id:'4-3',
        name:'运行管理',
        show: 1,
        link:'/home/baseMa2/3/list333',
      }
    ]
  },{
    id:'5',
    name:'仓库管理',
    show: 1,
    icon:'icon-cangku',
    group:[
      {
        id:'5-1',
        name:'配件统计',
        show: 1,
        link:'/home/base2ge/1/list33',
      },
      {
        id:'5-2',
        name:'订单管理',
        show: 1,
        link:'/home/bas4n4ge/3/list333',
      },
      {
        id:'5-3',
        name:'库存管理',
        show: 1,
        link:'/home/b4Ma2/3/list333',
      }
    ]
  },
  {
    id:'6',
    name:'报表中心',
    show: 1,
    icon:'icon-web-icon',
    group:[
      {
        id:'6-1',
        name:'综合报表',
        show: 1,
        link:'/home/b1ase2ge/1/list33',
      },
      {
        id:'6-2',
        name:'电梯报表',
        show: 1,
        link:'/home/bas42n4ge/3/list333',
      },
      {
        id:'6-3',
        name:'作业报表',
        show: 1,
        link:'/home/b4Ma42/3/list333',
      },
      {
        id:'6-4',
        name:'仓库报表',
        show: 1,
        link:'/home/b44a42/3/list333',
      }
    ]
  },
  {
    id:'7',
    name:'系统管理',
    show: 1,
    icon:'icon-xitong',
    group:[
      {
        id:'7-1',
        name:'权限管理',
        show: 1,
        link:'/home1/base2ge/1/list33',
      },
      {
        id:'7-2',
        name:'企业信息',
        show: 1,
        link:'/home1/bas4n4ge/3/list333',
      },
      {
        id:'7-3',
        name:'个人信息',
        show: 1,
        link:'/home1/b4Ma2/3/list333',
      },
      {
        id:'7-4',
        name:'消息管理',
        show: 1,
        link:'/home2/b4Ma2/3/list333',
      }
    ]
  }
]
export default arr;
