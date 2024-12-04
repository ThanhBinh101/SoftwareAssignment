import { BUTTON_TURNOFF_PRINTER } from "../../../libs/constant";
import Button from "../../Button";

const TurnOffPrinterButton = ({onClick}) => {
  return (
    <div className="flex justify-between bg-[#A68BC1]" >
      {BUTTON_TURNOFF_PRINTER.map((button) => (
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

export default TurnOffPrinterButton;
