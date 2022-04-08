import axios from "axios";

export const HttpService = async (type, url, body) => {
  if (type && url && body) {
    const res = await axios({
      method: type,
      url: url,
      data: body,
      headers: {},
    });
    if (res?.status === 200) {
      return res;
    } else {
      return {
        error: "Something went wront",
      };
    }
  }
};
