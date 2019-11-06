import {
    CHANGE_CHARTBOOLEAN,
	CHANGE_Lang,
  // ROWS
} from './types';

export default {
  [CHANGE_CHARTBOOLEAN](state, chartBoolean){
    state.chartBoolean = chartBoolean
  },
    [CHANGE_Lang](state, langFlag){
      state.langFlag = langFlag
    }
}
