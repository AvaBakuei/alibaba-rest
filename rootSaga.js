import { all } from "redux-saga/effects";
import {watcherResultListSaga} from "./components/result/saga";

export default function* rootSaga(){
    yield all([watcherResultListSaga()]);
}