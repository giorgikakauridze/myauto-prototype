"use client";

import ContainerWrapper from "@/components/wrapper/container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ContainerWrapper>
      <div className="flex py-10 flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">შეცდომა მოხდა</h1>
        <p className="mt-2 text-sm text-gray-500">
          გვერდის ჩატვირთვისას შეცდომა მოხდა
        </p>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 rounded-md bg-primary text-white text-sm hover:opacity-90 transition"
        >
          თავიდან ცდა
        </button>
      </div>
    </ContainerWrapper>
  );
}
