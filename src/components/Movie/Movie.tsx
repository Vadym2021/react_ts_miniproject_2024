import React, {FC, useRef, useState} from 'react';
import {useAppDispatch} from "../../hooks";
import {IMovie} from "../../interfaces";

interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {


    const {id,title,genre_ids } = movie;
    const dispatch = useAppDispatch();


    return (
        <div>

            <div>id:{id}</div>
            <div>brand:{title}</div>
            <div>year:{genre_ids}</div>

        </div>
    );
};

export {Movie};