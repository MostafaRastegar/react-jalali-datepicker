import * as styledComponents from "styled-components";
import { IDatePickerTheme, IRangeDatePickerTheme, styledThemes } from "./types";

export const defaultRangeTheme: IRangeDatePickerTheme = {
  backColor: "#FFFFFF",
  // head
  headBackColor: "#FFFFFF",
  headTitleColor: "rgb(28,28,28)",
  headArrowColor: "#000",
  headRangeBackColor: "#D6D6D6",
  headRangeColor: "rgb(150,150,150)",

  // weekdays color
  weekDaysColor: "rgb(120,120,120)",

  // days
  daysColor: "#000",
  daysBackColor: "#FFFFFF",
  holidaysColor: "rgb(190,85,85)",
  holidaysBackColor: "#FFFFFF",
  daysRound: "5px",

  // start end
  startRangeBackColor: "rgb(0,135,224)",
  endRangeBackColor: "rgb(0,135,224)",
  startRangeColor: "#fff",
  endRangeColor: "#fff",
  continueRangeBackColor: "rgb(239,246,255)",
  continueRangeColor: "#000",
  sameRangeBackColor: "#fff",
  sameRangeColor: "rgb(33,213,176)",

  // buttons
  submitBackColor: "#D6D6D6",
  submitHoverBackColor: "#f3f3f3",
  submitColor: "#000",
  submitHoverColor: "#000",
  cancelBackColor: "#fff",
  cancelHoverBackColor: "#D6D6D6",
  cancelColor: "#000",
  cancelHoverColor: "#000",
};

export const defaultDatePickerTheme: IDatePickerTheme = {
  backColor: "#FFFFFF",
  // head
  headBackColor: "#FFFFFF",
  headTitleColor: "#aeaeae",
  headTimeTitleColor: "#617fdf",
  headArrowColor: "#000",
  headRangeBackColor: "#D6D6D6",
  headRangeColor: "#000",

  // weekdays color
  weekDaysColor: "#3F3F3F",

  // days
  daysColor: "#000",
  daysBackColor: "#FFFFFF",
  holidaysColor: "#edb53b",
  holidaysBackColor: "#FFFFFF",

  selectDayColor: "#fff",
  selectDayBackColor: "#617fdf",

  // buttons
  submitBackColor: "#D6D6D6",
  submitHoverBackColor: "#f3f3f3",
  submitColor: "#000",
  submitHoverColor: "#000",
  cancelBackColor: "#fff",
  cancelHoverBackColor: "#D6D6D6",
  cancelColor: "#000",
  cancelHoverColor: "#000",
  changeViewButtonBackColor: "#D6D6D6",
  changeViewButtonHoverBackColor: "#fff",
  changeViewButtonColor: "#000",
  changeViewButtonHoverColor: "#617fdf",
  // time
  timeBackColor: "#f0f0f0",
  timeNumberColor: "#000",
  handBackColor: "#617fdf",
  handCircleColor: "#617fdf",
  selectedNumberColor: "#fff",
};

const {
  default: styled,
  ThemeProvider,
  keyframes,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  styledThemes
>;

export { ThemeProvider, keyframes };
export default styled;
