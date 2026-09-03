import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Laptop,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  MonitorUp,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Headset,
} from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import SectionHeader from '@/components/common/SectionHeader'
import { useProducts } from '@/hooks/useProducts'

const CATEGORIES = [
  { id: 1, name: 'Laptops', description: 'Powerful machines for any workload', icon: Laptop },
  { id: 3, name: 'Monitors', description: 'Crisp displays for deep focus', icon: Monitor },
  { id: 4, name: 'Keyboards', description: 'Mechanical & low-profile options', icon: Keyboard },
  { id: 5, name: 'Mice', description: 'Precision for every click', icon: Mouse },
  { id: 6, name: 'Headphones', description: 'Immersive, distraction-free audio', icon: Headphones },
  { id: 11, name: 'Laptop Stands', description: 'Ergonomic workspace setups', icon: MonitorUp },
]

const BENEFITS = [
  { Icon: Truck, title: 'Free Shipping', desc: 'On all orders over ₹500' },
  { Icon: ShieldCheck, title: 'Verified Products', desc: 'Curated & quality checked' },
  { Icon: CreditCard, title: 'Secure Payments', desc: 'Multiple trusted methods' },
  { Icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { Icon: Headset, title: 'Dev Support', desc: 'Help from fellow builders' },
]

const Home = () => {
  const { data: products, isLoading } = useProducts({ _limit: 8 })

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" aria-hidden="true" />
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-600/20"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl dark:bg-brand-800/20"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-medium text-brand-700 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Premium developer gear marketplace
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-surface-900 sm:text-5xl lg:text-6xl dark:text-white">
                Build Better.
                <br />
                Work Smarter.
                <br />
                <span className="text-gradient">Tech that fits your workflow.</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-surface-600 dark:text-surface-300">
                Curated laptops, displays, keyboards, and accessories — everything you need to set
                up a professional development environment, from a clean desk to peak focus.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/products"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 text-base font-medium text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-soft-md"
                >
                  Explore Products
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-surface-200 bg-white px-7 text-base font-medium text-surface-700 transition-colors hover:bg-surface-100 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:hover:bg-surface-800"
                >
                  Shop by Category
                </Link>
              </div>

              {/* Trust stats */}
              <div className="mt-10 flex items-center gap-8">
                {[
                  { value: '500+', label: 'Products' },
                  { value: '10k+', label: 'Happy devs' },
                  { value: '4.8', label: 'Avg. rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-surface-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto aspect-square max-w-md">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-600/15 to-brand-300/15 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-surface-200/60 bg-white/60 shadow-soft-lg backdrop-blur dark:border-surface-800 dark:bg-surface-900/60">
                  <div className="bg-dots-pattern absolute inset-0 opacity-60" aria-hidden="true" />
                  <div className="relative p-8 text-center">
                    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft dark:border-surface-700 dark:bg-surface-800">
                      <Laptop className="mx-auto h-20 w-20 text-surface-300 dark:text-surface-600" />
                      <p className="mt-4 text-sm font-medium text-surface-500 dark:text-surface-400">
                        Premium Developer Setup
                      </p>
                      <p className="mt-1 text-lg font-bold text-surface-900 dark:text-white">
                        Everything you need
                      </p>
                    </div>
                    <div className="absolute -top-2 -right-2 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-soft">
                      Featured
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / trust */}
      <section className="border-y border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {BENEFITS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-surface-500 dark:text-surface-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Browse by category"
          title="Shop by Category"
          actionLabel="View all categories"
          actionTo="/categories"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-6">
          {CATEGORIES.map(({ id, name, icon: Icon }) => (
            <Link
              key={id}
              to={`/products?category=${id}`}
              className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-100 text-surface-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-surface-800 dark:text-surface-300 dark:group-hover:bg-brand-950/40 dark:group-hover:text-brand-400">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-sm font-semibold text-surface-900 dark:text-surface-100">
                {name}
              </p>
              <span className="flex items-center gap-1 text-xs text-surface-500 transition-colors group-hover:text-brand-600 dark:text-surface-400 dark:group-hover:text-brand-400">
                Explore
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-surface-100/60 py-16 dark:bg-surface-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Handpicked for you"
            title="Featured Products"
            actionLabel="View all"
            actionTo="/products"
          />
          <div className="mt-8">
            <ProductGrid products={products} loading={isLoading} skeletonCount={8} />
          </div>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-surface-950 dark:bg-surface-900">
          <div
            className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-10 p-10 sm:p-14 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                Upgrade your setup
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Level up your developer workspace.
              </h2>
              <p className="mt-4 max-w-md text-lg text-surface-300">
                Premium gear for better focus, better productivity, and better work. Discover the
                collection designed around how you build.
              </p>
              <Link
                to="/products"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-medium text-surface-900 transition-colors hover:bg-surface-100 dark:bg-brand-600 dark:text-white dark:hover:bg-brand-700"
              >
                Explore Collection
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <div className="mx-auto grid max-w-sm grid-cols-2 gap-4">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface-800/80 p-5">
                  <Monitor className="h-16 w-16 text-surface-400" />
                </div>
                <div className="mt-8 flex aspect-square items-center justify-center rounded-2xl bg-surface-800/80 p-5">
                  <Keyboard className="h-16 w-16 text-surface-400" />
                </div>
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface-800/80 p-5">
                  <Headphones className="h-16 w-16 text-surface-400" />
                </div>
                <div className="mt-8 flex aspect-square items-center justify-center rounded-2xl bg-surface-800/80 p-5">
                  <Mouse className="h-16 w-16 text-surface-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
