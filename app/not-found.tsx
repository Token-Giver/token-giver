import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-background p-4 text-center">
      <Image
        src={"/404.png"}
        height={600}
        width={600}
        role="presentation"
        alt="page not found"
        className="mb-8 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
      />
      <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl font-medium text-foreground-primary">
        Oops! Something Went Wrong
      </h1>
      <p className="mb-8 text-xs sm:text-sm md:text-base">
        We can't find the page you are looking for
      </p>
      <Link
        href="/"
        className="rounded-[25px] bg-accent-green px-4 py-2 text-sm sm:text-base text-white hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </section>
  );
};

export default NotFound;
