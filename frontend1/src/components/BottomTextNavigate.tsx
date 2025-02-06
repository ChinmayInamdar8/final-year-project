import { useNavigate } from "react-router-dom";

interface props {
  label: string;
  to: string;
  where: string;
}

export function BottomTextNavigate({ label, to, where }: props) {
    const navigate = useNavigate();
  return (
    <div className="mb-2">
      <p className="text-center mt-1">
        {label}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => {
            navigate(where);
          }}
        >
          {to}
        </span>
      </p>
    </div>
  );
}
