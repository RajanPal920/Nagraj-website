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
          <div className="order-2 lg:order-1">
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

            {/* Credential badges */}
            <div className="grid grid-cols-2 gap-5 mt-10">
              {credentials.map(({ icon: Icon, value, label, sub }) => (
                <div
                  key={label}
                  className="card-base p-6 group"
                >
                  <div className="mb-4 w-10 h-10 rounded-sm bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
                    <Icon
                      size={20}
                      className="text-brand-green group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="font-display font-black text-2xl text-brand-green mb-1">
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

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative w-full h-[500px] lg:h-[700px] rounded-sm overflow-hidden shadow-2xl">
            {/* Fallback color */}
            <div className="absolute inset-0 bg-gray-100" />
            <img 
              src="/images/warehouse.jpg" 
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000";
              }}
              alt="Bhumi Steel Warehouse"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay gradient to anchor the image slightly */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent pointer-events-none" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur shadow-lg p-5 rounded-sm flex items-center gap-4">
              <div className="h-12 w-1 bg-brand-gold rounded-full flex-shrink-0" />
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

        </div>
      </div>
    </section>
  );
}
