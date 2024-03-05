import Footer from "@/components/Footer";
import NavBar2 from "@/components/nav/NavBar2";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <NavBar2 />
      <div className="w-full h-[80vh] grid place-items-center">
        <div>
          <h1 className="text-2xl text-primary">404 Not Found</h1>
          <p>Could not find requested resource</p>
          <Link
            className="text-primary underline-offset-4 hover:underline"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
