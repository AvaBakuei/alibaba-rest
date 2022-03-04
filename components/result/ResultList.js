import PropTypes from "prop-types";

import styles from './Result.module.css';
import ResultItem from "./ResultItem";

function ResultList({data}){
    return(
        <ul className={styles.result}>
            {data?.map((item, index)=>(
                <ResultItem key={index} result={item}/>
            ))}
        </ul>
    )
}

ResultList.prototype = {
    data: PropTypes.array,
}

export default ResultList;
