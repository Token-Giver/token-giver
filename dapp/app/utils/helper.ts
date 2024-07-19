export const fetchContentFromIPFS = async (cid: string) => {
  try {
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
    const data = await response.json();

    return { ...data, cid: cid };
  } catch (error) {
    console.error(`Error fetching data for CID ${cid}:`, error);
    return null;
  }
};
