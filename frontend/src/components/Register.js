import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        name,
        surname,
      });
      setToken(res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <h2>Данные для регистрации</h2>
      <form onSubmit={handleSubmit}>
        <label>Электронная почта</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="my_email@mail.com"
          required
        />
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ваш пароль"
          required
        />
        <label>Имя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          required
        />
        <label>Фамилия</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Ваша фамилия"
          required
        />
        <button type="submit">Отправить</button>
      </form>
      <p>* поле, обязательное для заполнения</p>
    </div>
  );
};

export default Register;