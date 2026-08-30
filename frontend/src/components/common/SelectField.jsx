import React from 'react';

export function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Seleccione una opción...',
  required = false,
  error,
  helperText,
  icon: Icon,
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
      <div className={`input-wrapper ${Icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}>
        {Icon && <Icon size={18} className="input-icon" />}
        <select
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="form-field-select"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
      {error && <span className="field-error-msg">{error}</span>}
      {helperText && !error && <span className="field-helper-msg">{helperText}</span>}
    </div>
  );
}

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
