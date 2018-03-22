//基础管理
const path = [
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
]

export default path;
