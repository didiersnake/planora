"use client";
import { useRouter } from "next/navigation";
import { Globe, Twitter, Instagram, Facebook, Heart, Youtube } from "lucide-react";
const Footer = () => {
  const router = useRouter();
  return (
    <div>
      {/* Persistent Beautiful Page Footer */}
      <footer
        className="bg-slate-950 text-white mt-16 border-t border-slate-900"
        id="app_footer"
      >
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left side brand info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2" id="footer_brand_section">
                <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center">
                  <div className="w-3.5 h-3.5 border-2 border-white rounded-sm"></div>
                </div>
                <span className="font-bold text-lg tracking-tight italic uppercase text-white">
                  <span className="text-orange-500 font-black">Planora</span>
                </span>
              </div>

              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                The zero-install customized social gatherer for Africa. Creating beautiful
                digital event flyers, managing local landmark Pins, and collecting Wave,
                MTN, Orange, and M-Pesa mobile money advance checkouts with zero friction.
              </p>

              {/* Localized flag indication */}
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Globe className="w-3.5 h-3.5 text-orange-500" />
                <span>Optimized for East, West, North, Southern & Central Africa 🌍</span>
              </div>
            </div>

            {/* Center link navigations */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                  Explore App
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>
                    <button
                      onClick={() => router.push("/")}
                      className="hover:text-white transition"
                    >
                      Overview Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/home")}
                      className="hover:text-white transition"
                    >
                      Discover Events
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/events/create")}
                      className="hover:text-white transition"
                    >
                      Plan an Event
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Legal & Terms
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="cursor-not-allowed hover:text-slate-200 transition">
                    Privacy Flyer
                  </li>
                  <li className="cursor-not-allowed hover:text-slate-200 transition">
                    MoMo Terms
                  </li>
                  <li className="cursor-not-allowed hover:text-slate-200 transition">
                    Support Center
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side social connect */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Join the Vibe Community
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow our channels for weekly featured villas, maquis nights, beach grill
                gathers and promo codes!
              </p>

              {/* Social Media Icons on Footer */}
              <div
                className="flex items-center gap-4 text-slate-300"
                id="footer_social_icons"
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 p-1.5 bg-slate-900 border border-slate-800 rounded-lg transition"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 p-1.5 bg-slate-900 border border-slate-800 rounded-lg transition"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 p-1.5 bg-slate-900 border border-slate-800 rounded-lg transition"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 p-1.5 bg-slate-900 border border-slate-800 rounded-lg transition"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
            <p>
              &copy; 2026 GbanzanVibe. All rights reserved. Zero-install, endless
              memories.
            </p>
            <p className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>for communities across Francophone West Africa</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
