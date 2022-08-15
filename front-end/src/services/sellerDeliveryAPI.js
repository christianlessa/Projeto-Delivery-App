import axios from 'axios';

async function sellerDeliveryAPI(caseInput, bodyValue) {
  switch (caseInput) {
  case 'changeStatus':
    try {
      const updateStatus = await axios({
        method: 'PUT',
        url: 'http://localhost:3001/seller/orders/',
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
