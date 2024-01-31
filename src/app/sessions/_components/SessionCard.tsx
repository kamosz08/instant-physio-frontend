import { MySession } from "@/domain-logic/authUser/getMyUpcomingSessions";
import { format, isAfter } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const formatDisplayTime = (dateStr: string) => {
  return format(new Date(dateStr), "HH:mm");
};

const formatDisplayDate = (dateStr: string) => {
  return format(new Date(dateStr), "dd.MM.yyyy");
};

const getAvatarSrc = (avatarUrl: string | null) => {
  if (avatarUrl) return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${avatarUrl}`;
  return "/default-avatar.png";
};

const isFuture = (dateStr: string) => {
  return isAfter(new Date(dateStr), new Date());
};

const getColorBasedOnStatus = (status: MySession["status"]) => {
  switch (status) {
    case "accepted":
      return "green-500";
    case "denied":
      return "red-500";
    case "invited":
      return "yellow-500";
    default:
      break;
  }
};

export function SessionCard({ session }: { session: MySession }) {
  return (
    <div
      className={`border-l-4 rounded-md border-${getColorBasedOnStatus(
        session.status,
      )} w-full shadow mt-4 p-2 flex items-center justify-evenly h-20`}
    >
      <div className="text-center">
        <p className="font-semibold text-lg">
          {formatDisplayTime(session.date)}
        </p>
        <p className="text-xs text-gray-500">
          {formatDisplayDate(session.date)}
        </p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="flex items-center">
        <Image
          src={getAvatarSrc(session.coach.avatar)}
          alt={session.coach.name}
          className="object-cover w-16 h-16 object-top rounded-full hidden md:block"
          width={100}
          height={130}
        />
        <Link href={`/coaches/${session.coach.id}`} className="ml-2">
          {session.coach.name}
        </Link>
      </div>
      <div className="divider divider-horizontal hidden sm:block"></div>
      <div className="text-center hidden sm:block">
        <p
          className={`capitalize bg-${getColorBasedOnStatus(
            session.status,
          )}  py-1 px-2 text-sm`}
        >
          {session.status}
        </p>
        <p className="text-xs text-gray-500">60 minutes</p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div>
        <button
          className="btn btn-error btn-sm btn-ghost text-red-500"
          disabled={!isFuture(session.date) || session.status === "denied"}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
