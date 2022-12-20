import Citizen from "./Citizen";
/**
 * Global Variable to temporarily store Report Data
 */
const Report = {
  id: null,
  latitude: null,
  longitude: null,
  kindOfReport: null,
  pictureID: null,
  description: null,
  comment: null,
  status: null,
  citizen: Citizen,
};
export default Report;
