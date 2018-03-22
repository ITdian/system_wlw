//基础管理
const path = [
  //合同管理
  {
    name:'contractManage',
    path: '/contractManage',
    component: (resolve) => require(["@/page/home/basis/contractManage/list"], resolve)
  },
  //电梯管理
  {
    name:'certificateManage',
    path: '/certificateManage',
   component: (resolve) => require(["@/page/home/basis/contractManage/list"], resolve)
  },
  //客户管理
  {
    name:'cusManage',
    path: '/cusManage',
    component: (resolve) => require(["@/page/home/basis/cusManage/list"], resolve)
  },
  //项目管理
  {
    path: '/projectManage',
    component: (resolve) => require(["@/page/home/basis/projectManage/list"], resolve)
  },
  //职工管理
  {
    name: 'employeeManage',
    path: '/employeeManage',
     component: (resolve) => require(["@/page/home/basis/projectManage/list"], resolve)
  },
]

export default path;
