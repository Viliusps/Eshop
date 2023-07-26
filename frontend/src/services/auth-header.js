export default function authHeader() {
  const token = localStorage.getItem('token');
  if (token != null) {
    return {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
  } else {
    return '';
  }
}
