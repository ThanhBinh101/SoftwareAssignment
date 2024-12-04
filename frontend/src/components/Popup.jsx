import { IoWarningOutline } from "react-icons/io5";
import Button from "./Button";
import { useAppContext } from "../hooks/useAppContext";
import { WARNING_FILE, WARNING_PAPER } from "../libs/constant";

const Popup = () => {
  const { popupType, popupMessage, setIsOpenPopup } = useAppContext();

  let actionButton = "";
  if (popupMessage === WARNING_PAPER) {
    actionButton = "Buy more";
  } else if (popupMessage === WARNING_FILE) {
    actionButton = "Try again";
  }

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="inline-flex flex-col items-center rounded-[30px] bg-secondary px-[80px] py-[60px] text-white">
        {popupType === "error" ? (
          <IoWarningOutline className="mb-[30px] text-[100px]" />
        ) : (
          <></>
        )}
        <div className="mb-[30px] text-[36px] font-bold">{popupMessage}</div>
        <div className="grid grid-cols-2 gap-10 text-[30px]">
          <Button
            title={"Cancel"}
            backgroundColor={"thirdary"}
            textColor={"secondary"}
            onClickFunction={() => setIsOpenPopup(false)}
          />
          <Button
            title={actionButton}
            backgroundColor={"success"}
            textColor={"white"}
          />
        </div>
      </div>
    </div>
  );
};
export default Popup;
