import React from 'react';
import { PlusCircle, MinusCircle, Scale } from 'lucide-react';

/**
 * Selector de segmento de operación física de stock.
 * Responsabilidad: Elección entre Entrada, Salida/Merma y Ajuste Físico.
 */
export function OperacionSegmentSelector({ tipoOperacion, onSelectTipo }) {
  return (
    <div>
      <label className="form-field-label">Selecciona el Tipo de Operación</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          padding: '0.35rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
        }}
      >
        <button
          type="button"
          onClick={() => onSelectTipo('ENTRADA')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.65rem 0.4rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: tipoOperacion === 'ENTRADA' ? 'var(--brand-gold-bg)' : 'transparent',
            color: tipoOperacion === 'ENTRADA' ? 'var(--brand-gold)' : 'var(--text-secondary)',
            fontWeight: tipoOperacion === 'ENTRADA' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <PlusCircle size={18} style={{ color: tipoOperacion === 'ENTRADA' ? 'var(--brand-gold)' : 'var(--text-muted)' }} />
          <span>Ingreso</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTipo('SALIDA')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.65rem 0.4rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: tipoOperacion === 'SALIDA' ? 'var(--brand-red-bg)' : 'transparent',
            color: tipoOperacion === 'SALIDA' ? 'var(--brand-red)' : 'var(--text-secondary)',
            fontWeight: tipoOperacion === 'SALIDA' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <MinusCircle size={18} style={{ color: tipoOperacion === 'SALIDA' ? 'var(--brand-red)' : 'var(--text-muted)' }} />
          <span>Salida / Merma</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTipo('AJUSTE')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.65rem 0.4rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: tipoOperacion === 'AJUSTE' ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: tipoOperacion === 'AJUSTE' ? 'var(--text-white)' : 'var(--text-secondary)',
            fontWeight: tipoOperacion === 'AJUSTE' ? 700 : 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <Scale size={18} style={{ color: tipoOperacion === 'AJUSTE' ? 'var(--text-white)' : 'var(--text-muted)' }} />
          <span>Ajuste Físico</span>
        </button>
      </div>
    </div>
  );
}
