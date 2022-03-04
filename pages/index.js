import {connect} from "react-redux";
import {useState} from "react";
import moment from 'moment';
import Sugar from "sugar-date";
import {resultListAction} from "../components/result/actions";
import Search from "../components/search";
import ResultList from "../components/result/ResultList";
import styles from '../styles/Home.module.css';

function Home({resultListFunction, result, loading}){
    const [showError, setShowError] = useState(false)
    const searchResultHandler = (value) => {
        setShowError(true);
        const valueLength = value?.split(' ').length
        if(valueLength >= 6){
            setShowError(false);

            // Convert phrase to regex
            const tripRegex = /^\w+/g;
            const fromRegex = /\s(from)\s[A-Z]{3}/g;
            const toRegex = /\s(to)\s[A-Z]{3}/g;
            const timeRegex = /on.*|\s*([\S]+)$/g;

            const trip = [...value?.matchAll(tripRegex)][0];
            const tripType = trip[0];
            const fromDate = [...value?.matchAll(fromRegex)][0];
            const origin = fromDate[0]?.replace("from", "").trim();
            const toDate = [...value?.matchAll(toRegex)][0];
            const destination = toDate[0]?.replace("to", "").trim();
            const time = [...value?.matchAll(timeRegex)][0];
            const timeDate = Sugar.Date.create(time[0]?.replace("on", ""));
            const departureDate = moment(timeDate).format('YYYY-MM-DD');
            const today = new Date();
            const todayDate = moment(today).format('YYYY-MM-DD');

            let resultObject = {
                origin: origin,
                destination: destination,
                departureDate: departureDate !== "Invalid date" ? departureDate : todayDate,
            }
            resultListFunction(resultObject);
        }
    }

  return(
      <div className={styles.container}>
        <Search searchInput={searchResultHandler} />
          {showError ? <div className={styles.message}>Please insert complete phrase.</div> :
              loading ? <div className={styles.loading}>Loading...</div> : <ResultList data={result}/>
          }
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
        result: state?.resultListReducer.result,
        loading: state?.resultListReducer.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resultListFunction: resultObject => {
            dispatch(
                resultListAction(resultObject),
            );
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
