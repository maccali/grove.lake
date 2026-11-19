import { analyticsClick } from '../lib/analytics';
import type { Language } from '../lib/i18n';

export default function ReleaseLink({ id, language, children }: { id: string; language: Language; children: React.ReactNode }) {
  return (
    <a className="album" href={`/${language}/albums/${id}`} {...analyticsClick('album_open', 'universe_catalog', { album: id })}>
      {children}
    </a>
  );
}
