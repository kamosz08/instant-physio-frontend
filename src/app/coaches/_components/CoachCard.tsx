import Image from "next/image";
import Link from "next/link";

export function CoachCard({ coach }: { coach: any }) {
  return (
    <div className="mb-8 relative">
      <Image
        className="rounded-lg max-h-96 object-cover"
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${coach.avatar}`}
        width={300}
        height={400}
        alt={coach.name}
      />
      <p className="uppercase font-semibold mt-4">{coach.name}</p>
      <p className="mb-14 line-clamp-3">{coach.description}</p>
      <Link
        href={`/coaches/${coach.id}`}
        className="btn btn-outline btn-primary absolute right-0 bottom-0"
      >
        Show more
      </Link>
    </div>
  );
}
