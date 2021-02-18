module.exports = function (gatwayName, modelName) {
  return `
    import * as service from '../../utils/service';

    export default {
      namespace: '${modelName}',
      state: {
        datas: [],
      },
      subscriptions: {
        setup({ dispatch, history }) {
          // eslint-disable-line
        },
      },
      effects: {
        *getDatas({ payload, callback }, { put, call, select }) {
          let data = yield call(service.getCmd, '${gatwayName}/datas');
          console.log('getDatas', data);
          if (!!data.error) {
            return;
          }
          yield put({ type: '_saveDatas', payload: data });
          callback && callback(data);
        },
        *addData({ payload, callback }, { put, call, select }) {
          var data = yield call(service.postCmd, '${gatwayName}/data', payload);
          console.log('addData', data);
          // if (!!data.error) {
          //   return;
          // }
          yield put({ type: '_addData', payload: data });
          callback && callback(data);
        },
        *editData({ payload, callback }, { put, call, select }) {
          var data = yield call(service.putCmd, '${gatwayName}/data', payload);
          console.log('editData', data);
          // if (!!data.error) {
          //   return;
          // }
          yield put({ type: '_editData', payload: data });
          callback && callback(data);
        },
        *deleteData({ payload, callback }, { put, call, select }) {
          var data = yield call(service.deleteCmd, '${gatwayName}/data/payload');
          console.log('deleteData', data);
          if (!!data.error) {
            return;
          }
          yield put({ type: '_deleteData', payload: payload });
          callback && callback(data);
        },
      },
      reducers: {
        _saveDatas(state, { payload }) {
          return { ...state, datas: payload };
        },
        _addArea(state, { payload }) {
          let { areas } = state;
          areas.push(payload);
          return { ...state, areas: [...areas] };
        },
        _editArea(state, { payload }) {
          let { areas, prisonRooms } = state;
          for (var i = 0; i < areas.length; i++) {
            if (areas[i].id === payload.id) {
              areas[i] = payload;
              break;
            }
          }
          for (var i = 0; i < prisonRooms.length; i++) {
            if (prisonRooms[i].id === payload.id) {
              prisonRooms[i] = payload;
              break;
            }
          }
          return { ...state, areas: [...areas], prisonRooms: [...prisonRooms] };
        },
        _deleteArea(state, { payload }) {
          let { areas } = state;
          areas = areas.filter(u => u.id !== payload);
          return { ...state, areas };
        },
      },
    };
  ` 
}