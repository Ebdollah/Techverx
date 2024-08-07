import React from 'react';
import styles from './index.module.css';

const Input = React.forwardRef(function Input({ label, ...props }, ref) {
  return (
    <p className={styles.control}>
      <label className={styles.label}>{label}</label>
      <input ref={ref} {...props} className={styles.input} />
    </p>
  );
});

export default Input;
