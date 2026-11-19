import { analyticsClick } from '../lib/analytics';

export function Brand({ href, placement = 'header', label = 'Grove Lake' }: { href: string; label?: string; placement?: string }) {
  return (
    <a className="brand" href={href} {...analyticsClick('navigation_click', placement, { target: 'home' })}>
      <img src="/brand/grove-lake.png" width="360" height="218" alt={label}/>
    </a>
  );
}
