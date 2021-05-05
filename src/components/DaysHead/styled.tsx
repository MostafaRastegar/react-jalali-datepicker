import styled from "../../theme";

export const DaysHeadContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: ${8 / 16}rem;
  background-color: ${props => props.theme.headBackColor};
  min-height: 92px;

  @media (min-width: 768px) {
    padding-top: 1rem;
    min-height: 114px;
  }
`;
export const HeadTitle = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${8 / 16}rem;
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.headTitleColor};

  svg {
    fill: ${props => props.theme.headTitleColor};
  }
  @media (min-width: 768px) {
    font-size: 1.618rem;
  }
`;

export const HeadRange = styled("div")`
  border-bottom: 1px solid #ccc;
  width: 100%;
  text-align: center;
  div {
    margin: 0.5rem 0;
    font-size: 13px;
    color: ${props => props.theme.headRangeColor};
    font-weight: 300;
  }
`;

export const TimeTitle = styled("h3")`
  direction: ltr;
  font-size: 2.25rem;
  color: ${props => props.theme.headTimeTitleColor};

  @media (min-width: 768px) {
    font-size: 2.618rem;
  }
`;
