import React from 'react';
import { Daynight } from '../../components';
import css from "./HeaderPage.module.css"

const HeaderPage = () => {
    return (
        <div className={css.header}>
            <div className={css.mworld}>MOVIE WORLD</div>
            <div className={css.user}>
                <div className={css.userlogo}></div>
                <div className={css.username}> Lenne Gregham</div>
            </div>
            <div><Daynight/></div>
        </div>
    );
};

export {HeaderPage};