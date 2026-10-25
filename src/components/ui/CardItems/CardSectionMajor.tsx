import type { ReactNode, ReactElement } from "react";
import clsx from "clsx";

interface CardItemsProps {
  readonly children?: ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly badge?: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
  readonly className?: string;
}

export default function CardItems({
  children,
  title,
  subtitle,
  badge,
  icon: Icon,
  className,
}: CardItemsProps): ReactElement {
  return (
    <div
      className={clsx(
        "group relative rounded-2xl border border-white/10 bg-blue-900 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10",
        className
      )}
    >
      {/* Header Card (Opsional jika menggunakan Icon / Badge) */}
      {(Icon || badge) && (
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-white border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Icon className="text-2xl" />
            </div>
          )}
          {badge && (
            <span className="rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-blue-400/20">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Title & Subtitle Bawaan (Opsional) */}
      {title && (
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="mt-1 text-sm text-gray-400 font-medium">{subtitle}</p>
      )}

      {/* Children untuk penulisan custom h1-h6, p, dll */}
      {children && <div className={clsx((title || subtitle || Icon) && "mt-4")}>{children}</div>}
    </div>
  );
}