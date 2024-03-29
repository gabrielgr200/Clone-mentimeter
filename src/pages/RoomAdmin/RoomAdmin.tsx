import '../../styles/modal.scss';
import '../../styles/room.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UseRoom } from '../../hooks/UseRoom';
import close from '../../assets/images/close.svg';
import check from '../../assets/images/check.svg';
import answer from '../../assets/images/answer.svg';
import { database } from '../../services/firebase';
import deleted from '../../assets/images/delete.svg';
import logo from '../../assets/images/mentimeter.svg';
import { Button } from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import trashOpen from '../../assets/images/trash-open.svg';
import trashClose from '../../assets/images/trash-close.svg';
import { RoomCode } from '../../components/RoomCode/RoomCode';
import { Question } from '../../components/Question/Question';
import { slideInFromLeft, slideInFromTop } from '../../utils/motion';

type RoomParams = {
    id: string;
}

export function RoomAdmin() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = UseRoom(roomId);
    const navigate = useNavigate();
    const [openIsModal, setOpenIsModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    async function handleDeleteQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }

    function handleOpenModal() {
        setOpenIsModal(true);
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        navigate('/home');
    }

    function handleCloseModal() {
        setOpenIsModal(false);
    }

    async function handleCkeckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }


    return (
        <motion.div initial='hidden' animate='visible' id="page-room">
            <header>
                <div className="content">
                    <motion.img variants={slideInFromLeft(0.5)} src={logo} width={160} height={90} alt="logo do site" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleOpenModal} isOutlined>Encerrar</Button>
                    </div>
                </div>
            </header>

            {openIsModal && (
                <motion.div initial='hidden' animate='visible' className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <motion.button variants={slideInFromLeft(0.5)} className="close-button" onClick={handleCloseModal}>
                                <img src={close} alt="botão de fechar modal" />
                            </motion.button>
                        </div>
                        <div className="modal-content">
                            <motion.img
                                variants={slideInFromLeft(0.8)}
                                src={isHovered ? trashOpen : trashClose}
                                alt="botão de fechar modal"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                            <motion.h2 variants={slideInFromLeft(1.1)}>Tem certeza que deseja encerrar a sala?</motion.h2>
                            <div className="modal-footer">
                                <motion.button variants={slideInFromLeft(1.5)} className="button-delete" onClick={handleEndRoom}>Encerrar</motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <main>
                <motion.div variants={slideInFromTop} className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </motion.div>


                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                {!question.isAnswered && (
                                    <>
                                        <button type='button' onClick={() => handleCkeckQuestionAsAnswered(question.id)}>
                                            <img src={check} alt="marcar a pergunta" />
                                        </button>

                                        <button type='button' onClick={() => handleHighLightQuestion(question.id)}>
                                            <img src={answer} alt="dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}

                                <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleted} alt="remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </motion.div>
    );
}