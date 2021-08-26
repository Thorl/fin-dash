import * as styles from './index.module.css';

export const SearchResult = (props) => {
    return (
        <div className={styles.searchResult}>
            <div>
                <h3>{props.name}</h3>
                <h5>{props.symbol}</h5>
            </div>
            <button
                className={styles.button}
                onClick={props.onClick}
            >
                Select
            </button>
        </div>
    );
};
