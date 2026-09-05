import React from 'react';
import { FeaturedCaseImage } from './FeaturedCaseImage';
import { FeaturedCaseInfo } from './FeaturedCaseInfo';

/**
 * Componente atómico reutilizable para tarjetas editoriales de fundas destacadas.
 * Responsabilidad: Orquestar el layout grid entre fotografía e información técnica.
 */
export function FeaturedCaseCard({
  funda,
  indexBadge = '01',
  tag = 'FUNDA DE ALTO IMPACTO',
  reverse = false,
  onOpenDetail,
}) {
  const imgUrl = (funda.imagenes && funda.imagenes.length > 0 && funda.imagenes[0]?.url) || funda.imagenUrl;

  const imageBlock = <FeaturedCaseImage imgUrl={imgUrl} nombre={funda.nombre} />;
  const infoBlock = (
    <FeaturedCaseInfo
      funda={funda}
      indexBadge={indexBadge}
      tag={tag}
      onOpenDetail={onOpenDetail}
    />
  );

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}
    >
      {reverse ? (
        <>
          {infoBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {infoBlock}
        </>
      )}
    </article>
  );
}

export default FeaturedCaseCard;
