import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
const cookies = new Cookies();

const getuserdata = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  let devtechusercookie = cookies.get("devtechusercookie");
  let bytes = CryptoJS.AES.decrypt(data, devtechusercookie);
  let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalText;
};

export { getuserdata };
