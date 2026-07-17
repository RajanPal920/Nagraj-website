import { MapPin, Building2 } from 'lucide-react';

const offices = [
  {
    id: 'mumbai',
    type: 'Registered Office',
    city: 'Mumbai',
    address: [
      'Jalaram Niwas,',
      'Plot No. 2, 1st Floor, Office No. 1,',
      '1st Kumbharwada,',
      'Mumbai – 400 004.',
    ],
    note: 'Subject to Mumbai Jurisdiction',
    accentColor: 'border-brand-green',
    badgeBg: 'bg-brand-green',
  },
  {
    id: 'pune',
    type: 'Branch Office',
    city: 'Pune',
    address: [
      'Shop No. 3, Sai Nagar Complex,',
      'Plot No. J-66, Opp. J-35,',
      'Block MIDC, Bhosari,',
      'Pune, Maharashtra.',
    ],
    note: 'MIDC Bhosari Industrial Belt',
    accentColor: 'border-brand-gold',
    badgeBg: 'bg-brand-gold',
  },
];

export function Locations() {
  return (
    <section id="locations" className="section-padding bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">Where We Are</p>
          <h2 className="section-title mx-auto">Our Offices</h2>
          <div className="section-divider mx-auto" />
          <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
            Two offices — one in Mumbai's commercial heart, one in Pune's industrial corridor —
            to serve you wherever your projects are.
          </p>
        </div>

        {/* Office cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offices.map(({ id, type, city, address, note, accentColor, badgeBg }) => (
            <div
              key={id}
              id={`office-${id}`}
              className={`rounded-sm border-t-4 ${accentColor} bg-gray-50 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-8`}
            >
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`${badgeBg} text-white text-xs font-display font-bold px-3 py-1 rounded-sm uppercase tracking-wider`}>
                  {type}
                </div>
              </div>

              {/* City */}
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={18} className="text-brand-green" strokeWidth={1.75} />
                <h3 className="font-display font-extrabold text-2xl text-brand-green">
                  {city}
                </h3>
              </div>

              {/* Address */}
              <div className="flex gap-3 mb-6">
                <MapPin size={16} className="text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                <address className="not-italic font-body text-gray-600 text-sm leading-relaxed">
                  {address.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < address.length - 1 && <br />}
                    </span>
                  ))}
                </address>
              </div>

              {/* Note */}
              <div className="pt-5 border-t border-gray-200">
                <p className="font-body text-xs text-gray-400 italic">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
