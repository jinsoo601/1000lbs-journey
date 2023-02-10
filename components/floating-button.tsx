type Props = {
  children: string;
  onClick: () => void;
};

export default function FloatingButton({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 right-0 bg-indigo-200 font-semibold text-black p-2 rounded-md"
    >
      {children}
    </button>
  );
}
