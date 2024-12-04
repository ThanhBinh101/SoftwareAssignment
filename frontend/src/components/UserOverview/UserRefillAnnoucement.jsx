/* eslint-disable react/prop-types */
const UserRefillAnnoucement = ({remainingDay, refillDate}) => {
  return (
    <div>
      Next refill in
      <span className="font-bold mx-3">{remainingDay} days</span>(
      <span className="text-secondary mr-1">{refillDate}</span>)
    </div>
  );
};
export default UserRefillAnnoucement;
