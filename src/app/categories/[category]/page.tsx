import { backendApi } from "@/backendApi";
import { getSpecializationsAction } from "@/domain-logic/user/getSpecializations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  console.log("From generateStaticParams(Category)");
  const categories = await getSpecializationsAction(() =>
    backendApi.specialization.get(),
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
  console.log("From Category");
  const categories = await getSpecializationsAction(() =>
    backendApi.specialization.get(),
  );

  const category = categories.find(
    (cat) => cat.name === decodeURI(params.category),
  );

  if (!category) {
    notFound();
  }

  return <div>Category {category.name}</div>;
}
