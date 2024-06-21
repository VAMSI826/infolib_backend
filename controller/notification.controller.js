import Notif from "../model/notification.model.js";

export const getnotif = async (req, res) => {
  try {
    const notif = await Notif.find();
    res.status(200).json(notif);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
};
