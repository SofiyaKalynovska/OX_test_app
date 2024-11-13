import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

interface TextAreaFormFieldProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const TextAreaFormField = <T extends FieldValues>({
  label,
  id,
  placeholder,
  register,
  errors,
}: TextAreaFormFieldProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        {...register(id)} 
      />
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors[id]?.message === "string"
            ? errors[id]?.message
            : "Error occurred"}
        </p>
      )}
    </div>
  );
};

export default TextAreaFormField;
