import React from 'react';

import styles from './Loading.scss';

const Loading = () => {
    return (
        <div className={styles.ring}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default Loading