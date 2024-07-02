import Fundraisers from "./components/Fundraiser/Fundraisers";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  //   const [collections, setCollections] = useState([]);
  //   const fetchCollection = async () => {
  //     const address =
  //       "0x06017E61464EC0FE7e49ABB11033cE73207eFAB5E3a9E55A52cDA8C5038e5542";
  //     const collectionAddress =
  //       "0x06f10e1524d583b2c894512670c4fb7359d7d9287e29f86421d68a10a8ee11f4";
  //     // const address =
  //     //   "0x06f10e1524d583b2c894512670c4fb7359d7d9287e29f86421d68a10a8ee11f4";
  //     const chain_id = "0x1";
  //     const apiKey = "mAlK9lbTtm7jgYTnr4lR87wQHK5BbddDaV5SvyEt";
  //     /*
  //     Retrieve All Collections Owned by an Account: Retrieves a list of all nft collections associated with a specific account. Any collection for which the given account is the owner of at least one token will be listed here.
  //     */
  //     // const endpoint = `https://api.arkproject.dev/v1/owners/${address}/contracts`;

  //     /* Retrieve NFTs:
  // This endpoint allows you to retrieve a paginated list of all tokens of a collection. By default, a maximum of hundred tokens are shown per page.
  // */
  //     const endpoint = `https://api.arkproject.dev/v1/tokens/${collectionAddress}`;

  //     try {
  //       const response = await fetch(endpoint, {
  //         method: "GET",
  //         headers: {
  //           "x-api-key": apiKey,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setCollections(data.result);
  //       console.log(data.result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <main className="flex flex-col gap-10 rounded-t-[50px] mt-[5rem] py-10 px-4 md:px-10 lg:px-16">
      <Header />
      <Hero />
      <Fundraisers />
    </main>
  );
}
