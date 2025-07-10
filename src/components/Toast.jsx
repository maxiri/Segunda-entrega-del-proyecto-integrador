import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

const Toast = () => {
  const { toastMessage, setToastMessage } = useContext(ProductContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        setToastMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#333',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 9999,
    }}>
      {toastMessage}
    </div>
  );
};

export default Toast;
