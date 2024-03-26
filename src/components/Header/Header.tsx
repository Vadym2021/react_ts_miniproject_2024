import React from 'react';

import {Daynight} from '../index';
import css from "./Header.module.css"
import {useAppSelector} from "../../hooks";


const Header = () => {

    const {theme} = useAppSelector(state => state.genreReducer);

    return (
        <div className={`${css.theme} ${theme === 'night' ? css.night : css.day}`}>
            <div className={css.header}>
                <div className={css.mworld}>MOVIE WORLD</div>
                <div className={css.user}>
                    <div className={css.userlogo}></div>
                    <div className={css.username}> Lenne Gregham</div>
                </div>
                <div><Daynight/></div>
            </div>
        </div>
    );
};

export {Header};