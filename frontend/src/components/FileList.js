import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/files', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchFiles();
  }, [token]);

  return (
    <div className="file-list">
      <h2>Список файлов</h2>
      {files.map((file) => (
        <div key={file._id} className="file-item">
          <p>{file.filename}</p>
          <p>Загружен: {file.userId.name} {file.userId.surname}</p>
          <a href={`http://localhost:5000/${file.path}`} target="_blank" rel="noopener noreferrer">
            Скачать
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileList;