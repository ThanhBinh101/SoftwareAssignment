import { BUTTON_REFILL_PAPER } from "../../../libs/constant";
import Button from "../../Button";

const PrinterRefillPaperButton = () => {
  return (
    <div className="flex justify-between">
      {BUTTON_REFILL_PAPER.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          textColor={button.textColor}
          backgroundColor={'button.backgroundColor'}
          width={"60"}
        />
      ))}
    </div>
  );
};

export default PrinterRefillPaperButton;
