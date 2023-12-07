export default function Home() {
  console.log("Home page render");

  return (
    <div>
      public home page
      {Array(100)
        .fill(0)
        .map((_, idx) => (
          <div key={idx}>Temp string</div>
        ))}
    </div>
  );
}
