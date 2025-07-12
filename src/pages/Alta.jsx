import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import '../scss/pages/_alta.scss'; 
const initialForm = {
  id: '',
  nombre: '',
  precio: '',
  stock: '',
  marca: '',
  categoria: '',
  descripcionCorta: '',
  descripcionLarga: '',
  envioGratis: false,
  edadDesde: '',
  edadHasta: '',
  foto: ''
};

const Alta = () => {
  const { products, setProducts, deleteProduct, updateProduct } = useContext(ProductContext);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const validateField = (name, value) => {
    switch(name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio';
        break;
      case 'precio':
        if (!value || isNaN(value) || Number(value) <= 0) return 'Precio debe ser un número positivo';
        break;
      case 'stock':
        if (!value || isNaN(value) || Number(value) < 0) return 'Stock debe ser 0 o más';
        break;
      case 'marca':
        if (!value.trim()) return 'Marca es obligatoria';
        break;
      case 'categoria':
        if (!value.trim()) return 'Categoría es obligatoria';
        break;
      case 'edadDesde':
        if (value && (isNaN(value) || Number(value) < 0)) return 'Edad desde debe ser 0 o más';
        break;
      case 'edadHasta':
        if (value && (isNaN(value) || Number(value) < 0)) return 'Edad hasta debe ser 0 o más';
        else if (form.edadDesde && Number(value) < Number(form.edadDesde)) return 'Edad hasta debe ser mayor o igual a edad desde';
        break;
      case 'foto':
        if (value && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/.test(value)) return 'Debe ser URL válida de imagen';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const error = validateField(name, val);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(form).forEach(([key, val]) => {
      const error = validateField(key, val);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const productData = {
        nombre: form.nombre,
        precio: Number(form.precio),
        stock: Number(form.stock),
        marca: form.marca,
        categoria: form.categoria,
        descripcionCorta: form.descripcionCorta,
        descripcionLarga: form.descripcionLarga,
        envioGratis: form.envioGratis,
        edadDesde: form.edadDesde ? Number(form.edadDesde) : null,
        edadHasta: form.edadHasta ? Number(form.edadHasta) : null,
        foto: form.foto
      };

      try {
        if (isEditing) {
          const res = await fetch(`https://686ee02191e85fac429f37e2.mockapi.io/Productos/${form.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
          });
          if (!res.ok) throw new Error('Error al actualizar producto');
          const updatedProduct = await res.json();
          updateProduct(updatedProduct);
          alert('Producto actualizado con éxito');
        } else {
          const res = await fetch('https://686ee02191e85fac429f37e2.mockapi.io/Productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
          });
          if (!res.ok) throw new Error('Error al guardar producto');
          const savedProduct = await res.json();
          setProducts([...products, savedProduct]);
          alert('Producto agregado con éxito');
        }

        setForm(initialForm);
        setErrors({});
        setIsEditing(false);
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div className="alta-container">
      <h1>{isEditing ? 'Editar Producto' : 'Alta de Producto'}</h1>

      <form onSubmit={handleSubmit} noValidate className="alta-form">
        {[
          { label: 'Nombre', name: 'nombre' },
          { label: 'Precio', name: 'precio', type: 'number' },
          { label: 'Stock', name: 'stock', type: 'number' },
          { label: 'Marca', name: 'marca' },
          { label: 'Categoría', name: 'categoria' },
          { label: 'Descripción corta', name: 'descripcionCorta' },
          { label: 'Descripción larga', name: 'descripcionLarga', isTextArea: true },
          { label: 'Edad desde', name: 'edadDesde', type: 'number' },
          { label: 'Edad hasta', name: 'edadHasta', type: 'number' },
          { label: 'Foto (URL)', name: 'foto' },
        ].map(({ label, name, type = 'text', isTextArea }) => (
          <label key={name}>
            {label}:
            {isTextArea ? (
              <textarea name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} />
            ) : (
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
            {errors[name] && <span className="error">{errors[name]}</span>}
          </label>
        ))}

        <label>
          Envío gratis:
          <input
            name="envioGratis"
            type="checkbox"
            checked={form.envioGratis}
            onChange={handleChange}
          />
        </label>

        <button type="submit">{isEditing ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>

      <h2>Productos actuales</h2>
      <ul className="product-list">
        {products.map(prod => (
          <li key={prod.id}>
            <strong>{prod.nombre}</strong> - ${prod.precio}
            <button onClick={() => handleEdit(prod)}>Editar</button>
            <button onClick={() => deleteProduct(prod.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alta;
