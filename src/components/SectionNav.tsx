import { Link, useLocation } from "react-router-dom";

interface SectionNavProps {
  links: { label: string; href: string }[];
  accentColor?: string;
}

export default function SectionNav({ links }: SectionNavProps) {
  const location = useLocation();

  return (
    <div className="bg-card border-b border-border sticky top-20 z-40">
      <div className="container mx-auto px-6 overflow-x-auto">
        <div className="flex items-center gap-1 py-2 min-w-max">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm rounded-lg font-light transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-secondary/10 text-secondary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
