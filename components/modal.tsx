type Props = {
  header: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ header, children, onClose }: Props) {
  return (
    <>
      <div
        className="fixed w-screen h-screen left-0 top-0 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed w-64 h-80 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border-2 border-indigo-200 p-4 flex flex-col justify-between bg-black">
        <header className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{header}</h3>
          <button className="text-3xl leading-4" onClick={onClose}>
            ×
          </button>
        </header>
        {children}
      </div>
    </>
  );
}
