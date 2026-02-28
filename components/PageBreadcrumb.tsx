import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

type Crumb = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: Crumb[];
  className?: string;
};

export default function PageBreadcrumb({ items, className = '' }: PageBreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={`text-sm ${className}`.trim()}>
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        <li className="inline-flex items-center gap-1">
          <Home size={14} className="text-slate-400" />
          <Link href="/" className="hover:text-brand-blue transition-colors">
            หน้าแรก
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              <ChevronRight size={14} className="text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-700">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-brand-blue transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
