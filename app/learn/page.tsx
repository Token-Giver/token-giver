import Container from "../components/util/Container";

const page = () => {
  return (
    <section className="px-4 py-[5rem] lg:px-[10vw]">
      <Container>
        <h2 className="mt-16 text-center text-theme-green">
          How Token Giver work
        </h2>

        <div className="mx-auto my-16 flex flex-col gap-8 md:w-[70%] md:text-justify">
          <p>
            So you've decided to start fundraising – whether it's for yourself,
            a worthy cause, a charity, or to launch that creative project you've
            always dreamed of. Great news – Token Giver is the perfect place to
            make that happen.
          </p>
          <p>
            Token Giver is a decentralized application designed to revolutionize
            the way we approach charity and fundraising. It's free to start your
            campaign. Simply come up with an engaging title, share your
            fundraiser story, and set your page live to start receiving
            donations.
          </p>

          <p>
            So, how does Token Giver work? Our platform allows users to
            effortlessly create and manage fundraising campaigns by minting
            unique campaign NFTs. Each of these NFTs is linked to a Token Bound
            Account (TBA), which provides a secure and transparent way to handle
            donations. Donations are not only seamless but also efficient,
            ensuring that every contribution is securely recorded on the
            blockchain.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default page;
