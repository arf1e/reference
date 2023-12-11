import _ from 'lodash';
import { API_URL } from '../config/api';

export default async function handleFileUpload(
  file: File,
  field: string = 'file'
) {
  const formData = new FormData();
  formData.append(field, file);
  const url = `${API_URL}/upload`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const responseJson = await response.json();
  console.log('res json', responseJson);
  const status = _.get(responseJson, 'status', 'error');
  if (status === 'error') {
    throw new Error('File upload failed');
  }
  return responseJson.data;
}
