import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

// eslint-disable-next-line react/prop-types
function CartItem({ thumbnail, price, title, quantity, addToCart, decrementQuantity }) {
    return (
      <li>
        <img src={thumbnail} alt={title} />
        <div>
          <strong>{title}</strong> - ${price}
        </div>
        <footer>
          <small>Cantidad:
            <br /> 
            <button onClick={decrementQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={addToCart}>+</button>
          </small>
        </footer>
      </li>
    )
  }

export function Cart() {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, decrementQuantity, updateQuantity } = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              decrementQuantity={() => decrementQuantity(product)}
              updateQuantity={(quantity) => updateQuantity(product, quantity)}
              {...product}
            />
          ))}
        </ul>

        <button className='clear-cart' onClick={clearCart}>
          <ClearCartIcon /> Limpiar Carrito
        </button>
      </aside>
    </>
  )
}
