// category box w labels that's used throughout the app
"use client";
//25527

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  //function for labels/categories

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    // styling for icons
    <div
      onClick={handleClick}
      className={`flex flex-col
    items-center justify-center gap-2 p-3
    border-b-2
    hover:text-neutral-800
    transition cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
`}
    >
      <Icon size={26} />
      {/* styling for labels */}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
