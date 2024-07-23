import Link from "next/link";

const NotFound = () => {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center bg-background text-center p-4">
      <h1 className="text-4xl font-medium text-theme-green mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue hover:underline">
        Go back to Home
      </Link>
    </section>
  );
};

export default NotFound;
