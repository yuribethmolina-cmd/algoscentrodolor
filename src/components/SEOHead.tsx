import { Helmet } from "react-helmet-async";

const DEFAULT_OG = "https://algoscentrodolor.com/__l5e/assets-v1/779a88c2-574d-4c2e-bde6-a364abb036b7/og-algos.jpg";

type Props = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  children?: React.ReactNode;
};

export default function SEOHead({ title, description, canonical, ogImage = DEFAULT_OG, children }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </Helmet>
  );
}
