
const AdminAvatar = ({ imageUrl, adminName, adminID }) => {
    return (
      <div className="w-[400px]">
        <div className="overflow-hidden w-full aspect-square rounded-[20px] mb-[10px]">
          <img
            className="w-full object-contain rounded-[20px] aspect-square"
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="font-bold text-[28px] text-center">
          <div className="mb-[1px]">{adminName}</div>
          <div className="text-secondary">
            ID: <span>{adminID}</span>
          </div>
        </div>
      </div>
    );
  };
  export default AdminAvatar;
  