import axios from 'axios';

export default async function adminDeliveryAPI(input, bodyValue) {
  switch (input) {
  case 'registerUser': {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const newUser = await axios({ method: 'post',
        url: 'http://localhost:3001/admin/manage',
        data: bodyValue,
        headers: { authorization: token },
      });
      setUserExists('hidden');
      return newUser.data;
    } catch (error) {
      return 'exists';
    }
  }
  default:
    return console.log('error');
  }
}
