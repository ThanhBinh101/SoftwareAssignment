const Input = ({ id, title, type, state, setState }) => {
  const handleChangeCopiesNumber = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="flex">
      <label htmlFor={id} className="flex-1">
        {title}
      </label>
      <input
        type={type}
        name=""
        id={id}
        value={state}
        className="flex-1 rounded-[16px] border-[1px] border-secondary bg-thirdary p-2"
        onChange={handleChangeCopiesNumber}
      />
    </div>
  );
};
export default Input;
