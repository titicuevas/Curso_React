import { useState, useEffect, useContext } from 'react'
import { products as inicialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx' 
import { FiltersContext } from './context/filters.jsx' 
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'

function useFilters(initialProducts) {
  
const { filters, setFilters } = useContext(FiltersContext)

const [filteredProducts, setFilteredProducts] = useState(initialProducts)

  useEffect(() => {
    const filterProducts = (products, filters) => {
      return products.filter(product => {
        return (
          product.price >= filters.minPrice &&
          (filters.category === 'all' || product.category === filters.category)
        )
      })
    }

    const newFilteredProducts = filterProducts(initialProducts, filters)
    setFilteredProducts(newFilteredProducts)
  }, [initialProducts, filters])

  return { filters, setFilters, filteredProducts }
}

function App() {
  // eslint-disable-next-line no-unused-vars
  const { filters, setFilters, filteredProducts } = useFilters(inicialProducts)

  return (
    <div className="App">
      <CartProvider>
      <Header changeFilters={setFilters} />
      <Cart/>
      <Products products={filteredProducts} />
      <Footer filter={filters}/>
      </CartProvider>

    </div>
  )
}

export default App
