type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  isDisabled?: boolean;
  isInverted?: boolean;
};

export default function Button({
  children,
  onClick,
  className,
  isDisabled = false,
  isInverted = false,
}: Props) {
  return (
    <button
      className={`font-semibold p-2 rounded-md ${className} ${
        isInverted
          ? "bg-black text-indigo-200 ring-2 ring-indigo-200 ring-inset"
          : "bg-indigo-200 text-black"
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
