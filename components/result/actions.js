import {
    RESULT_LIST_ACTION,
    RESULT_LIST_SUCCESS,
    RESULT_LIST_FAIL,
} from "./constanst";

export const resultListAction = (result) => {
    return {
        type: RESULT_LIST_ACTION,
        result,
    }
}
export const resultListSuccess = (result) => {
    return {
        type: RESULT_LIST_SUCCESS,
        result,
    }
}
export const resultListFail = (error) => {
    return {
        type: RESULT_LIST_FAIL,
        error,
    }
}