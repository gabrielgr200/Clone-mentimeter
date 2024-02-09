import '../../styles/auth.scss';
import { useAuth } from '../../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/mentimeter.svg';
import { Button } from '../../components/Button/Button';
import googleIcon from '../../assets/images/google-icon.svg';
import illustration from '../../assets/images/illustration.svg';

export function Home() {
    const navigate = useNavigate();
    const { user, SignInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await SignInWithGoogle();
        }

        navigate('/new/room');
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustration} alt="image de ilustração" />
                <strong>Seja Bem-vindo ao Mentimeter</strong>
                <p>Aqui você pode criar salas de Q&amp;A, ao-vivo </p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={Logo} width={300} height={100} alt="Logo do projeto" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIcon} alt="imagem do icone da google" />
                        Crie sua sala com Google
                    </button>
                    <div className='separator'>ou entre na sala</div>
                    <form>
                        <input
                            type="text"
                            required
                            placeholder='Digite o codigo da sala'
                        />

                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}