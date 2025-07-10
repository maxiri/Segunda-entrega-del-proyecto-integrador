import React, { useState } from 'react';

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
      // Aquí podrías enviar a una API real
      console.log('Mensaje enviado:', form);
      setEnviado(true);
      setForm(initialForm);
      setTimeout(() => setEnviado(false), 3000);
    }
  };

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span style={{ color: 'red' }}>{errors.nombre}</span>}
        </label>

        <label>
          Email:
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </label>

        <label>
          Mensaje:
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
          />
          {errors.mensaje && <span style={{ color: 'red' }}>{errors.mensaje}</span>}
        </label>

        <button type="submit">Enviar</button>
      </form>

      {enviado && <p style={{ color: 'green' }}>Mensaje enviado con éxito ✅</p>}
    </div>
  );
};

export default Contacto;
