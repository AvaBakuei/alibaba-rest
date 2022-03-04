import {
    RESULT_LIST_ACTION,
    RESULT_LIST_SUCCESS,
    RESULT_LIST_FAIL,
} from "./constanst";

const initialState = {
    result: [],
    error:"",
    loading: false,
}

const resultListReducer = (state= initialState, action) => {
    switch (action?.type){
        case RESULT_LIST_ACTION:
            return {
                ...state,
                loading: true,
            }
        case RESULT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action?.result,
                error: "",
            }
        case RESULT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                result: [],
                error: action?.error,
            }
        default:
            return state;
    }
}

export default resultListReducer;