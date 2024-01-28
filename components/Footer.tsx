"use client";

import React from "react";
import { Card } from "./ui/card";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Card className="border-t rounded-none mt-20 flex flex-col">
      <div className="py-5 border-b">
        <footer className="p-2 w-5/6 md:w-4/5 mx-auto justify-between flex flex-col md:flex-row flex-wrap text-sm  relative ">
          <div className="h-min my-auto text-secondary-foreground">
            <p className="md:text-xl text-sm text-secondary-foreground font-bold mb-2">
              Quick Links
            </p>

            <a href="/computers">
              <p className="footer-p">Computers</p>
            </a>
            <a href="/networks">
              <p className="footer-p">Networks</p>
            </a>
            <a href="/printers">
              <p className="footer-p">Printers</p>
            </a>
          </div>
          <div className="h-min my-auto text-secondary-foreground">
            <p className="md:text-xl text-sm text-secondary-foregroundfont-bold mb-2">
              Legal
            </p>

            <a href="/disclaimer">
              <p className="footer-p">Disclaimer</p>
            </a>
            <a href="/admin">
              <p className="footer-p">Admin</p>
            </a>
            <a href="/terms">
              <p className="footer-p">Terms and Conditions</p>
            </a>
          </div>

          <div className="h-min my-auto text-secondary-foreground">
            <p className="md:text-xl text-sm text-secondary-foreground font-bold mb-2">
              Contact
            </p>

            <a href="mailto:denzs6@yahoo.com">
              <p className="footer-p">Email</p>
            </a>
            <a href="tel:6799200972">
              <p className="footer-p">Phone</p>
            </a>
            <a href="https://www.instagram.com/procyon.website/">
              <p className="footer-p">Instagram</p>
            </a>
          </div>
        </footer>
      </div>

      <Link
        target="_blank"
        href={"https://procyon.website/"}
        className={`w-full ${buttonVariants({ variant: "link" })}`}
      >
        Procyon &copy; {year}
      </Link>
    </Card>
  );
}

export default Footer;
