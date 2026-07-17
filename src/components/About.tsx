import { MapPin, Package, Building2, TrendingUp } from 'lucide-react';

const credentials = [
  {
    icon: Building2,
    value: '2',
    label: 'Office Locations',
    sub: 'Mumbai & Pune',
  },
  {
    icon: Package,
    value: '6+',
    label: 'Product Categories',
    sub: 'Pipes to Hollow Sections',
  },
  {
    icon: MapPin,
    value: 'Pan-India',
    label: 'Dispatch Reach',
    sub: 'Industrial clients nationwide',
  },
  {
    icon: TrendingUp,
    value: 'B2B',
    label: 'Focused Operations',
    sub: 'Trusted by industry buyers',
  },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="section-label">About Bhumi Steel</p>
            <h2 className="section-title">
              An Established Name in Steel Trading
            </h2>
            <div className="section-divider" />
            <p className="font-body text-gray-600 text-base leading-relaxed mb-5">
              Bhumi Steel is a registered steel trading and supply company with its principal office
              in <strong className="text-brand-charcoal">Mumbai</strong> and a branch office at
              the MIDC Bhosari industrial belt in <strong className="text-brand-charcoal">Pune</strong>.
              We operate in a compliance-conscious, B2B framework — all transactions subject to
              Mumbai jurisdiction.
            </p>
            <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
              Our product portfolio spans the full range of structural and process steel — from
              seamless pipes and precision-machined flanges to hollow sections and round bars.
              Whether you need a single-grade quotation or multi-item project procurement, we
              deliver accurate specifications, competitive pricing, and timely dispatch.
            </p>

            {/* Contact quick-link */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-1 bg-brand-gold rounded-full" />
              <div>
                <p className="font-display font-bold text-brand-green text-sm">
                  Registered Office
                </p>
                <p className="font-body text-gray-500 text-sm">
                  Jalaram Niwas, 1st Kumbharwada, Mumbai – 400 004
                </p>
              </div>
            </div>
          </div>

          {/* Right: Credential badges */}
          <div className="grid grid-cols-2 gap-5">
            {credentials.map(({ icon: Icon, value, label, sub }) => (
              <div
                key={label}
                className="card-base p-6 group"
              >
                <div className="mb-4 w-12 h-12 rounded-sm bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-brand-green group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="font-display font-black text-3xl text-brand-green mb-1">
                  {value}
                </div>
                <div className="font-display font-bold text-sm text-brand-charcoal mb-0.5">
                  {label}
                </div>
                <div className="font-body text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
