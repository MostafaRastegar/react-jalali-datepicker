import styled from "../../theme";
import { IDayProps } from "./types";

export const NormalDay = styled("li")<IDayProps>`
  text-align: center;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  border-radius: 5px;
  color: ${props =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.daysColor};
  background-color: ${props =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.daysBackColor};
`;

export const HolidayDay = styled(NormalDay)`
  color: ${props =>
    props.selectedDay ? props.theme.selectDayColor : props.theme.holidaysColor};
  background-color: ${props =>
    props.selectedDay
      ? props.theme.selectDayBackColor
      : props.theme.holidaysBackColor};
`;

export const StartEndRangeDay = styled(NormalDay)<IDayProps>`
  color: ${props => props.theme[`${props.startEndRange.status}Color`]};
  background-color: ${props =>
    props.theme[`${props.startEndRange.status}BackColor`]};
  z-index: ${props => props.startEndRange.status === "continueRange" && 100};
  ${props =>
    props.startEndRange.status === "startRange" &&
    `
    border-radius: 0 ${props.theme.daysRound} ${props.theme.daysRound} 0;
    `};
  ${props =>
    props.startEndRange.status === "endRange" &&
    `
      border-radius: ${props.theme.daysRound} 0 0 ${props.theme.daysRound};
    `};
`;
