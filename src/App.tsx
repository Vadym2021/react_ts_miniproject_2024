import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HeaderPage, LayoutPage, MoviesPage} from './page';
import {SingleMovie} from './components';


const App = () => {
    return (
        <div>
            <HeaderPage/>
            <Routes>
                {/*<Route path={'/'} element={<LayoutPage/>}>*/}
                    <Route path={'/'} element={<MoviesPage/>}>
                        <Route path={'/:id'} element={<SingleMovie/>}>
                        </Route>
                    {/*</Route>*/}
                </Route>
            </Routes>
        </div>

    );

};

export default App;


