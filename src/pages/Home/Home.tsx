import '../../styles/auth.scss';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../../services/firebase';
import Logo from '../../assets/images/mentimeter.svg';
import { Button } from '../../components/Button/Button';
import googleIcon from '../../assets/images/google-icon.svg';
import illustration from '../../assets/images/illustration.svg';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../../utils/motion';

export function Home() {
    const navigate = useNavigate();
    const { user, SignInWithGoogle } = useAuth();
    const [roomCod, setRoomCod] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await SignInWithGoogle();
        }

        navigate('/new/room');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCod.trim() == '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCod}`).get();

        if (!roomRef.exists()) {
            toast.error("A sala não existe");
            return;
        }

        if (roomRef.val().endedAt) {
            toast.error("Esta sala já está fechada.");
            return;
        }

        navigate(`/new/${roomCod}`);
    }

    return (
        <motion.div initial='hidden' animate='visible' id='page-auth'>
            <aside>
                <motion.img variants={slideInFromLeft(0.5)} src={illustration} alt="image de ilustração" />
                <motion.strong variants={slideInFromLeft(0.8)}>Seja Bem-vindo ao Mentimeter</motion.strong>
                <motion.p variants={slideInFromLeft(1.1)}>Aqui você pode criar salas de Q&amp;A, ao-vivo </motion.p>
            </aside>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <main>
                <div className='main-content'>
                    <motion.img variants={slideInFromTop} src={Logo} width={300} height={100} alt="Logo do projeto" />
                    <motion.button variants={slideInFromRight(0.5)} onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIcon} alt="imagem do icone da google" />
                        Crie sua sala com Google
                    </motion.button>
                    <motion.div variants={slideInFromRight(0.8)} className='separator'>ou entre na sala</motion.div>
                    <form onSubmit={handleJoinRoom}>
                        <motion.input
                            type="text"
                            value={roomCod}
                            required
                            variants={slideInFromRight(1.1)}
                            onChange={event => setRoomCod(event.target.value)}
                            placeholder='Digite o codigo da sala'
                        />

                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </motion.div>
    );
}