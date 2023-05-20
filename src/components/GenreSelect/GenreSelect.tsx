import React, {FC} from 'react';
import css from "../GenreSelect/GenreSelect.module.css";
import {IGenre} from "../../interfaces";
import {useDispatch} from "react-redux";

import {checkBoxChange} from "../../redux";


interface IProps {
    genre: IGenre
}

const GenreSelect: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    const dispatch = useDispatch();


    return (
        <div className={css.genre}>
            <div>{name}</div>
            <input type="checkbox" checked={Boolean(genre.status)} onChange={() => dispatch(checkBoxChange({id}))}/>
        </div>
    );
};

export {GenreSelect};