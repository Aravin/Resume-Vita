import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="p-10 footer bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Services</span>
          <Link
            href="/api/auth/login"
            className="link link-hover"
            rel="noreferrer"
            prefetch={false}
          >
            Invoice Generation
          </Link>
          <Link
            href="/api/auth/login"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
            prefetch={false}
          >
            Public Invoice
          </Link>
          <Link
            href="/api/auth/login"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
            prefetch={false}
          >
            Cover Letter
          </Link>
          <Link
            href="/api/auth/login"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
            prefetch={false}
          >
            E-Resume
          </Link>
        </div>
        <div>
          <span className="footer-title">Resources</span>
          <Link
            href="/blog"
            className="link link-hover"
          >
            Blog
          </Link>
          <Link
            href="/blog/ats-optimized-resume"
            className="link link-hover"
          >
            ATS Guide
          </Link>
          <Link
            href="/blog/professional-resume-templates"
            className="link link-hover"
          >
            Resume Templates
          </Link>
          <Link
            href="/blog/share-your-resume"
            className="link link-hover"
          >
            Sharing Guide
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a
            href="https://github.com/Aravin/Resume-Vita"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            About us
          </a>
          <a
            href="https://github.com/Aravin/Resume-Vita"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            Contact
          </a>
          <a
            href="https://github.com/Aravin/Resume-Vita"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            Support Us
          </a>
          <a
            href="https://github.com/Aravin/Resume-Vita"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            Report Issue
          </a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a
            href="https://tnc.aravin.net/"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            Terms of use
          </a>
          <a
            href="https://tnc.aravin.net/"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            Privacy policy
          </a>
          <a
            href="https://tnc.aravin.net/"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            Cookie policy
          </a>
        </div>
      </footer>
      <footer className="px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <p>
            <span>
              A product by{" "}
              <a
                href="https://www.aravin.net/?ref=resumeVita"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aravin
              </a>{" "}
              with 💝
            </span>
            <br />
            Free & Open Source © {new Date().getFullYear()}
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/Aravin/Resume-Vita">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/resumevita/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://discord.com/channels/1444920496499200143/1444920497581326338"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            {/* <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a> */}
            {/* <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a> */}
          </div>
        </div>
      </footer>
    </>
  );
}
