import { Button, Container } from '@mui/material';
import { FormEvent, useState } from 'react';
import { API_URL } from '../config/api';

export default function Playground() {
  const [file, setFile] = useState<File | null>(null);
  const handleUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    fetch(`${API_URL}upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <Container>
        <h1>Playground</h1>
        <form
          action={`${API_URL}/upload`}
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleUpload}
        >
          <h4>Upload File</h4>
          <input
            type="file"
            name="file"
            multiple={false}
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </div>
  );
}
