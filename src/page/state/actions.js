import {
    CHANGE_CHARTBOOLEAN,
	CHANGE_Lang
} from './types'

export default {
    change_chartBoolean ({commit}, boolean) {
        commit(CHANGE_CHARTBOOLEAN, boolean)
    },
	change_lang({commit}, boolean){
		commit(CHANGE_Lang, boolean)
    }
}
