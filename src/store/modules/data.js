import aside from '@/mock/menuList';
import http from '@/utils/request';
import directData from '@/mock/direct-data'

function a() {
  let arr = arguments[0];
  let mockData = arguments[1];
  let flag = 0;
  if(arr.length) {
    arr.forEach(item1 => {
      item1.group.forEach(item2 => {
        item2.menuItem.forEach(item3 => {
          if(mockData[flag]=='1' || mockData[flag] == '0') {
            item3.show = mockData[flag];
            flag++;
          }
        })
      })
    });
  }
  return arr;
};

export default {
    state: {
      asideData: aside,
      allAside:[],
      direct:[]
    },
    mutations: {
      UPDATEDASIDEDATA: (state, newValue ) => {
        state.allAside = newValue;
        if(newValue){
          state.asideData = newValue[0].group;
        }else {
          state.asideData = [];
        }
      },
      UPDATEDIRECT : (state, newValue ) => {
        state.direct = newValue;
      }
    },
    actions: {
      updatedAsideData( { commit ,state }) {
        return new Promise((resolve, reject) => {
          http.get(`/sys/menu/${state.communityId}/getByOuterKey`)
            .then(res => {
              let menuList =res.data?a(aside,res.data.spread.split('')) : null;
              commit('UPDATEDASIDEDATA', menuList);
              resolve({msg:'success'})
            }).catch(err => {
              reject(err)
            })
        } )
      },
      updateDirect( { commit, state }, nav) {
        if(nav) {
          let moduleList = nav.split('/');
          let moduleObj = directData[moduleList[2]];
          if(moduleObj) {
            commit('UPDATEDIRECT',[moduleObj['parent'],moduleObj['name'],moduleObj[moduleList[3]]])
          }
        }
      }
    }
  }
