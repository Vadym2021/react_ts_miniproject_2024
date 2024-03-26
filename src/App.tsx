import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header, SingleMovie} from './components';
import {LayoutPage, MoviesPage} from './page';




const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={'/'} element={<LayoutPage/>}>
                    <Route path={'/'} element={<MoviesPage/>}>
                        <Route path={'/:id'} element={<SingleMovie/>}>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>

    );

};

export default App;


