import ChoosePricing from "@/app/_components/ChoosePricing";
import HowItWorks from "@/app/_components/HowItWorks";
import OnlineTrainingTable from "@/app/_components/OnlineTrainingTable";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center px-4 sm:px-24">
        <div className="w-full flex max-w-5xl gap-6 justify-between flex-col items-center md:flex-row">
          <div className="flex-1">
            <p className="text-4xl font-semibold py-4">
              Online personal training
            </p>
            <p className="text-lg py-1">✔ Personal one-on-one sessions</p>
            <p className="text-lg py-1">
              ✔ You can train anywhere in the world
            </p>
            <p className="text-lg py-1">✔ All you need is some space</p>
            <Link href={"/coaches"} className="btn btn-primary mt-8 px-12">
              Start now
            </Link>
          </div>
          <div className="flex-1">
            <Image
              src={`/main.png`}
              alt="Main photo"
              className="h-[400px] object-cover"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-12 py-12 px-4 sm:px-24">
        <div className="w-full max-w-5xl">
          <HowItWorks />
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-36 bg-slate-100 py-12 px-4 sm:px-24">
        <div className="w-full max-w-5xl">
          <div className="w-full flex gap-6 justify-between flex-col items-center md:flex-row-reverse">
            <div className="flex-1 md:ml-12">
              <p className="text-2xl font-semibold text-gray-800 mb-7 py-3">
                Personal Trainer keeps you accountable
              </p>
              <p className="">
                &quot;It’s easy to sink back into your couch with a bag of chips
                and tell yourself you’ll work out tomorrow. Or, that you’re too
                tired. I know it all too well my friend. But having a fitness
                coach to check up on me daily has helped me kick excuses to the
                curb. It’s easy to make excuses to yourself why you can’t work
                out, but then try spelling them out to another person daily. It
                actually gets kind of embarrassing.&quot;
              </p>
            </div>
            <div className="flex-1">
              <Image
                src={`/main2.png`}
                alt={"Personal coaches"}
                className="h-[300px] object-cover"
                width={500}
                height={300}
              />
            </div>
          </div>

          <div className="w-full flex gap-6 justify-between flex-col items-center md:flex-row mt-14">
            <div className="flex-1 md:ml-12">
              <p className="text-2xl font-semibold text-gray-800 mb-7 py-3">
                As flexible as possible
              </p>
              <p className="">
                You can pick any category of workout, you can pick any time you
                want to train, you can train from anywhere. Your coach will
                adjust training sessions to your personal needs. It can&lsquo;t
                get more flexible than that.
              </p>
            </div>
            <div className="flex-1">
              <Image
                src={`/main3.png`}
                alt={"Personal coaches"}
                className="h-[300px] object-cover"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-12 py-12 px-4 sm:px-24">
        <div className="w-full max-w-5xl">
          <OnlineTrainingTable />
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-12 py-12 px-4 sm:px-24">
        <div className="w-full max-w-5xl">
          <p className="text-3xl font-semibold mb-12 text-center">
            Choose your plan
          </p>
          <ChoosePricing />
        </div>
      </div>
    </div>
  );
}
