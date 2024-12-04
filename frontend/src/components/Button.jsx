/* eslint-disable react/prop-types */
const Button = ({ title, backgroundColor, textColor, onClickFunction=()=>{} }) => {
  return (
    <button
      className={`py-2 rounded-[30px] bg-${backgroundColor} px-5 py-3 text-${textColor}`}
      onClick={onClickFunction}
    >
      {title}
    </button>
  );
};
export default Button;
