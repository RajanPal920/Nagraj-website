import {
  MapPin,
  Package,
  Building2,
  TrendingUp,
  Award,
  Shield,
  Truck,
  FlaskConical,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const credentials = [
  {
    icon: Award,
    value: "ISO",
    label: "Certified Company",
    sub: "Quality Management System",
  },
  {
    icon: Building2,
    value: "10+",
    label: "Years of Excellence",
    sub: "Established Over a Decade",
  },
  {
    icon: Truck,
    value: "Pan-India",
    label: "Supply Network",
    sub: "Mumbai & Pune Operations",
  },
  {
    icon: FlaskConical,
    value: "Certified",
    label: "Quality Testing",
    sub: "Govt. Approved Laboratories",
  },
];

export function About() {
  const [textRef, textVisible] = useIntersectionObserver<HTMLDivElement>();
  const [imageRef, imageVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div
            ref={textRef}
            className={`order-2 lg:order-1 ${textVisible ? "animate-reveal-left" : "opacity-0"}`}
          >
            <p className="section-label text-brand-red">
              About Nagraj Metal Industries
            </p>
            <h2 className="section-title text-brand-charcoal">
              Dynamic Group with{" "}
              <span className="text-brand-red">Young Visionaries</span>
            </h2>
            <div className="section-divider bg-brand-red" />

            <div className="space-y-4 font-body text-gray-600 text-base leading-relaxed">
              <p>
                Nagraj Metal Industries is a dynamic group, established over a
                decade ago to cater to growing demands of industrial raw
                materials. We have a team of
                <strong className="text-brand-charcoal">
                  {" "}
                  young visionaries
                </strong>{" "}
                who endeavor for excellence in every aspect related to our
                products.
              </p>
              <p>
                As{" "}
                <strong className="text-brand-charcoal">
                  Manufacturers, Suppliers & Exporters
                </strong>
                with huge stocks, Nagraj Metal Industries has become one of the
                most reliable sources for quality within a short span. We are an
                <span className="text-brand-red font-semibold">
                  {" "}
                  ISO CERTIFIED COMPANY
                </span>{" "}
                and are registered with the best of semi-govt., govt., private &
                multinational companies.
              </p>
              <p>
                Our aim is to provide our buyers with everything in stainless
                steel under one roof. We have tied up with one of the best
                manufacturers of steel to supply high-quality & tested
                material/products to our customers at competitive rates.
              </p>
            </div>

            {/* Additional Capabilities */}
            <div className="mt-6 p-5 bg-brand-red/5 border border-brand-red/10 rounded-lg">
              <h4 className="font-display font-bold text-brand-red text-sm uppercase tracking-wider mb-3">
                Our Capabilities
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-brand-red mt-1">•</span>
                  CT3/ARE4/H forms for exports
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-brand-red mt-1">•</span>
                  Modvat invoices for excise benefits
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-brand-red mt-1">•</span>
                  Govt. approved laboratory testing
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-brand-red mt-1">•</span>
                  Third-party inspection ready
                </li>
              </ul>
            </div>

            {/* Credential badges */}
            <div className="grid grid-cols-2 gap-5 mt-8">
              {credentials.map(({ icon: Icon, value, label, sub }, index) => (
                <div
                  key={label}
                  className={`card-base p-6 group ${textVisible ? `animate-fade-in-up stagger-${(index % 4) + 1}` : "opacity-0"}`}
                >
                  <div className="mb-4 w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                    <Icon
                      size={20}
                      className="text-brand-red group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="font-display font-black text-xl text-brand-red mb-1">
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
          <div
            ref={imageRef}
            className={`order-1 lg:order-2 relative w-full h-[500px] lg:h-[700px] rounded-lg overflow-hidden shadow-2xl ${imageVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {/* Fallback color */}
            <div className="absolute inset-0 bg-gray-100" />
            <img
              src="/images/warehouse.jpg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000";
              }}
              alt="Nagraj Metal Industries Warehouse"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay gradient to anchor the image slightly */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent pointer-events-none" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur shadow-lg p-5 rounded-lg flex items-center gap-4">
              <div className="h-12 w-1 bg-brand-red rounded-full flex-shrink-0" />
              <div>
                <p className="font-display font-bold text-brand-red text-sm">
                  Registered Office
                </p>
                <p className="font-body text-gray-500 text-sm">
                  Jalaram Niwas, 1st Kumbharwada, Mumbai – 400 004
                </p>
              </div>
            </div>

            {/* ISO Badge on Image */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur shadow-lg p-3 rounded-lg flex items-center gap-2">
              <Award size={20} className="text-brand-red" />
              <span className="font-display font-bold text-brand-charcoal text-xs uppercase tracking-wider">
                ISO Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
