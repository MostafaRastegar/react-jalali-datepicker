import * as moment from "jalali-moment";

export const fa = n => {
  if (process.env.NODE_ENV === "test") {
    return n;
  }
  return Number(n).toLocaleString("fa", {
    useGrouping: false,
  });
};

// prettier-ignore
export const inputFaDateMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/];
// prettier-ignore
export const inputFaDateWithTimeMask = [/[0-1]/,/[0-4]/,/[0-9]/,/[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, ' ','-',' ', /[0-2]/,/[0-9]/, ':', /[0-5]/,/[0-9]/];
export const formatDateTime = "jYYYY/jMM/jDD - HH:mm";
export const formatDate = "jYYYY/jMM/jDD";
// week days name
export const weekDayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
// format jalali string date into moment
export const formatJalaliDate = date => {
  const formattedDate = moment(`${date}`, "jYYYY/jMM/jDD");
  formattedDate['timestamp'] = moment(`${date}`, "jYYYY/jMM/jDD").format('x')
  if (formattedDate.isValid()) {
    return formattedDate;
  }
  return null;
};
