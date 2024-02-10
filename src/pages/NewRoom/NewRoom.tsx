import '../../styles/auth.scss';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';
import message from '../../assets/images/message.svg';
import Logo from '../../assets/images/mentimeter.svg';
import { Button } from '../../components/Button/Button';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../../utils/motion';
import { useAuth } from '../../hooks/UseAuth';

export function NewRoom() {
    const [newRoom, setNewRoom] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() == '') {
            return;
        }


        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/admin/new/${firebaseRoom.key}`);
    }


    return (
        <motion.div initial='hidden' animate='visible' id='page-auth'>
            <aside>
                <motion.img variants={slideInFromLeft(0.5)} src={message} alt="image de ilustração" />
                <motion.strong variants={slideInFromLeft(0.8)}>Crie salas de Q&amp;A, ao-vivo </motion.strong>
                <motion.p variants={slideInFromLeft(1.1)}>Tire suas dúvidas da sua audiência em tempo real</motion.p>
            </aside>

            <main>
                <div className='main-content'>
                    <motion.img variants={slideInFromTop} src={Logo} width={300} height={100} alt="Logo do projeto" />
                    <motion.h2 variants={slideInFromRight(0.5)}>Criar uma nova sala</motion.h2>
                    <form onSubmit={handleCreateRoom}>
                        <motion.input
                            type="text"
                            required
                            variants={slideInFromRight(0.8)}
                            placeholder='Nome da sala'
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                        />

                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <motion.p variants={slideInFromRight(1.1)}>
                        Quer entrar em uma sala existente?<Link to="/home">clique aqui</Link>
                    </motion.p>
                </div>
            </main>
        </motion.div>
    );
}