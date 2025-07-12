import React, { useState } from 'react';
import '../scss/pages/_contacto.scss';

const initialForm = {
  nombre: '',
  email: '',
  mensaje: ''
};

const Contacto = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.mensaje.trim()) newErrors.mensaje = 'El mensaje es obligatorio';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Mensaje enviado:', form);
      setEnviado(true);
      setForm(initialForm);
      setTimeout(() => setEnviado(false), 3000);
    }
  };

  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </label>

        <label>
          Email:
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </label>

        <label>
          Mensaje:
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            className={errors.mensaje ? 'error' : ''}
          />
          {errors.mensaje && <span className="error-text">{errors.mensaje}</span>}
        </label>

        <button type="submit">Enviar</button>
      </form>

      {enviado && <p className="success-message">Mensaje enviado con éxito ✅</p>}
    </div>
  );
};

export default Contacto;
