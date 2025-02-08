import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="mb-4 text-4xl font-medium text-theme-green">
        404 - Page Not Found
      </h1>
      <p className="mb-8 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue hover:underline">
        Go back to Home
      </Link>
    </section>
  );
};

export default NotFound;
