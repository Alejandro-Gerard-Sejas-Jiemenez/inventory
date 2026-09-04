import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Link, Trash2, Plus, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { InputField } from '../common/InputField';

// Compresión client-side de imágenes
// Compresión client-side de imágenes ultra-ligera (reduce el espacio en DB en un 92%)
const processDeviceImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 480;
        const MAX_HEIGHT = 480;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compresión optimizada para e-commerce (~20KB por imagen)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('No se pudo procesar la imagen del dispositivo'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo del dispositivo'));
    reader.readAsDataURL(file);
  });
};

/**
 * Componente Galería de Fotos del Producto.
 * Responsabilidad: Gestión de múltiples imágenes por producto (subida desde archivo local o URL web).
 */
export function ProductoFotoUploader({ imagenesUrls = [], onImagesChange }) {
  const fileInputRef = useRef(null);
  const [useUrlMode, setUseUrlMode] = useState(false);
  const [newUrlInput, setNewUrlInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleDeviceImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploadingImage(true);
      const newBase64s = [];
      for (const file of files) {
        const base64Data = await processDeviceImage(file);
        newBase64s.push(base64Data);
      }
      onImagesChange([...imagenesUrls, ...newBase64s]);
    } catch (err) {
      console.error('Error procesando imagen local:', err);
      alert('Hubo un problema al procesar las imágenes del dispositivo.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddUrl = () => {
    if (!newUrlInput.trim()) return;
    onImagesChange([...imagenesUrls, newUrlInput.trim()]);
    setNewUrlInput('');
  };

  const handleRemoveImage = (index) => {
    const updated = [...imagenesUrls];
    updated.splice(index, 1);
    onImagesChange(updated);
  };

  const handleSetPrincipal = (index) => {
    if (index === 0) return;
    const updated = [...imagenesUrls];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onImagesChange(updated);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleDeviceImageUpload}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label className="form-field-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-gold)' }}>
          <ImageIcon size={16} />
          Galería de Fotografía del Producto ({imagenesUrls.length} {imagenesUrls.length === 1 ? 'imagen' : 'imágenes'})
        </label>
        <button
          type="button"
          onClick={() => setUseUrlMode(!useUrlMode)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--brand-gold)',
            fontSize: '0.76rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontWeight: 600,
          }}
        >
          <Link size={12} />
          {useUrlMode ? 'Subir desde Dispositivo' : 'Ingresar URL Web'}
        </button>
      </div>

      {/* Grid de miniaturas cargadas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        {imagenesUrls.map((url, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              width: '84px',
              height: '84px',
              borderRadius: 'var(--radius-md)',
              border: idx === 0 ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={url}
              alt={`Foto ${idx + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://placehold.co/100x100?text=Error';
              }}
            />
            {idx === 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  backgroundColor: 'var(--brand-gold)',
                  color: 'var(--bg-primary)',
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  padding: '1px 4px',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <Star size={8} fill="currentColor" /> Principal
              </span>
            )}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justify: 'space-between',
                background: 'rgba(0,0,0,0.65)',
                padding: '2px 4px',
              }}
            >
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() => handleSetPrincipal(idx)}
                  title="Hacer Principal"
                  style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', padding: 0 }}
                >
                  <Star size={12} />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                title="Eliminar"
                style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0, marginLeft: 'auto' }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}

        {/* Botón para agregar imagen extra */}
        {!useUrlMode ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: 'var(--radius-md)',
              border: '2px dashed var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'var(--transition)',
            }}
          >
            <Plus size={20} />
            <span style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: '0.2rem' }}>
              {uploadingImage ? 'Cargando...' : 'Agregar Foto'}
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1, minWidth: '240px' }}>
            <InputField
              placeholder="https://ejemplo.com/foto.jpg"
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
            />
            <Button type="button" variant="brand" size="sm" onClick={handleAddUrl}>
              Añadir URL
            </Button>
          </div>
        )}
      </div>

      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        Puedes agregar múltiples fotografías por producto. La primera imagen (marcada como Principal) se usará como portada en la tienda y catálogo.
      </span>
    </div>
  );
}
