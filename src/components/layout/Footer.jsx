import { Link } from 'react-router-dom'
import { Command, Globe, AtSign, MessageCircle, Mail } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { env } from '@/config/env'

const appName = env.APP_NAME || 'DevStore'

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-sm font-semibold text-surface-100 mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link, index) =>
        link.to ? (
          <li key={index}>
            <Link
              to={link.to}
              className="text-sm text-surface-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ) : (
          <li key={index}>
            <a
              href={link.href}
              className="text-sm text-surface-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        )
      )}
    </ul>
  </div>
)

const Footer = () => {
  const [email, setEmail] = useState('')
  const { success } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    success('Subscribed!', 'You will receive the best deals in your inbox.')
    setEmail('')
  }

  const groups = {
    shop: [
      { label: 'Products', to: '/products' },
      { label: 'Categories', to: '/categories' },
      { label: 'New Arrivals', to: '/products' },
      { label: 'Best Sellers', to: '/products' },
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Returns & Refunds', href: '/returns' },
    ],
    company: [
      { label: 'About Us', to: '/about' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  }

  const socials = [
    { Icon: Globe, label: 'Website', href: '#' },
    { Icon: AtSign, label: 'Email', href: '#' },
    { Icon: MessageCircle, label: 'Community', href: '#' },
    { Icon: Mail, label: 'Newsletter', href: '#' },
  ]

  return (
    <footer className="bg-surface-950 text-surface-300 dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Command className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">{appName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface-400">
              A premium marketplace for developers and technology enthusiasts. Discover curated
              hardware, accessories, and tools built for your workflow.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-900 text-surface-400 transition-colors hover:bg-brand-600 hover:text-white hover:shadow-soft-md"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={groups.shop} />
          <FooterColumn title="Support" links={groups.support} />
          <FooterColumn title="Company" links={groups.company} />

          {/* Newsletter */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-surface-800 bg-surface-900/50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">Stay in the loop</h4>
                  <p className="mt-1 text-sm text-surface-400">
                    Get the latest drops, exclusive deals, and developer-focused tech news.
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email for newsletter"
                      className="h-11 w-full rounded-full border border-surface-700 bg-surface-900 pl-10 pr-4 text-sm text-white placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-800 pt-8 sm:flex-row">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </p>
          <p className="text-sm text-surface-500">
            Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
