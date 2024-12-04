/* eslint-disable react/prop-types */
const UserAvatar = ({ imageUrl, username, userId }) => {
  return (
    <div className="w-[400px]">
      <div className="overflow-hidden w-full aspect-square rounded-[20px] mb-[36px]">
        <img
          className="w-full object-contain rounded-[20px] aspect-square"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="font-bold text-[28px]">
        <div className="mb-[20px]">{username}</div>
        <div className="text-secondary">
          ID: <span>{userId}</span>
        </div>
      </div>
    </div>
  );
};
export default UserAvatar;
