import Link from "next/link";
import React from "react";
const Footer = () => {
  return (
    <footer className="justify-self-end bg-[#F5F7F8] md:h-[40vh] p-8 md:px-12 md:pt-12 flex flex-col justify-between ">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between px-8 pb-8 md:pb-0 md:items-center  lg:px-12 flex-1">
        <div className="md:mb-32">
          <Link
            href="/"
            className="font-bold text-[#127C56] text-[1.3em] self-start justify-self-start"
          >
            token giver.
          </Link>
        </div>
        <div className="flex flex-col md:flex-row  gap-4">
          <span>Overview</span>
          <span>Features</span>
          <span>Help</span>
          <span>Privacy</span>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 15 15"
            >
              <path
                fill="none"
                stroke="currentColor"
                d="M7.5 14.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Zm0 0v-8a2 2 0 0 1 2-2h.5m-5 4h5"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.001 9.55c.917-.937 2.111-1.55 3.5-1.55a5.5 5.5 0 0 1 5.5 5.5V21h-2v-7.5a3.5 3.5 0 1 0-7 0V21h-2V8.5h2zm-7-3.05a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m-1 2h2V21h-2z"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                color="currentColor"
              >
                <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className=" flex flex-wrap gap-4  justify-between border-solid border-t-[1px] pb-12 pt-8 border-gray-400">
        <div className="flex  gap-2 items-center">
          <p>
            <span>&copy;</span>
            <span>2024 Token Giver.</span>
          </p>
          <span>All rights reserved</span>
        </div>
        <div className="flex  flex-wrap gap-4">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
