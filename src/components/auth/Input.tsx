type Props = {
  type: "text" | "password";
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};
const Input = (props: Props) => {
  return (
    <input
      {...props}
      required={props.required}
      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
            sm:text-sm sm:leading-6 mb-2"
    />
  );
};

export default Input;
