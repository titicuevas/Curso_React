import './Products.css'
import { AddToCartIcon } from './Icons.jsx'
import PropTypes from 'prop-types'

export function Products({ products }) {
    return (
        <main className='products'>
            <ul>
                {products.slice(0,5).map(product => (
                    <li key={product.id}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />
                        <div>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>
                        <div>
                            <button>
                                <AddToCartIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}

Products.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired
}
