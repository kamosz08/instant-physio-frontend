import ChoosePricing from "@/app/_components/ChoosePricing";
import HowItWorks from "@/app/_components/HowItWorks";
import OnlineTrainingTable from "@/app/_components/OnlineTrainingTable";
import { backendApi } from "@/backendApi";
import { getSpecializationDetailsAction } from "@/domain-logic/user/getSpecializationDetails";
import { getSpecializationsAction } from "@/domain-logic/user/getSpecializations";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  console.log("From generateStaticParams(Category)");
  const categories = await getSpecializationsAction(() =>
    backendApi.specialization.getAll(),
  );

  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  console.log("From Category");
  const category = await getSpecializationDetailsAction(() =>
    backendApi.specialization.get({
      specializationSlug: decodeURI(params.category),
    }),
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center px-4 sm:px-24">
        <div className="w-full flex max-w-5xl gap-6 justify-between flex-col items-center md:flex-row">
          <div className="flex-1">
            <p className="text-4xl font-semibold py-4">
              Online {category.name} personal training
            </p>
            <p className="text-lg py-1">✔ Personal one-on-one sessions</p>
            <p className="text-lg py-1">
              ✔ You can train anywhere in the world
            </p>
            <p className="text-lg py-1">✔ All you need is some space</p>
            <button className="btn btn-primary mt-8 px-12">Start now</button>
          </div>
          <div className="flex-1">
            <Image
              src={`${process.env.BACKEND_URL}/${category.mainPhoto}`}
              alt={category.name}
              className="h-[400px] object-cover"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-36 bg-slate-100 py-12 px-4 sm:px-24">
        <div className="w-full max-w-5xl">
          <div className="max-w-lg mb-4">
            <p className="text-3xl font-semibold mb-4">
              Benefits of {category.name} training
            </p>
            <p className="text-lg my-2">{category.description}</p>
          </div>
          <div className="w-full flex gap-6 justify-between flex-col items-center md:flex-row-reverse">
            <div className="flex-1 md:ml-12">
              {category.benefits.split(";").map((benefit) => (
                <div key={benefit} className="my-4 flex items-center">
                  <div className="h-2 w-2 bg-primary mr-2"></div>
                  <p className="text-lg font-semibold">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <Image
                src={`${process.env.BACKEND_URL}/${category.benefitsPhoto}`}
                alt={category.name}
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
          <HowItWorks />
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
