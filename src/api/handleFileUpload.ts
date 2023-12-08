import { API_URL } from '../config/api';

export default async function handleFileUpload(
  file: File,
  field: string = 'file'
) {
  const formData = new FormData();
  formData.append(field, file);
  const url = `${API_URL}/upload`;
  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then(({ data }) => data);
}
