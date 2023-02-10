import Button from "./button";

type Props = {
  children: string;
  onClick: () => void;
};

export default function FloatingButton({ children, onClick }: Props) {
  return (
    <Button onClick={onClick} className="absolute bottom-4 right-0">
      {children}
    </Button>
  );
}
