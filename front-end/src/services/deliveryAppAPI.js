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
  case 'getAllProducts': {
    const allProducts = await axios({
      method: 'get',
      url: 'http://localhost:3001/customer/products',
    });
    return allProducts;
  }
  case 'registerUser': {
    try {
      const newUser = await axios({
        method: 'post',
        url: 'http://localhost:3001/register/',
        data: bodyValue,
      });
      return newUser.data;
    } catch (error) {
      return 'exists';
    }
  }
  case 'newOrder': {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const newOrder = await axios({
      method: 'post',
      url: 'http://localhost:3001/customer/orders',
      data: bodyValue,
      headers: { authorization: token },
    });
    console.log(newOrder);
    return newOrder;
  }
  default:
    return console.log('error');
  }
}
