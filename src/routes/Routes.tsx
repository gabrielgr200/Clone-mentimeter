import { Home } from '../pages/Home/Home';
import { Room } from '../pages/Room/Room';
import { NewRoom } from '../pages/NewRoom/NewRoom';
import { AuthContextProvider } from '../contexts/AuthContexts';
import { BrowserRouter, Routes as Swicht, Route, Navigate } from 'react-router-dom';
import { RoomAdmin } from '../pages/RoomAdmin/RoomAdmin';

export function Routes() {
   
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Swicht>
                    <Route path="/home" Component={Home} />
                    <Route path="/new/room" Component={NewRoom} />
                    <Route path="/new/:id" Component={Room} />
                    <Route path="/admin/new/:id" Component={RoomAdmin} />
                    <Route path="*" Component={() => <Navigate to="/Home" />} />
                </Swicht>
            </AuthContextProvider>
        </BrowserRouter>
    );
}