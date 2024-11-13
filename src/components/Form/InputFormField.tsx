import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

interface InputFormFieldProps<T extends FieldValues> {
  label: string;
  type: string;
  id: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const InputFormField = <T extends FieldValues>({
  label,
  type,
  id,
  placeholder,
  register,
  errors,
}: InputFormFieldProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        {...register(id)} 
      />
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors[id]?.message === "string"
            ? errors[id]?.message
            : 
              "Error occurred"}
        </p>
      )}
    </div>
  );
};

export default InputFormField;
