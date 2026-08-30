import React, { useState } from 'react';
import { Palette, Plus, Sparkles, Sliders } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { COLOR_PRESETS } from '../../data/colorPresets';

export function NuevoColorForm({ onSubmit }) {
  const [nuevoColor, setNuevoColor] = useState({ nombre: 'Negro Medianoche', codigoHex: '#111827' });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectPreset = (preset) => {
    setNuevoColor({
      nombre: preset.nombre,
      codigoHex: preset.hex,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoColor.nombre.trim()) return;
    try {
      setLoading(true);
      await onSubmit(nuevoColor);
      setNuevoColor({ nombre: '', codigoHex: '#111827' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Palette} subtitle="Selecciona una muestra comercial lista o personaliza el tono">
        Nuevo Color
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Galería de Presets Comerciales */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <label className="form-field-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                <Sparkles size={15} style={{ color: 'var(--brand-gold)' }} />
                Paleta Rápida Comercial (1 Clic)
              </label>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brand-gold)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontWeight: 600,
                }}
              >
                <Sliders size={13} />
                {showAdvanced ? 'Ocultar Avanzado' : 'Tono Libre'}
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                gap: '0.5rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                maxHeight: '160px',
                overflowY: 'auto',
              }}
            >
              {COLOR_PRESETS.map((preset) => {
                const isSelected = nuevoColor.codigoHex.toLowerCase() === preset.hex.toLowerCase();
                return (
                  <button
                    key={preset.nombre}
                    type="button"
                    title={`${preset.nombre} (${preset.hex})`}
                    onClick={() => handleSelectPreset(preset)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: preset.hex,
                      border: isSelected ? '3px solid var(--brand-gold)' : '2px solid rgba(255,255,255,0.15)',
                      boxShadow: isSelected ? '0 0 10px var(--brand-gold)' : '0 2px 4px rgba(0,0,0,0.3)',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.15s ease',
                    }}
                  />
                );
              })}
            </div>
          </div>

          <InputField
            label="Nombre del Color Seleccionado"
            placeholder="Ej. Negro Medianoche / Oro Caserito"
            value={nuevoColor.nombre}
            onChange={(e) => setNuevoColor({ ...nuevoColor, nombre: e.target.value })}
            required
          />

          {/* Vista previa y modo avanzado opcional */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: nuevoColor.codigoHex,
                border: '2px solid rgba(255,255,255,0.3)',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, fontSize: '0.84rem' }}>
              <div style={{ color: 'var(--text-white)', fontWeight: 600 }}>{nuevoColor.nombre || 'Sin nombre'}</div>
              <code style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{nuevoColor.codigoHex}</code>
            </div>
          </div>

          {showAdvanced && (
            <div className="form-field-group" style={{ padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
              <label className="form-field-label">Calibración Manual (Selector Libre)</label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="color"
                  style={{
                    width: '45px',
                    height: '40px',
                    padding: '2px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                  value={nuevoColor.codigoHex}
                  onChange={(e) => setNuevoColor({ ...nuevoColor, codigoHex: e.target.value })}
                />
                <input
                  type="text"
                  className="form-field-input"
                  value={nuevoColor.codigoHex}
                  onChange={(e) => setNuevoColor({ ...nuevoColor, codigoHex: e.target.value })}
                  placeholder="#F59E0B"
                />
              </div>
            </div>
          )}

          <Button type="submit" variant="brand" icon={Plus} loading={loading}>
            Guardar Color en Catálogo
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
