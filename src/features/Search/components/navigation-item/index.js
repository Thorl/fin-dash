import cx from 'classnames';

import * as styles from './index.module.css';

export const NavigationItem = (props) => {
    return (
        <h4
            className={cx(styles.navigationItem, {
                [styles.active]: props.active,
            })}
            onClick={props.onClick}
        >
            {props.text}
        </h4>
    );
}
