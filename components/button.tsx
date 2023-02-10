type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  isDisabled?: boolean;
};

export default function Button({
  children,
  onClick,
  className,
  isDisabled = false,
}: Props) {
  return (
    <button
      className={`bg-indigo-200 font-semibold text-black p-2 rounded-md ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
