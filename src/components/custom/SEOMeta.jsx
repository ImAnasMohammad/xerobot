import Head from "next/head";

const SeoMeta = ({ title, metaData = {} }) => {
  return (
    <Head>
      <title>{'title'}</title>
      {Object.entries(metaData).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaData.description || ""} />
      <meta property="og:url" content={metaData.url || ""} />
      <meta property="og:site_name" content="XeroBot" />
      <meta property="og:image" content={metaData.image || ""} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default SeoMeta;
