import { Github, MessageCircle, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">MistOS</h3>
            <p className="text-sm text-muted-foreground">
              A community-driven custom Android ROM focused on performance, stability, and user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/MistOS-Devices"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary/50 flex items-center justify-center hover:shadow-[var(--glow-cyan)] transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/MistOS_Official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary/50 flex items-center justify-center hover:shadow-[var(--glow-cyan)] transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary/20 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by the MistOS Team
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} MistOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
