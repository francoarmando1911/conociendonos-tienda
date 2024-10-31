import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isCondimentos = location.pathname === '/condimentos';

    return (
        <div className="row justify-content-center mt-3">
            <div className="col-md-6 text-center"
                style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                    borderRadius: '50px',
                    maxWidth: '400px'
                }}>
                <Link to="/"
                    className={`btn rounded-pill d-block d-md-inline-block mb-2 mb-md-0 btn-hover ${!isCondimentos ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1.2em',
                        marginRight: '5px',
                        color: !isCondimentos ? 'red' : 'white'
                    }}>
                    Limpieza
                </Link>
                <Link to="/condimentos"
                    className={`btn rounded-pill d-block d-md-inline-block mb-2 mb-md-0 btn-hover ${isCondimentos ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1.2em',
                        marginLeft: 'auto',
                        color: isCondimentos ? 'white' : 'red'
                    }}>
                    Condimentos
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
