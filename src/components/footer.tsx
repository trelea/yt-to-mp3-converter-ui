import { Link } from "react-router";
import {
  Disc3,
  Github,
  Twitter,
  Mail,
  Heart,
  Zap,
  Shield,
  HelpCircle,
  FileText,
  Users,
  Headphones,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { href: "/", label: "Convert MP3", icon: Headphones },
      { href: "/library", label: "My Library", icon: Zap },
      { href: "/about", label: "How it Works", icon: HelpCircle },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About Us", icon: Users },
      { href: "/contact", label: "Contact", icon: Mail },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy", icon: Shield },
      { href: "/terms", label: "Terms of Service", icon: FileText },
    ],
  },
};

const socialLinks = [
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "mailto:contact@trelea-songs.com", label: "Email", icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <Disc3 className="size-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Trelea-Songs
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
                The fastest way to convert YouTube videos to high-quality MP3 files.
                Build your personal music library and enjoy your favorite tracks anywhere.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href + link.label}>
                        <Link
                          to={link.href}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <Icon className="size-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} Trelea-Songs. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="size-3.5 text-red-500 fill-red-500" /> for music lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
