const cusHttpUrl = {
  //客户管理
    list:'/customer/list',
    add:'/customer/add',
    edit:'/customer/edit',
    del:'',
  },
  contractHttpUrl = {
  //合同管理
    list:'/contract/list',
    detail:'/contract/',//{id}/detail
    add:'/contract/add',
    edit:'/contract/edit',
    searchCus:'/customer/list',//搜索客户
    searchProject:'/house/list',//搜索项目
    searchEmployee:'/employee/list',//搜索职工
  },
  certificateHttpUrl = {
  //电梯管理
    list:'/elevator/list',
    add:'/elevator/add',
  },
  projectHttpUrl = {
  //项目管理
    list:''
  },
  employeeManage = {
  //职工管理

  };
export {cusHttpUrl,contractHttpUrl,certificateHttpUrl,projectHttpUrl,employeeManage};
