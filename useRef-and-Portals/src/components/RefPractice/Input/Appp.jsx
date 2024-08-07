import React from 'react';
import Input from './Input';
import styles from './index.module.css';

export const userData = {
  name: '',
  email: '',
};

export default function Appp() {
  const name = React.useRef();
  const email = React.useRef();

  function handleSaveData() {
    const enteredName = name.current.value;
    const enteredEmail = email.current.value;
    userData.name = enteredName;
    userData.email = enteredEmail;

    console.log(userData);
  }

  return (
    <div id="app" className={styles.app}>
      <Input type="text" label="Your Name" ref={name} />
      <Input type="email" label="Your E-Mail" ref={email} />
      <p id="actions" className={styles.actions}>
        <button onClick={handleSaveData} className={styles.button}>Save Data</button>
      </p>
    </div>
  );
}
