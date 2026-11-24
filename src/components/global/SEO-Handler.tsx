// Renders JSON-LD. Escapes "<" so content (titles, descriptions) can never close the script tag.
export const SEOHandler = ({
  schemaData,
}: {
  schemaData: object | object[];
}) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
      }}
    />
  );
};
