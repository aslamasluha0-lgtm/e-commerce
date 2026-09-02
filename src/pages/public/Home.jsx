import { Link } from 'react-router-dom'
import { ArrowRight, Laptop, Headphones, Monitor, Cpu, MonitorUp } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

const Home = () => {
  const { data: products, isLoading } = useProducts({ _limit: 8 })

  const categories = [
    { id: 1, name: 'Laptops', icon: Laptop },
    { id: 11, name: 'Laptop Stands', icon: MonitorUp },
    { id: 3, name: 'Monitors', icon: Monitor },
    { id: 6, name: 'Headphones', icon: Headphones },
    { id: 5, name: 'Mice', icon: Cpu },
  ]

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Developer Tools & Technology
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Find the best hardware, accessories, and tools for your development workflow.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8 dark:text-gray-100">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <category.icon className="h-12 w-12 text-blue-600 mb-3" />
              <span className="font-medium text-gray-900 dark:text-gray-100">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold dark:text-gray-100">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={products} loading={isLoading} />
      </section>
    </div>
  )
}

export default Home
