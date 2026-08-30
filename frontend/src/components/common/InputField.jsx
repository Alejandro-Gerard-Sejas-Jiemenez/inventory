import React from 'react';

export function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  icon: Icon,
  disabled = false,
  min,
  max,
  step,
  className = '',
  style = {},
}) {
  return (
    <div className={`form-field-group ${className}`} style={style}>
      {label && (
        <label className="form-field-label" htmlFor={name}>
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className={`input-wrapper ${Icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}>
        {Icon && <Icon size={18} className="input-icon" />}
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className="form-field-input"
        />
      </div>
      {error && <span className="field-error-msg">{error}</span>}
      {helperText && !error && <span className="field-helper-msg">{helperText}</span>}
    </div>
  );
}
