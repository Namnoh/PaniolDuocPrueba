import { writable, get } from 'svelte/store';
import { CartItem } from './app';

export const cartItems = writable<CartItem[]>([]);
// [ { id: "1", quantity: 4 }, { id: "2", quantity: 1 } ]

export const addToCart = (prod) => {
    // console.log(`[CARRITO] Producto: ${JSON.stringify(prod)}`)

	// cartItems is a writable, not a value
	// get(cartItems) ->  [ { id: "1", quantity: 6 }, { id: "2", quantity: 1 }, { id: "3", quantity: 1} ]
	let items = get(cartItems);
	let itemPosition = items.findIndex(
		(item) => {
			return item.id == prod.id;
		} // does the current item have an id of "1"?
	);

	if (itemPosition !== -1) {
		// Item is already in cart, add to the quantity of that item
		cartItems.update(() => {
			// items: [ { id: "1", quantity: 6 }, { id: "2", quantity: 3 } ]
			// updatedItems: [{ id: "1", quantity: 7 }, { id: "2", quantity: 3 } ]
			let updatedItems = items.map((item) => {
				if (item.id === prod.id) {
					return { ...item, cantidad: item.cantidad + 1 };
				}
				return item;
			});

			return updatedItems;
		});
	} else {
		// Item is not in the cart at all, so add the object to the cart
		cartItems.update(() => {
			return [...items, { id: prod.id, name:prod.name, cantidad: 1 }];
		});
	}
};

// remove from cart (remove one) -> change the value of the writable
export const removeFromCart = (id: number) => {
	let items = get(cartItems);
	let itemPosition = items.findIndex(
		(item) => {
			return item.id == id;
		} // does the current item have an id of "1"?
	);

	// [ {id: "1", quantity: 1} ]
	if (items[itemPosition]?.cantidad - 1 === 0) {
		items.splice(itemPosition, 1);
	}
	// [ ]

	cartItems.update(() => {
		// items: [ { id: "1", quantity: 6 }, { id: "2", quantity: 3 } ]
		// updatedItems: [{ id: "1", quantity: 5 }, { id: "2", quantity: 3 } ]
		let updatedItems = items.map((item) => {
			if (item.id === id) {
				return { ...item, cantidad: item.cantidad - 1 };
			}
			return item;
		});

		return updatedItems;
	});
};


export const readCarrito = () => {
    let cart = get(cartItems);
    // console.log("READ CARRITO: " + JSON.stringify(cart))
    return cart;
}

export const vaciarCarrito = () => {
	cartItems.set([]);
}