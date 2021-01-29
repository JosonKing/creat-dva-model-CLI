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
          callback && callback(data);
          yield put({ type: '_saveDatas', payload: data });
        },
      },
      reducers: {
        _saveDatas(state, { payload }) {
          return { ...state, datas: payload };
        },
      },
    };
  ` 
}