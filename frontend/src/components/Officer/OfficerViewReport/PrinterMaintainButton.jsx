import { BUTTON_MAINTAIN } from "../../../libs/constant";
import Button from "../../Button";

const PrinterMaintainButton = ({onClick}) => {
  return (
    <div className="flex justify-between text-[#957DAD]">
      {BUTTON_MAINTAIN.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          textColor={button.textColor}
          backgroundColor={'button.backgroundColor'}
          width={"60"}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
export default PrinterMaintainButton;
