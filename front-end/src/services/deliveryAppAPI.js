import axios from 'axios';

export default async function deliveryAppAPI(input, bodyValue) {
  switch (input) {
  // case para o usuário logar
  case 'loginUser': {
    const loginUser = await axios({
      method: 'post',
      url: 'http://localhost:3001/login/',
      data: bodyValue,
    });
    return loginUser.data;
  }
  default:
    return console.log('error');
  }
}
