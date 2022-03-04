import PropTypes from 'prop-types';
import styles from './Result.module.css';
import moment from "moment";

function ResultItem({result}){
    const startTime = moment(result?.leaveDateTime).format('HH:mm');
    const endTime = moment(result?.arrivalDateTime).format('HH:mm');
    const timeStart = moment(result?.leaveDateTime).format("X");
    const timeEnd = moment(result?.arrivalDateTime).format("X");
    const hours = parseInt(Math.abs(timeEnd - timeStart) / (60 * 60) % 24);
    const minutes = parseInt(Math.abs(timeEnd - timeStart) / (60) % 60);

    return(
        <li className={styles.card}>
            <div className={styles.date}>
                <div>
                    {startTime} - {endTime}
                </div>
                <div>
                    {hours && `${hours} h`} {minutes && `${minutes} m`}
                </div>
            </div>
            <div className={styles.destination}>
                <div>
                    {result?.airlineName}
                </div>
                <div>
                    {result?.origin} - {result?.destination}
                </div>
            </div>
        </li>
    )

}

ResultItem.proptypes = {
    result: PropTypes.object,
}

export default ResultItem;
