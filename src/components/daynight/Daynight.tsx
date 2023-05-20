import React from 'react';

import css from "./Daynight.module.css"

const Daynight = () => {
    return (
        <div className={css.head}>
            <label>
                <input className={css.hide} type="checkbox"/>
                <span className={css.check}></span>
            </label>

        </div>
    );
};

export {Daynight};