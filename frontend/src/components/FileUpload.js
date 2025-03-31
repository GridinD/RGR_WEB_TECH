import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ token }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      setFile(null);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="file-upload">
      <h2>Загрузка файла</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default FileUpload;