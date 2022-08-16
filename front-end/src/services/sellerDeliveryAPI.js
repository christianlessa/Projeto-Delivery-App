import axios from 'axios';

async function sellerDeliveryAPI(caseInput, bodyValue) {
  switch (caseInput) {
  case 'getSellerOrders': {
    const allSellerOrders = await axios({
      method: 'post',
      url: 'http://localhost:3001/seller/orders',
      data: bodyValue,
    });
    return allSellerOrders;
  }
  case 'changeStatus':
    try {
      const updateStatus = await axios({
        method: 'put',
        url: 'http://localhost:3001/seller/orders',
        data: bodyValue,
      });
      return updateStatus;
    } catch (error) {
      return error;
    }
  default:
    return console.log('Something has wrong');
  }
}

export default sellerDeliveryAPI;
