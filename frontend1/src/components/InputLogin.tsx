interface props {
  label: string;
  type: string;
  placeholder: string | undefined;
  OnChanage: (Event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputLogin({ label, type, OnChanage, placeholder }: props) {
  return (
    <div>
      <div>
        <p>{label}</p>
        <input
          type={type}
          name={type}
          id={type}
          placeholder={placeholder}
          className=" border-orange-600 border-2 rounded-md w-full py-1 pl-6 focus:outline-none mb-7 bg-transparent"
          onChange={OnChanage}
        />
      </div>
    </div>
  );
}
