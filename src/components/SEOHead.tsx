import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  canonical: string;
  children?: React.ReactNode;
};

export default function SEOHead({ title, description, canonical, children }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {children}
    </Helmet>
  );
}
