import moment from "moment";
const getVideoId = (url: any) => {
  var id = "";
  if (url != undefined) {
    if (url) {
      id = url.split("v=")[1];
      if (id != null) {
        if (id.includes("&")) {
          return id.split("&")[0];
        } else {
          return id;
        }
      }
    }
  }
};

const trimText = (desc: string) => {
  if (desc == null) return "Details Not Available";
  let newDesc = desc.split(" ");
  if (newDesc.length < 8) return desc;
  let res = "";
  for (let i = 0; i <= 12 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};

const trimName = (desc: string) => {
  let newDesc = desc.split(" ");
  if (newDesc.length <= 2) return desc;
  let res = "";
  for (let i = 0; i <= 2; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};
const trimDate = (num: any) => {
  var str = `${num}`;
  var sliced = str.slice(0, 10);
  return sliced;
};
const calcValidity = (num: any) => {
  var str = `${num}`;
  var sliced = str.slice(0, 10);
  return sliced;
};
const enrollTrimText = (desc: string) => {
  let newDesc = desc.split(" ");
  let res = "";
  for (let i = 0; i <= 9 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  if (newDesc.length <= 10) return res;
  return res + "...";
};
const enrollTrimTextName = (desc: string) => {
  let newDesc = desc.split(" ");
  if (newDesc.length < 3) return desc;
  let res = "";
  for (let i = 0; i <= 3 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};
const checkArrayIsEmpty = (arr: []) => {
  let count = 0;
  for (let key in arr) {
    count++;
  }
  return count > 0 ? false : true;
};
let options_: any = {
  observe: "response",
  responseType: "blob",
  headers: {
    Accept: "text/plain",
    "Abp-TenantId": "1",
  },
};
const timerStart = (duration: any) => {
  var startTime = moment().subtract("5", "hours").subtract("30", "minutes");
  var endTime = userMockTestSection?.creationTime;
  var endTime = endTime?.add("second", duration * 60);
  var timer = endTime.diff(startTime, "milliseconds");
  // console.log(this.timer, this.userMockTestSection);
  return timer;
};
export {
  getVideoId,
  trimName,
  trimText,
  trimDate,
  calcValidity,
  enrollTrimText,
  enrollTrimTextName,
  checkArrayIsEmpty,
  options_,
};
