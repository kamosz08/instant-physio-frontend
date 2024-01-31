import { CoachCard } from "./CoachCard";
import { Pagination } from "./Pagination";
import queryString from "query-string";
import { getSpecialistsAction } from "@/domain-logic/user/getSepcialists";
import { backendApi } from "@/backendApi";

export async function CoachesList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const stringifiedSearchParams = queryString.stringify(searchParams);

  const specialists = await getSpecialistsAction(() =>
    backendApi.specialist.getAll(stringifiedSearchParams),
  );

  if (specialists.data.length === 0)
    return (
      <div className="w-full flex justify-center">
        <p className="text-lg text-neutral-500 my-12">No data found</p>
      </div>
    );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {specialists.data.map((coach, idx) => (
          <CoachCard key={idx} coach={coach} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Pagination isLast={specialists.isLast} />
      </div>
    </div>
  );
}
