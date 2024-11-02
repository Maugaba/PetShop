import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';
import { AuthContext } from '../../context/AuthContext';

export default function Account() {
  const { user, login, logout } = useContext(AuthContext);

  // Estados y funciones existentes para login y registro
  const [registrar, setRegistrar] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [activeTab, setActiveTab] = useState('nav-sign-in');

  useEffect(() => {
    const registerMessage = sessionStorage.getItem('registerMessage');
    if (registerMessage) {
      setMessage(registerMessage);
      sessionStorage.removeItem('registerMessage');

      setActiveTab('nav-sign-in');
    }
  }, []);

  // Funciones de manejo de cambios y envío de formularios (sin cambios)
  const translateError = (error) => {
    const translations = {
      'The password must be at least 8 characters.': 'La contraseña debe tener al menos 8 caracteres.',
    };
    return translations[error] || error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrar({
      ...registrar,
      [name]: value
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const translatedErrors = {};
          Object.keys(data.errors).forEach(key => {
            translatedErrors[key] = data.errors[key].map(error => translateError(error));
          });
          setFieldErrors(translatedErrors);
        }
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      // Llamar al método login del AuthContext
      login({
        id: data.id,
        email: data.email,
        role_id: data.role_id,
        name: data.name,
      }, data.token);

      setMessage('Inicio de sesión exitoso. ¡Bienvenido!');
      setLoginData({
        email: '',
        password: ''
      });

      // Puedes redirigir al usuario o actualizar la interfaz según prefieras
      // window.location.href = '/account'; // Si deseas mantener al usuario en la página de cuenta

    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setFieldErrors({});

    if (registrar.password !== registrar.password_confirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const { password_confirmation, ...dataToSend } = registrar;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/client/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          const translatedErrors = {};
          Object.keys(errorData.errors).forEach(key => {
            translatedErrors[key] = errorData.errors[key].map(error => translateError(error));
          });
          setFieldErrors(translatedErrors);
        }
        throw new Error(errorData.message || 'Error en el registro');
      }

      setMessage('Registro exitoso. ¡Bienvenido!');
      setRegistrar({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: ''
      });

      sessionStorage.setItem('registerMessage', 'Registro exitoso. ¡Bienvenido!');
      setActiveTab('nav-sign-in'); // Cambiar a la pestaña de inicio de sesión

    } catch (err) {
      setError(err.message);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMessage(null);
    setError(null);
    setFieldErrors({});
  };

  // Verificar si el usuario está autenticado
  if (user) {
    // Si el usuario está logueado, mostrar el mensaje de bienvenida y los botones
    return (
      <>
        <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
          <div className="container">
            <div className="hero-content py-5 my-3">
              <h2 className="display-1 mt-3 mb-0">Mi Cuenta</h2>
              <nav className="breadcrumb">
                <a className="breadcrumb-item nav-link" href="/">Home</a>
                <a className="breadcrumb-item nav-link" href="/">Pages</a>
                <span className="breadcrumb-item active" aria-current="page">Mi Cuenta</span>
              </nav>
            </div>
          </div>
        </section>

        <section className="account-section padding-large">
          <div className="container my-5 py-5">
            <div className="row">
              <div className="col-lg-12">
                <h2>Bienvenido, {user.name}</h2>
                <button onClick={logout} className="btn btn-danger mb-3">Cerrar Sesión</button>

                <div className="mt-4">
                  <button className="btn btn-primary mx-2">Mis Pedidos</button>
                  <button className="btn btn-secondary mx-2">Mis Compras</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else 
  {
        return (
            <>
            <section id="banner" className="py-3" style={{ background: '#F9F3EC' }}>
                <div className="container">
                <div className="hero-content py-5 my-3">
                    <h2 className="display-1 mt-3 mb-0">Account</h2>
                    <nav className="breadcrumb">
                    <a className="breadcrumb-item nav-link" href="/">Home</a>
                    <a className="breadcrumb-item nav-link" href="/">Pages</a>
                    <span className="breadcrumb-item active" aria-current="page">Account</span>
                    </nav>
                </div>
                </div>
            </section>

            <section className="login-tabs padding-large">
                <div className="container my-5 py-5">
                <div className="row">
                    <div className="tabs-listing">
                    <nav>
                        <div className="nav nav-tabs d-flex justify-content-center border-dark-subtle mb-3" id="nav-tab" role="tablist">
                        <button
                            className={`nav-link mx-3 fs-3 border-bottom border-dark-subtle border-0 text-uppercase ${activeTab === 'nav-sign-in' ? 'active' : ''}`}
                            id="nav-sign-in-tab" type="button"
                            role="tab" aria-controls="nav-sign-in" aria-selected={activeTab === 'nav-sign-in'}
                            onClick={() => handleTabChange('nav-sign-in')}
                        >Iniciar Sesión</button>
                        <button
                            className={`nav-link mx-3 fs-3 border-bottom border-dark-subtle border-0 text-uppercase ${activeTab === 'nav-register' ? 'active' : ''}`}
                            id="nav-register-tab" type="button"
                            role="tab" aria-controls="nav-register" aria-selected={activeTab === 'nav-register'}
                            onClick={() => handleTabChange('nav-register')}
                        >Registrarse</button>
                        </div>
                    </nav>

                    <div className="tab-content" id="nav-tabContent">
                        <div className={`tab-pane fade ${activeTab === 'nav-sign-in' ? 'active show' : ''}`} id="nav-sign-in" role="tabpanel" aria-labelledby="nav-sign-in-tab">
                        <div className="col-lg-8 offset-lg-2 mt-5">
                            {message && <div className="alert alert-success">{message}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <p className="mb-0">Inicia sesión con Google </p>
                            <hr className="my-1" />
                            <div className="row mt-4 mb-5">
                            <div className="d-grid col-md-6 my-2">
                                <a href="/" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                <div className="d-flex flex-wrap justify-content-center">
                                    <Icon icon="ion:logo-google" />
                                    <p className="mb-0"> Google</p>
                                </div>
                                </a>
                            </div>
                            </div>

                            <p className="mb-0">O con tu email</p>
                            <hr className="my-1" />

                            <form id="form1" className="form-group flex-wrap" onSubmit={handleLogin}>
                                <div className="form-input col-lg-12 my-4">
                                    <input
                                    type="text"
                                    id="loginEmail"
                                    name="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    className="form-control custom-input mb-3 p-4"
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}
                                    required
                                    />
                                    <input
                                    type="password"
                                    id="loginPassword"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="form-control custom-input mb-3 p-4"
                                    aria-describedby="passwordHelpBlock"
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}
                                    required
                                    />

                                    {fieldErrors.email && <div className="invalid-feedback d-block">{fieldErrors.email[0]}</div>}
                                    {fieldErrors.password && <div className="invalid-feedback d-block">{fieldErrors.password[0]}</div>}

                                    <div className="d-grid my-3">
                                    <button type="submit" className="btn btn-dark btn-lg rounded-1">Iniciar Sesión</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </div>

                        <div className={`tab-pane fade ${activeTab === 'nav-register' ? 'active show' : ''}`} id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab">
                        <div className="col-lg-8 offset-lg-2 mt-5">
                            <p className="mb-0">Regístrate con Google </p>
                            <hr className="my-1" />
                            <div className="row mt-4 mb-5">
                            <div className="d-grid col-md-6 my-2">
                                <a href="/" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                <div className="d-flex flex-wrap justify-content-center">
                                    <Icon icon="ion:logo-google" />
                                    <p className="mb-0"> Google</p>
                                </div>
                                </a>
                            </div>
                            </div>

                            <p className="mb-0">O con tu email</p>
                            <hr className="my-1" />

                            {activeTab === 'nav-register' && message && <div className="alert alert-success">{message}</div>}
                            {activeTab === 'nav-register' && error && <div className="alert alert-danger">{error}</div>}

                            <form id="form2" className="form-group flex-wrap" onSubmit={handleRegister}>
                            <div className="form-input col-lg-12 my-4">
                                <input
                                type="text"
                                name="name"
                                placeholder="Tu nombre"
                                value={registrar.name}
                                onChange={handleChange}
                                className={`form-control custom-input mb-3 p-4 ${fieldErrors.name ? 'is-invalid' : ''}`}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                                />
                                {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name[0]}</div>}

                                <input
                                type="text"
                                name="email"
                                placeholder="Tu dirección de correo electrónico"
                                value={registrar.email}
                                onChange={handleChange}
                                className={`form-control custom-input mb-3 p-4 ${fieldErrors.email ? 'is-invalid' : ''}`}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                                />
                                {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email[0]}</div>}

                                <input
                                type="text"
                                name="phone"
                                placeholder="Tu número de teléfono"
                                value={registrar.phone}
                                onChange={handleChange}
                                className={`form-control custom-input mb-3 p-4 ${fieldErrors.phone ? 'is-invalid' : ''}`}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                                />
                                {fieldErrors.phone && <div className="invalid-feedback">{fieldErrors.phone[0]}</div>}

                                <input
                                type="text"
                                name="address"
                                placeholder="Tu dirección"
                                value={registrar.address}
                                onChange={handleChange}
                                className={`form-control custom-input mb-3 p-4 ${fieldErrors.address ? 'is-invalid' : ''}`}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                                />
                                {fieldErrors.address && <div className="invalid-feedback">{fieldErrors.address[0]}</div>}

                                <input
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                value={registrar.password}
                                onChange={handleChange}
                                className={`form-control custom-input mb-3 p-4 ${fieldErrors.password ? 'is-invalid' : ''}`}
                                aria-describedby="passwordHelpBlock"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                                />
                                {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password[0]}</div>}

                                <input
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirma tu contraseña"
                                value={registrar.password_confirmation}
                                onChange={handleChange}
                                className={`form-control custom-input mb-3 p-4 ${fieldErrors.password_confirmation ? 'is-invalid' : ''}`}
                                aria-describedby="passwordHelpBlock"
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                                />
                                {fieldErrors.password_confirmation && <div className="invalid-feedback">{fieldErrors.password_confirmation[0]}</div>}

                                <div className="d-grid my-3">
                                <button type="submit" className="btn btn-dark btn-lg rounded-1">Registrarme</button>
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </>
        );

    }
}