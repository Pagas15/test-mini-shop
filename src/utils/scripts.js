import { API_CART, API_PRODUCTS } from "./consts";


export async function request({url, method = 'GET', data = null, callBack}) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    })
    
    const result = await response.json();
		if(callBack) {
			callBack(result)
      // console.log(result);
		} else {
			return result
		}
  } catch (e) {
    console.warn('Error: ', e.message)
  }
}

export const getListProducts = (callBack) => {
	request({
		url: API_PRODUCTS,
		callBack,
	})
}
export const getCardProducts = ({callBack, id}) => {
	request({
		url: `${API_PRODUCTS}/${id}`,
		callBack,
	})
}
export const postCreateCardItem = ({title, price, description, callBack, inCart = false}) => {
	request({url: API_PRODUCTS, method: "POST", callBack, data: {
		title,
		price,
		description,
		inCart
	}})
}
export const postAddCartItem = ({title, price, description, quantity = 1, id, callBack}) => {
	request({url: API_CART, method: "POST", callBack, data: {
		title,
		price,
		description,
		quantity,
		id
	}})
}
export const putEditCardItem = ({title, price, description, callBack, id}) => {
	request({url: `${API_PRODUCTS}/${id}`, method: "PUT", callBack, data: {
		title,
		price,
		description
	}})
}
export const putEditCardItemInCart = ({callBack, id, inCartTo}) => {
  const inCart = inCartTo === 'add' ? true : false;
  getCardProducts({id, callBack: res => {
    request({url: `${API_PRODUCTS}/${id}`, method: "PUT", callBack, data: {
      title: res.title,
      price: res.price,
      description: res.description,
      id,
      inCart
    }})
  }})
}
export const deleteCartItem = (id, callback) => {
	request({url: `${API_CART}/${id}`, method: "DELETE", callback})
}
export const deleteCardItem = (id, callback) => {
	request({url: `${API_PRODUCTS}/${id}`, method: "DELETE", callback})
}

export const getListCart = (callBack) => {
	request({
		url: API_CART,
		callBack,
	})
}
export const changeCurrentCart = ({id, title, price, description, current, callBack}) => {
	request({url: `${API_CART}/${id}`, method: "PUT", callBack, data: {
		title,
		price,
		description,
		id,
		quantity : current
	}})
}
// export const postCreateCardItem = ({title, price, description, callBack, inCart = false}) => {
// 	request({url: API_CART, method: "POST", callBack, data: {
// 		title,
// 		price,
// 		description,
// 		inCart
// 	}})
// }