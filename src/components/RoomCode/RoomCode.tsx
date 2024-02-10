import '../../styles/roomCode.scss';
import { motion } from 'framer-motion';
import copyImg from '../../assets/images/copy.svg';
import { slideInFromRight } from '../../utils/motion';

type RoomCodeProps = {
    code?: string;
}

export function RoomCode (props: RoomCodeProps) {
    function copyRoomCodetoClipboard() {
        if (props.code) {
            navigator.clipboard.writeText(props.code);
        }
    }
    return (
        <motion.button initial='hidden' animate='visible' className="room-code" onClick={copyRoomCodetoClipboard}>
            <motion.div variants={slideInFromRight(0.5)} >
                <img src={copyImg} width={20} height={40} alt="Copy room code" />
            </motion.div>

            <motion.span variants={slideInFromRight(0.8)} >Sala #{props.code}</motion.span>
        </motion.button>
    );
}