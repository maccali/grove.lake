export function Brand({ href, label = 'Grove Lake' }: { href: string; label?: string }) {
  return (
    <a className="brand" href={href}>
      <img src="/brand/grove-lake.png" width="360" height="218" alt={label}/>
    </a>
  );
}
