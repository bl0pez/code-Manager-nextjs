"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const isShowModal = searchParams.get("showModal");
  const { replace } = useRouter();

  const createUrl = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("showModal");
    return `${pathName}?${params.toString()}`;
  };

  return (
    <>
      <div
        onClick={() => replace(createUrl())}
        className={`fixed top-0 left-0 right-0 bottom-0 z-30 bg-gray-600/50 transition-all opacity-0 duration-300 ease-in-out backdrop-filter backdrop-blur-0 blur-sm ${
          isShowModal && "opacity-100"
        }`}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        {children}
      </div>
    </>
  );
}
