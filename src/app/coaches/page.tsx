import { CoachesList } from "./_components/CoachesList";
import { Filters } from "./_components/Filters/Filters";
import { Suspense } from "react";
import { LoadingSkeleton } from "./_components/LoadingSkeleton";
import { Search } from "./_components/Search";
import { getSpecializationsAction } from "@/domain-logic/user/getSpecializations";
import { backendApi } from "@/backendApi";

export default async function Coaches(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("From Coaches");
  const categories = await getSpecializationsAction(() =>
    backendApi.specialization.get(),
  );

  return (
    <div className="w-full flex max-w-5xl" key={Math.random()}>
      {/* Math.random() is workaround required to force revalidate */}
      <div className="left min-w-[240px]">
        <Filters categories={categories} />
      </div>
      <div className="right w-full">
        <div className="mb-4">
          <Search />
        </div>
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <CoachesList searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
