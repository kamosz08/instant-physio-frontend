import { CoachCard } from "./CoachCard";
import { waitFor } from "@/utils/waitFor";
import { Pagination } from "./Pagination";
import queryString from "query-string";
import { getSpecialistsAction } from "@/domain-logic/user/getSepcialists";
import { specialistApi } from "@/backendApi/specialist";

export async function CoachesList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const stringifiedSearchParams = queryString.stringify(searchParams);

  const specialists = await getSpecialistsAction(() =>
    specialistApi.get(stringifiedSearchParams),
  );

  //TOOD: Remove wait and concating
  await waitFor(1000);

  const tempCoaches = specialists.data
    .concat(specialists.data)
    .concat(specialists.data)
    .concat(specialists.data)
    .concat(specialists.data);
  if (specialists.data.length === 0)
    return (
      <div className="w-full flex justify-center">
        <p className="text-lg text-neutral-500 my-12">No data found</p>
      </div>
    );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tempCoaches.map((coach, idx) => (
          <CoachCard key={idx} coach={coach} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}
