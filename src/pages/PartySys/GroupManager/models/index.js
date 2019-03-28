import {
  getList as partyGetList,
} from '@/services/party'
import {
  getList as infraGetList,
} from '@/services/infra';

export default {
  namespace: 'groupManager',

  state: {
    reportingTo: [],
  },

  effects: {
    *reportingTo({ payload }, { call, put }) {
      const groupList = yield call(partyGetList, 'partyGroup');
      const toPartyList = [payload]
      const next = (parentId) => {
        if(parentId === '') return;
        toPartyList.unshift(parentId)
        const node = groupList.filter(item => item.partyId === parentId)[0] || undefined
        if(node) next(node.parentId)
      }
      const group = groupList.filter(item => item.partyId === payload)[0] || undefined
      if(group) next(group.parentId)
      const emplPositionList = yield call(infraGetList, 'emplPosition');
      yield put({
        type: 'setReportingTo',
        payload: emplPositionList.filter(item => toPartyList.indexOf(item.partyId) > -1),
      });
    },
  },

  reducers: {
    setReportingTo(state, action) {
      return {
        ...state,
        reportingTo: action.payload,
      };
    },
  },
};
