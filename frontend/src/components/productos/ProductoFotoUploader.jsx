import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Link, Trash2, X } from 'lucide-react';
import { Button } from '../common/Button';
import { InputField } from '../common/InputField';

// Función utilitaria para comprimir y convertir imágenes locales a Base64 ligero (máx 800px)
const processDeviceImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
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

        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
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
 * Componente modular para selección y carga de fotografía de producto.
 * Responsabilidad: Compresión cliente, subida local y modo URL web.
 */
export function ProductoFotoUploader({ imagenUrl, onImageChange, onRemoveImage }) {
  const fileInputRef = useRef(null);
  const [useUrlMode, setUseUrlMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleDeviceImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const base64Data = await processDeviceImage(file);
      onImageChange(base64Data);
    } catch (err) {
      console.error('Error procesando imagen local:', err);
      alert('Hubo un problema al procesar la imagen del dispositivo.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        alignItems: 'center',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleDeviceImageUpload}
      />

      {/* Vista Previa Clickeable */}
      <div
        onClick={() => fileInputRef.current?.click()}
        title="Haz clic para seleccionar imagen de tu dispositivo"
        style={{
          width: '84px',
          height: '84px',
          borderRadius: 'var(--radius-md)',
          border: imagenUrl ? '2px solid var(--brand-gold)' : '2px dashed var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'var(--transition)',
        }}
      >
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt="Vista previa"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <ImageIcon size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }} />
            <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.1 }}>
              {uploadingImage ? 'Cargando...' : 'Elegir Foto'}
            </span>
          </>
        )}
      </div>

      <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className="form-field-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ImageIcon size={14} style={{ color: 'var(--brand-gold)' }} />
            Fotografía del Producto
          </label>
          <button
            type="button"
            onClick={() => setUseUrlMode(!useUrlMode)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--brand-gold)',
              fontSize: '0.74rem',
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

        {!useUrlMode ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              type="button"
              variant="brand"
              size="sm"
              icon={Upload}
              loading={uploadingImage}
              onClick={() => fileInputRef.current?.click()}
            >
              Seleccionar desde Dispositivo
            </Button>
            {imagenUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={Trash2}
                style={{ color: 'var(--brand-red)' }}
                onClick={onRemoveImage}
              >
                Quitar Foto
              </Button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <InputField
                placeholder="https://ejemplo.com/foto-producto.jpg"
                value={imagenUrl}
                onChange={(e) => onImageChange(e.target.value)}
              />
            </div>
            {imagenUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemoveImage}
                icon={X}
                title="Limpiar"
              />
            )}
          </div>
        )}

        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {imagenUrl
            ? (imagenUrl.startsWith('data:') ? 'Foto cargada desde tu dispositivo (optimizada)' : 'Enlace web configurado')
            : 'Sube una imagen desde tu PC o teléfono para identificar el producto'}
        </span>
      </div>
    </div>
  );
}
