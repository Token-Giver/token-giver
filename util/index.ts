export const generateRandomInt = (length: number) => {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error("Length must be a positive integer");
  }

  // Using crypto.getRandomValues for cryptographically secure random numbers
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;

  return Math.floor((array[0] / (0xffffffff + 1)) * (max - min + 1)) + min;
};

export const generateCampaignUrl = ({
  campaignId,
  campaignName
}: {
  campaignId: string;
  campaignName: string;
}) => {
  if (!campaignId || !campaignName) return "/search";

  // Convert campaign name to URL-friendly format
  const campaignNameSlug = campaignName
    .toLowerCase()
    .trim()
    // Replace common symbols and special characters with hyphens
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    // Handle edge cases
    .replace(/^[0-9]+/, "") // Remove leading numbers
    .replace(/[0-9]+$/, "") // Remove trailing numbers
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens again

  // If the slug is empty after processing, use a fallback
  if (!campaignNameSlug) {
    return `/campaign/${campaignId}`;
  }

  return `/${campaignNameSlug}/${campaignId}`;
};
