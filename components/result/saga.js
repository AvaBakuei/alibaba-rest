import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {RESULT_LIST_ACTION} from "../result/constanst";
import {resultListSuccess, resultListFail} from "./actions";

function getRequestId(result) {
    return axios({
        method: "POST",
        url: "https://ws.alibaba.ir/api/v1/flights/domestic/available",
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        data: JSON.stringify({
            adult: 1,
            child: 0,
            infant: 0,
            type: 'oneWay',
            origin: result?.origin,
            destination: result?.destination,
            departureDate: result?.departureDate,
        })
    })
}

function fetchResult(id) {
    return axios({
        method: "GET",
        url: `https://ws.alibaba.ir/api/v1/flights/domestic/available/${id}`,
        headers: {
            'accept': 'application/json, text/plain, */*',
        },
    })
}

function* workerSaga({result}) {
    try{
        const response = yield call(getRequestId, result);
        let requestId = response?.data?.result?.requestId;
        if(response?.data?.success === true && requestId !== undefined){
            const response = yield call(fetchResult, requestId);
            yield put(resultListSuccess(response?.data?.result?.departing))
        } else{
            yield put(resultListFail(response?.data?.error))
        }
    } catch (error){
        yield put(resultListFail(error))
    }
}

export function* watcherResultListSaga() {
    yield takeLatest(RESULT_LIST_ACTION, workerSaga);
}