export function Success() {
  return (
    <div>
      <div className="text-green-500 flex items-center justify-center my-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="ml-4">Your session with coach has been booked!</p>
      </div>
    </div>
  );
}
