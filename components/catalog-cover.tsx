import { ArrowUpRight, Disc3 } from 'lucide-react';

export function CatalogCover({ title, art, badge }: { title: string; art?: string; badge?: React.ReactNode }) {
  return (
    <div className={art ? 'album-art' : 'album-art catalog-cover-placeholder'}>
      {art ? (
        <img src={art} alt="" width="800" height="800" loading="lazy"/>
      ) : (
        <>
          <Disc3 className="release-placeholder" aria-hidden="true"/>
          <span className="catalog-cover-title" aria-hidden="true">{title}</span>
        </>
      )}
      {badge}
      <span className="album-arrow" aria-hidden="true"><ArrowUpRight size={22}/></span>
    </div>
  );
}
