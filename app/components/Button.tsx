export const Button = ({ color = "blue", children, onClick }: { color?: "gray" | "yellow" | "blue"; children: React.ReactNode; onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`w-60 p-4 rounded-2xl text-lg font-semibold hover:scale-105 duration-500 ease-in-out transform cursor-pointer ${
        color === "gray" ? "bg-[var(--color-gray-light)]" : color === "yellow" ? "bg-[var(--color-yellow-soft)]" : "bg-[var(--color-blue-light)]"
      }`}
    >
      {children}
    </button>
  );
};
