import Button from "./button";

type Props = {
  children: string;
  onClick: () => void;
  isDisabled?: boolean;
};

export default function FloatingButton({
  children,
  onClick,
  isDisabled,
}: Props) {
  return (
    <Button
      onClick={onClick}
      className="absolute bottom-4 right-0"
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
