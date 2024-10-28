import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Iniciar sesion con: ', {email, password});
    };

    return(
        <div className=" flex items-center justify-center min-h-5">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>
                            Email:
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
                            Contraseña:
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-noe focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <button type='submit' className='w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        Iniciar Sesión
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">¿No tienes una cuenta?</p>
                        <Link to="/register">
                            <button
                                className="mt-2 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Registrarse
                            </button>
                        </Link>
                    </div>


                </form>

            </div>

        </div>

    )
};

export default Login;