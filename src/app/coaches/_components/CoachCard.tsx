import Image from "next/image";

export function CoachCard({ coach }: { coach: any }) {
  return (
    <div className="mb-8 relative">
      <Image
        // src={coach.avatar}
        className="rounded-lg max-h-96 object-cover"
        src={"http://localhost:8000/uploads/male-1.jpg"}
        width={300}
        height={400}
        alt={coach.name}
      />
      <p className="uppercase font-semibold mt-4">{coach.name}</p>
      <p className="mb-14">{coach.description}</p>
      <button className="btn btn-outline btn-primary block absolute right-0 bottom-0">
        Show more
      </button>
    </div>
  );
}
