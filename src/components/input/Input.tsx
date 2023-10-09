import { InputTypes } from "./Input.types";

export const Input = (props: InputTypes) => {
  return (
    <input
      type={props?.type}
      id={props?.id}
      className={`bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none ${props.className}`}
      placeholder={props?.placeholder}
      required={props?.required}
      value={props?.value}
      onChange={props?.onChange}
    />
  );
};
