interface BrandMarkProps {
  variant?: 'light' | 'dark';
  layout?: 'mark' | 'full';
  className?: string;
  alt?: string;
}

const LOGO_ASSETS = {
  mark: {
    light: '/assets/logo/rt-logo-mark-light.png',
    dark: '/assets/logo/rt-logo-mark-dark.png',
  },
  full: {
    light: '/assets/logo/rt-logo-full-light.png',
    dark: '/assets/logo/rt-logo-full-dark.png',
  },
} as const;

export function BrandMark({
  variant = 'dark',
  layout = 'mark',
  className = 'h-8 w-auto',
  alt = 'Rowad Al Tamayuz Translation Services',
}: BrandMarkProps) {
  return (
    <img
      src={LOGO_ASSETS[layout][variant]}
      alt={alt}
      draggable={false}
      className={`object-contain select-none ${className}`}
    />
  );
}
