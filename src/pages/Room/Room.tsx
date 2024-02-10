import '../../styles/room.scss';
import { motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuth';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../../services/firebase';
import logo from '../../assets/images/mentimeter.svg';
import { Button } from '../../components/Button/Button';
import { RoomCode } from '../../components/RoomCode/RoomCode';
import { slideInFromLeft, slideInFromTop } from '../../utils/motion';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Questions = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');
    const roomId = params.id;

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            toast.error("You must be logged in");
            return;
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        try {
            await database.ref(`rooms/${roomId}/questions`).push(question);
            toast.success('Sua pergunta foi enviada');
            setNewQuestion('');
        } catch (error) {
            console.error("Error sending question:", error);
            toast.error("Error sending question");
        }
    }


    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('child_added', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted
                }
            })
            
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);


    return (
        <motion.div initial='hidden' animate='visible' id="page-room">
            <header>
                <div className="content">
                    <motion.img variants={slideInFromLeft(0.5)} src={logo} width={160} height={90} alt="logo do site" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <main>
                <motion.div variants={slideInFromTop} className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </motion.div>

                <form onSubmit={handleSendQuestion}>
                    <motion.textarea
                        value={newQuestion}
                        variants={slideInFromLeft(0.8)}
                        placeholder='Escreva a sua pergunta!!'
                        onChange={event => setNewQuestion(event.target.value)}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className='user-info'>
                                <motion.img variants={slideInFromLeft(1.1)} src={user.avatar} alt={user.name} />
                                <motion.span variants={slideInFromLeft(1.4)}>{user.name}</motion.span>
                            </div>
                        ) : (
                            <motion.span variants={slideInFromLeft(1.1)}>Para enviar uma pergunta, <button>faça o seu login</button></motion.span>
                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </motion.div>
    );
}