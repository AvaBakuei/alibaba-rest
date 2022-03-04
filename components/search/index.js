import {useRef} from "react";
import PropTypes from "prop-types";
import styles from './Search.module.css'

function Search({searchInput}){
    const searchInputRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();

        const searchData = searchInputRef.current.value;
        searchInput(searchData)
    }
    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <input className={styles.input} type="text" id="search" ref={searchInputRef} placeholder="Search..."/>
            <button className={styles.button} onSubmit={submitHandler}>
                Search
            </button>
        </form>
    )
}

Search.prototype = {
    searchInput: PropTypes.string,
}

export default Search;
