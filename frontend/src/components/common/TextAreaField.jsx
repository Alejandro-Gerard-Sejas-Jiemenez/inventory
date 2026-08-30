import React from 'react';

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  error,
  helperText,
  disabled = false,
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
      <textarea
        id={name}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={`form-field-textarea ${error ? 'has-error' : ''}`}
      />
      {error && <span className="field-error-msg">{error}</span>}
      {helperText && !error && <span className="field-helper-msg">{helperText}</span>}
    </div>
  );
}
