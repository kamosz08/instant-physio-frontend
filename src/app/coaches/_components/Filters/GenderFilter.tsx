"use client";

import { calculateSearchQuery } from "@/utils/calculateSearchQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GENDERS = ["male", "female"];

export function GenderFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentGenders = searchParams.get("gender")
    ? searchParams.get("gender")!.split(",")
    : [];

  const isChecked = (gender: string) => {
    return currentGenders.includes(gender);
  };

  const toggleGender = (gender: string) => () => {
    const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
      key: "gender",
      value: gender,
    });

    router.push(`${pathname}?${newSearchQuery}`);
  };

  return (
    <div className="gender">
      <p className="text-lg font-semibold mb-4">Gender</p>
      {GENDERS.map((gender) => (
        <div className="form-control" key={gender}>
          <label className="label cursor-pointer justify-start">
            <input
              type="checkbox"
              checked={isChecked(gender)}
              onChange={toggleGender(gender)}
              className="checkbox checkbox-primary mr-2"
            />
            <span className="label-text capitalize">{gender}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
