import { backendApi } from "@/backendApi";
import { getSpecialistDetailsAction } from "@/domain-logic/user/getSpecialistDetails";
import { notFound } from "next/navigation";
import Image from "next/image";
import ChoosePricing from "@/app/_components/ChoosePricing";
import { BookMeetingModal } from "./_components/BookMeetingModal";

export default async function Coach({
  params,
}: {
  params: { coachId: string };
}) {
  console.log("From Coach");

  const coachId = Number(params.coachId);

  if (Number.isNaN(coachId)) {
    notFound();
  }

  const coach = await getSpecialistDetailsAction(() =>
    backendApi.specialist.getSpecialistDetails({
      specialistId: coachId,
    }),
  );

  if (!coach) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center px-4 sm:px-24">
        <div className="w-full flex max-w-5xl gap-6 justify-between flex-col items-center md:flex-row">
          <div className="flex-1">
            <p className="text-4xl font-semibold py-4">{coach.name}</p>
            <p className="py-1">
              <q>{coach.description}</q>
            </p>
            {coach.specializations.length > 0 ? (
              <>
                <p className="text-xl mt-4 mb-2">Categories</p>
                <ul>
                  {coach.specializations.map((specialization) => (
                    <li key={specialization.id}>✔ {specialization.name}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <BookMeetingModal coachId={coachId} />
          </div>
          <div className="flex-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${coach.avatar}`}
              alt={coach.name}
              className="h-[600px] object-cover rounded-md ml-auto"
              width={400}
              height={600}
            />
          </div>
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
