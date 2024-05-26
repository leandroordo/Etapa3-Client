export interface FormControlProps {
  inputType: string;
  label?: string;
  name: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  placeHolder?: string;
}

const FormControl = (props: FormControlProps) => {
  return (
    <>
      {props.label && (
        <label htmlFor={props.name}>
          {props.label}
          {props.required && "*"}
        </label>
      )}

      {props.inputType === "text" || props.inputType === "email" ? (
        <input
          type={props.inputType}
          name={props.name}
          id={props.name}
          className="form__control"
          required={props.required || false}
          pattern={props.pattern}
          minLength={props.minLength || 0}
          maxLength={props.maxLength || 1000}
          min={props.minValue || 0}
          max={props.maxValue || 100000000}
          placeholder={props.placeHolder || ""}
        />
      ) : props.inputType === "textarea" ? (
        <textarea
          name={props.name}
          id={props.name}
          className="form__control"
          required={props.required || false}
          minLength={props.minLength || 0}
          maxLength={props.maxLength || 1000}
          placeholder={props.placeHolder || ""}
        />
      ) : props.inputType === "imagefile" ? (
        <input
          type="file"
          name={props.name}
          id={props.name}
          className="form__control"
          required={props.required || false}
          accept="image/*"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default FormControl;
