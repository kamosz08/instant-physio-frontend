import { specializationApi } from "@/backendApi/specialization";
import { getSpecializationsAction } from "@/domain-logic/user/getSpecializations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getSpecializationsAction(() =>
    specializationApi.get(),
  );

  return categories.map((category) => ({
    category: category.name,
  }));
}

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const categories = await getSpecializationsAction(() =>
    specializationApi.get(),
  );

  const category = categories.find(
    (cat) => cat.name === decodeURI(params.category),
  );

  if (!category) {
    notFound();
  }

  return <div>Category {category.name}</div>;
}
