import Officer from "../models/Officer.js"; // assuming you have an Officer model

// Controller to get officer data by ID
export const getOfficerData = async (req, res) => {
  try {
    //const { _id } = req.params;
    const user = await Officer.findById('67508f8b4373fa8b63b2ae20');
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
