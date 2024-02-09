import { Home } from '../pages/Home/Home';
import { NewRoom } from '../pages/NewRoom/NewRoom';
import { AuthContextProvider } from '../contexts/AuthContexts';
import { BrowserRouter, Routes as Swicht, Route, Navigate } from 'react-router-dom';

export function Routes() {
   
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Swicht>
                    <Route path="/home" Component={Home} />
                    <Route path="/new/room" Component={NewRoom} />
                    <Route path="*" Component={() => <Navigate to="/Home" />} />
                </Swicht>
            </AuthContextProvider>
        </BrowserRouter>
    );
}