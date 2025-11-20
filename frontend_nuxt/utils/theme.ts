export const palette = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
} as const;

/**
 * PUBLIC_INTERFACE
 * Returns class names for a button with variants.
 */
export function btnClass(variant: 'primary' | 'secondary' | 'ghost' = 'primary'): string {
  const base = 'btn';
  if (variant === 'secondary') return `${base} secondary`;
  if (variant === 'ghost') return `${base} ghost`;
  return base;
}

/**
 * PUBLIC_INTERFACE
 * Returns utility classes to compose a card surface.
 */
export function surfaceClass(extra: string = ''): string {
  return `surface ${extra}`.trim();
}
