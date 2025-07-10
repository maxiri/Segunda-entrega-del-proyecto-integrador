import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

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
  const {
    products,
    setProducts,
    deleteProduct,
    updateProduct
  } = useContext(ProductContext);

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

    // Validar todos los campos
    const newErrors = {};
    Object.entries(form).forEach(([key, val]) => {
      const error = validateField(key, val);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Construir objeto para enviar al backend
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
          // Actualizar producto existente
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
          // Crear nuevo producto
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
    <div>
      <h1>{isEditing ? 'Editar Producto' : 'Alta de Producto'}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input name="nombre" value={form.nombre} onChange={handleChange} onBlur={handleBlur} />
          {errors.nombre && <span style={{color:'red'}}>{errors.nombre}</span>}
        </label>

        <label>
          Precio:
          <input name="precio" type="number" value={form.precio} onChange={handleChange} onBlur={handleBlur} />
          {errors.precio && <span style={{color:'red'}}>{errors.precio}</span>}
        </label>

        <label>
          Stock:
          <input name="stock" type="number" value={form.stock} onChange={handleChange} onBlur={handleBlur} />
          {errors.stock && <span style={{color:'red'}}>{errors.stock}</span>}
        </label>

        <label>
          Marca:
          <input name="marca" value={form.marca} onChange={handleChange} onBlur={handleBlur} />
          {errors.marca && <span style={{color:'red'}}>{errors.marca}</span>}
        </label>

        <label>
          Categoría:
          <input name="categoria" value={form.categoria} onChange={handleChange} onBlur={handleBlur} />
          {errors.categoria && <span style={{color:'red'}}>{errors.categoria}</span>}
        </label>

        <label>
          Descripción corta:
          <input name="descripcionCorta" value={form.descripcionCorta} onChange={handleChange} />
        </label>

        <label>
          Descripción larga:
          <textarea name="descripcionLarga" value={form.descripcionLarga} onChange={handleChange} />
        </label>

        <label>
          Envío gratis:
          <input name="envioGratis" type="checkbox" checked={form.envioGratis} onChange={handleChange} />
        </label>

        <label>
          Edad desde:
          <input name="edadDesde" type="number" value={form.edadDesde} onChange={handleChange} onBlur={handleBlur} />
          {errors.edadDesde && <span style={{color:'red'}}>{errors.edadDesde}</span>}
        </label>

        <label>
          Edad hasta:
          <input name="edadHasta" type="number" value={form.edadHasta} onChange={handleChange} onBlur={handleBlur} />
          {errors.edadHasta && <span style={{color:'red'}}>{errors.edadHasta}</span>}
        </label>

        <label>
          Foto (URL):
          <input name="foto" value={form.foto} onChange={handleChange} onBlur={handleBlur} />
          {errors.foto && <span style={{color:'red'}}>{errors.foto}</span>}
        </label>

        <button type="submit">{isEditing ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>

      <h2>Productos actuales</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            <strong>{prod.nombre}</strong> - ${prod.precio} &nbsp;
            <button onClick={() => handleEdit(prod)}>Editar</button> &nbsp;
            <button onClick={() => deleteProduct(prod.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alta;
