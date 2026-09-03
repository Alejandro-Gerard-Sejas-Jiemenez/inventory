import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardTitle, CardBody } from '../common/Card';
import { Button } from '../common/Button';
import { InputField } from '../common/InputField';
import { Users, Plus } from 'lucide-react';

export function NuevoPropietarioForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardTitle icon={Users} subtitle="Agrega un nuevo propietario al sistema">
        Nuevo Propietario
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <InputField
            label="Nombre o Alias del Propietario"
            id="nombre"
            placeholder="Ej: Alejandro, Hermana, Socio..."
            error={errors.nombre?.message}
            {...register('nombre', { required: 'El nombre es obligatorio' })}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-md)' }}>
            <Button type="submit" variant="primary" icon={Plus}>
              Crear Propietario
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
