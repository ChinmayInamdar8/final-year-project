interface props {
  label: string;
  OnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  OnEnter:(event: React.KeyboardEvent<HTMLButtonElement>)=>void
}

export function ButtonLogin({ label, OnClick, OnEnter }: props) {
  return (
    <div>
      <button className=" w-full rounded px-7 bg-green-600 py-2 text-white shadow hover:bg-green-500 mt-7" onClick={OnClick} onKeyDown={OnEnter}>
        {label}
      </button>
    </div>
  );
}
