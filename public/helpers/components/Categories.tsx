
import { Link } from 'react-router-dom';

export default function Categories() {
    return (
        <>
            <main className="container-xl mt-5">
                <h2 className="text-center">Selecciona una Categoría</h2>
                <hr />

                <div className="row mt-5 container-boxes">
                    {/* Box 1 */}
                    <div className="col-md-4">
                        <Link to="/unLitro" className="box-link">
                            <div className="box box-red text-center rounded border p-4">
                                <h3 className='custom-box1'>Por litro</h3>
                                <p></p>
                                <button className="btn btn-primary" style={{ color: 'white' }}>
                                    Ver Productos
                                </button>
                            </div>
                        </Link>
                    </div>

                    {/* Box 2 */}
                    <div className="col-md-4">
                        <Link to="/dosLitros" className="box-link">
                            <div className="box box-green text-center rounded border p-4">
                                <h3 className="custom-box2">Por 2 litros</h3>
                                <p></p>
                                <button className="btn btn-primary" style={{ color: 'white' }}>
                                    Ver Productos
                                </button>
                            </div>
                        </Link>
                    </div>

                    {/* Box 3 */}
                    <div className="col-md-4">
                        <Link to="/cincoLitros" className="box-link">
                            <div className="box box-blue text-center rounded border p-4">
                                <h3 className='custom-box3'>Por 5 litros</h3>
                                <p>Costo envase $1900 o puede devolverlo limpio y con tapa</p>
                                <button className="btn btn-primary" style={{ color: 'white' }}>
                                    Ver Productos
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
