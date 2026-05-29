import { Helmet } from 'react-helmet-async';
import clientData from '../../data/client.json';

export default function SEO() {
  return (
    <Helmet>
      <title>{clientData.name}</title>
      <meta name="description" content={clientData.description} />
      <meta property="og:title" content={clientData.name} />
      <meta property="og:description" content={clientData.description} />
      <meta name="theme-color" content={clientData.themeColor} />
    </Helmet>
  );
}
