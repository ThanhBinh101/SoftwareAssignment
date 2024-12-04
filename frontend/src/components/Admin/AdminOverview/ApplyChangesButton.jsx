import { BUTTON_APPLY_CHANGES } from "../../../libs/constant";
import Button from "../../Button";

const ApplyChangesButton = () => {
  return (
    <div className="flex justify-between">
      {BUTTON_APPLY_CHANGES.map((button) => (
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
export default ApplyChangesButton;
