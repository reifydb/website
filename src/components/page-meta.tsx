import { useLocation } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  absoluteUrl,
  canonicalUrl,
} from '@/lib/site';

export interface ArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags: string[];
}

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  article?: ArticleMeta;
}

export function PageMeta({
  title,
  description,
  image,
  imageAlt,
  article,
}: PageMetaProps) {
  const { pathname } = useLocation();
  const card = absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const alt = imageAlt ?? title;

  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl(pathname)} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={card} />
      <meta property="og:image:alt" content={alt} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={card} />
      <meta name="twitter:image:alt" content={alt} />
      {article && (
        <>
          <meta name="author" content={article.author} />
          <meta property="article:published_time" content={article.publishedTime} />
          <meta
            property="article:modified_time"
            content={article.modifiedTime ?? article.publishedTime}
          />
          <meta property="article:author" content={article.author} />
          {article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </>
  );
}
