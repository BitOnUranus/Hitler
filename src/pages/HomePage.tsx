import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CreditCard, BarChart2, Shield, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Subscription management</span>{' '}
                  <span className="block text-indigo-600">made simple</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your subscription business with our comprehensive platform.
                  From billing to analytics, we've got you covered.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/signup">
                      <Button variant="primary" size="lg" fullWidth>
                        Get started
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/pricing">
                      <Button variant="outline" size="lg" fullWidth>
                        View pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/7821486/pexels-photo-7821486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Subscription management dashboard"
          />
        </div>
      </div>

      {/* Feature section */}
      <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A complete subscription management solution
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              Everything you need to manage subscriptions, process payments, and grow your business.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Powerful subscription tools
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                Manage every aspect of your subscription business with our comprehensive toolset.
              </p>

              <dl className="mt-10 space-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Flexible billing options</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Monthly, annual, or custom billing cycles with proration support. Multi-currency and tax handling built-in.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <BarChart2 className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Advanced analytics</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Track MRR, ARR, churn, and more with beautiful, insightful dashboards that help you make data-driven decisions.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure and compliant</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    PCI-compliant payment processing, GDPR-ready data handling, and enterprise-grade security for peace of mind.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 -mx-4 lg:mt-0" aria-hidden="true">
              <img
                className="relative mx-auto rounded-lg shadow-lg"
                src="https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Dashboard analytics"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing CTA section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Choose a plan that works for you. No hidden fees, no contracts.
          </p>
          <Link to="/pricing">
            <Button 
              variant="outline" 
              size="lg"
              className="mt-8 bg-white text-indigo-600 border-white hover:bg-indigo-50"
              rightIcon={<ArrowRight className="ml-2 -mr-1 w-5 h-5" />}
            >
              View pricing plans
            </Button>
          </Link>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by businesses worldwide
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-lg leading-6 font-medium text-gray-900">
                  "SubsManager revolutionized our subscription management process. We've seen a 15% increase in customer retention since switching."
                </div>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-700 font-medium">JD</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">Jane Doe</div>
                      <div className="text-sm text-gray-500">CEO, TechStart Inc</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-lg leading-6 font-medium text-gray-900">
                  "The analytics dashboard gives us unprecedented visibility into our subscription metrics. Worth every penny."
                </div>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-700 font-medium">MS</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">Michael Smith</div>
                      <div className="text-sm text-gray-500">CFO, Enterprise Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Multi-tier Pricing',
                  description: 'Freemium, Basic, Pro, Enterprise tiers with customizable features and limits.',
                  icon: <Users className="h-6 w-6" />,
                },
                {
                  name: 'Flexible Billing Cycles',
                  description: 'Monthly, annual, quarterly, or custom billing periods with proration.',
                  icon: <CreditCard className="h-6 w-6" />,
                },
                {
                  name: 'Usage-based Billing',
                  description: 'Charge based on actual usage for API calls, storage, users, and more.',
                  icon: <BarChart2 className="h-6 w-6" />,
                },
                {
                  name: 'Security & Compliance',
                  description: 'Enterprise-grade security with PCI compliance and data protection.',
                  icon: <Shield className="h-6 w-6" />,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <div>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </div>
                  <div className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/signup">
                <Button variant="primary" size="lg">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;