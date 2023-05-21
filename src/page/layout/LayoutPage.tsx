import React from 'react';
import {Outlet} from "react-router-dom";

import { GenresPage } from '../genres/GenresPage';
import css from "./Layout.module.css"

const LayoutPage = () => {
    return (

        <div className={css.layout}>
            <GenresPage/>
            <div>
                <Outlet/>
            </div>
        </div>

    );
};

export {LayoutPage};