export const getAffiliateLink = (ingredientName: string) => {
  // A basic mapping engine. In a real production app, this would query a database
  // of curated affiliate links (e.g. from Amazon Associates or Thrive Market).
  const formattedName = ingredientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Defaulting to a simulated Amazon search URL with an affiliate tag
  return `https://www.amazon.com/s?k=${formattedName}&tag=almondmomkitchen-20`;
};
