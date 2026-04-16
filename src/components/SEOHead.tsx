import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SEOHead = ({ 
  title, 
  description = "Innovafin - Tu aliado estratégico en financiamiento alternativo y gestión de inversiones. Transparencia, seguridad y rendimientos.",
  keywords = "fintech, factoring, inversiones, colombia, financiamiento alternativo, rentabilidad por inversión",
  canonical,
  ogType = "website",
  ogImage = "/og-image.jpg" // Placeholder for now
}: SEOHeadProps) => {
  const siteTitle = "InnovaFin";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SEOHead;
