import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold text-blue-600">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist. But your
          clinic&apos;s compliance system should.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to home
          </Link>
          <Link
            href="/features"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            See features &rarr;
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
