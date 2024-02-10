import { ReactNode } from 'react';
import '../../styles/question.scss';
import { motion } from 'framer-motion';
import { slideInFromLeft } from '../../utils/motion';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
}

export function Question({ content, author, children }: QuestionProps) {
    return (
        <motion.div initial='hidden' animate='visible' variants={slideInFromLeft(1.7)} className="question">
            <motion.p variants={slideInFromLeft(2.0)}>{content}</motion.p>
            <footer>
                <motion.div variants={slideInFromLeft(2.4)}  className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </motion.div>
                <div>{children}</div>
            </footer>
        </motion.div>
    );
}