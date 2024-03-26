import React from 'react';
import css from "./Daynight.module.css"
import {genreActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

const Daynight = () => {
    const theme = useAppSelector(state => state.genreReducer.theme);
    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(genreActions.themeSelector());
    };

    return (
        <div className={css.head}>
            <label>
                <input className={css.hide} type="checkbox" onChange={handleToggle} checked={theme === 'night'}/>
                <span className={css.check}></span>
            </label>
        </div>
    );
};

export {Daynight};