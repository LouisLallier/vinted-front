const CustomInput = ({ title, type, state, setState, inputStyle }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor={title}>{title}</label>
      <input
        className="m-2 rounded-md border-2 border-gray-400 p-2"
        id={title}
        value={state}
        type={type}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
};

export default CustomInput;
