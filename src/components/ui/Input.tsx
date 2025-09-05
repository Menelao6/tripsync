'use client';

import React, { useId, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    id,
    required = false,
    error,
    className = '',
    ...rest
  },
  ref
) {
  const uid = useId(); // ✅ hydration-safe
  const inputId = id ?? name ?? uid;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.inputLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        className={`${styles.inputField} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        value={value ?? ''}                 // keep controlled, avoid warnings
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...rest}                          // supports min, max, autoComplete, etc.
      />

      {error && (
        <span id={errorId} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
