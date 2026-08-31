import React, { useState } from 'react';
import { Lock, Mail, Key, LogIn, ShieldAlert } from 'lucide-react';
import { Modal } from './common/Modal';
import { InputField } from './common/InputField';
import { Button } from './common/Button';
import { api } from '../services/api';

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo y contraseña');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const user = await api.login({ email: email.trim(), password });
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(err.message || 'Credenciales inválidas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Acceso al Panel Administrador"
      subtitle="Ingresa tus credenciales autorizadas de Los Caseritos"
      icon={Lock}
      maxWidth="460px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="brand"
            onClick={handleSubmit}
            loading={loading}
            icon={LogIn}
          >
            Iniciar Sesión
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-red-bg)',
              color: 'var(--brand-red)',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <ShieldAlert size={16} flexShrink={0} />
            <span>{error}</span>
          </div>
        )}

        <InputField
          label="Correo Electrónico"
          type="email"
          placeholder="admin@inventario.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Key}
          required
        />

        <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Usuarios de prueba autorizados:</strong>
          <div style={{ marginTop: '0.2rem' }}>• Administrador: <code>admin@inventario.com</code> / <code>admin123</code></div>
          <div>• Vendedor: <code>carlos@inventario.com</code> / <code>vendedor123</code></div>
        </div>
      </form>
    </Modal>
  );
}
