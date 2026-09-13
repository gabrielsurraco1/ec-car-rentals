import Header from "@/app/components/Header";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <p>Searching for available vehicles...</p>
      </main>
    </div>
  );
}
