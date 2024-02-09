import '../../styles/auth.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/mentimeter.svg';
import { Button } from '../../components/Button/Button';
import illustration from '../../assets/images/illustration.svg';

export function NewRoom() {

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustration} alt="image de ilustração" />
                <strong>Crie salas de Q&amp;A, ao-vivo </strong>
                <p>Tire suas dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={Logo} width={300} height={100} alt="Logo do projeto" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            required
                            placeholder='Nome da sala'
                        />

                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?<Link to="/home">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}