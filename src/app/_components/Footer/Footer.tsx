import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  return (
    <div className="py-12 px-16 w-full bg-gray-800 text-gray-300 text-sm leading-7">
      <div className="max-w-5xl flex justify-around mx-auto">
        <div className="mr-20">
          <Link href="/">
            <Image
              src="/logo-nobg.png"
              alt="Instant Physio Logo"
              className="h-12 object-contain"
              width={160}
              height={45}
              priority
            />
          </Link>
        </div>
        <div>
          <p>Partnership</p>
          <p>About</p>
          <p>How it works</p>
          <p>FAQ</p>
        </div>
        <div>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Work with Us</p>
          <p>Cancellation and Refund</p>
        </div>
        <div>
          <p>Contact Us:</p>
          <p>
            <Link
              href="https://github.com/kamosz08/instant-physio-backend"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src="/github-mark-white.svg"
                alt="Github"
                // className="h-12 object-contain"
                width={48}
                height={48}
                priority
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
