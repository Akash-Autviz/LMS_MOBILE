import axios from "axios";
// import * as SecureStore from "expo-secure-store";
import { baseUrl } from "../../utils";
// const access_token = SecureStore.getItemAsync("access_token");
// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", access_token);

const getSyllabus = async (access_token: string) => {
  let headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Abp-TenantId": "1",
  };
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/services/app/SubjectService/GetAll`,
      headers
    );
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", data);
    let filterData = data.result.items.map((e: any) => {
      return e;
    });
    return filterData;
  } catch (error) {
    console.log();
  }
};
export { getSyllabus };
