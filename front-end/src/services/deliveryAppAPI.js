import axios from 'axios';

export default async function deliveryAppAPI(input) {
  switch (input) {
  // case para o usuário logar
  case 'loginUser': {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const loginUser = await axios({
      method: 'post',
      url: 'http://localhost:3001/login/',
      data: bodyValue,
      headers: { authorization: token },
    });
    return loginUser.data;
  }
  default:
    return console.log('error');
  }
}
