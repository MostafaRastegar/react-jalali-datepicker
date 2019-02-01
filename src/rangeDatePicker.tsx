import * as React from "react";
import * as moment from "jalali-moment";
import styled, { ThemeProvider } from "styled-components";
import MaskedInput from "react-text-mask";
import { Moment } from "jalali-moment";
import { formatJalaliDate } from "./utils";
import { daysInMonth, IDays } from "./utils/daysInMonth";
import { Days } from "./days";
import { Modal } from "./modal";
import * as Arrows from "./arrows";
import { defaultTheme, ITheme } from "./theme";
import { inputMask } from "./utils";
import {
  IRangeHelper,
  rangeHelper,
  makeRangeStatus,
} from "./utils/rangeHelper";

export interface IRangeDatePickerProps {
  start: string;
  end: string;
  ArrowLeft: React.ReactType;
  ArrowRight: React.ReactType;
  modalZIndex?: number;
  theme?: ITheme;
  weekend?: number[];
}

export interface IRangeDatePickerState {
  startDate: Moment;
  endDate: Moment;
  monthName?: string;
  days?: IDays[];
  rangeDays?: IRangeHelper;
  isOpenModal: boolean;
  isSelecting: boolean;
  rangeStatus: string;
  cloneDays: Moment;
}

const RangeDateDiv = styled.div`
  direction: rtl;
`;

export class RangeDatePicker extends React.Component<
  IRangeDatePickerProps,
  IRangeDatePickerState
> {
  public static defaultProps: Partial<IRangeDatePickerProps> = {
    start: moment().format("jYYYY/jMM/jDD"),
    end: moment().format("jYYYY/jMM/jDD"),
    modalZIndex: 9999,
    ArrowLeft: Arrows.ArrowLeftCMP,
    ArrowRight: Arrows.ArrowRightCMP,
    theme: defaultTheme,
    weekend: [6],
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: formatJalaliDate(props.start),
      endDate: formatJalaliDate(props.end),
      cloneDays: formatJalaliDate(props.start),
      monthName: "",
      days: [],
      isOpenModal: false,
      isSelecting: false,
      rangeStatus: "",
    };
  }

  public componentDidMount(): void {
    const { monthName, days } = daysInMonth(this.state.cloneDays);
    const { startDate: start, endDate: end } = this.state;
    const rangeDays = rangeHelper({ start, end });
    const rangeStatus = makeRangeStatus(start, end);
    this.setState(prevState => {
      return {
        days: [...prevState.days, ...days],
        monthName,
        rangeDays,
        rangeStatus,
      };
    });
  }

  public componentDidUpdate(
    prevProps: Readonly<IRangeDatePickerProps>,
    prevState: Readonly<IRangeDatePickerState>,
    snapshot?: any,
  ): void {
    if (
      !prevState.startDate.isSame(this.state.startDate) ||
      !prevState.endDate.isSame(this.state.endDate)
    ) {
      const { startDate: start, endDate: end } = this.state;
      const rangeDays = rangeHelper({ start, end });
      const rangeStatus = makeRangeStatus(start, end);

      this.setState({
        rangeDays,
        rangeStatus,
      });
    }
    if (!prevState.cloneDays.isSame(this.state.cloneDays)) {
      const { monthName, days } = daysInMonth(this.state.cloneDays);
      this.setState(prevSetState => {
        return {
          days: [...prevSetState.days.slice(prevSetState.days.length), ...days],
          monthName,
        };
      });
    }
  }

  public changeMonth = amount => {
    this.setState(prevState => {
      return {
        cloneDays: prevState.cloneDays.clone().add(amount, "month"),
      };
    });
  };
  public toggleModalOpen = () => {
    this.setState(prevState => {
      return {
        isOpenModal: !prevState.isOpenModal,
      };
    });
  };
  public changeStartDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate, disable } = (e.target as HTMLHtmlElement).dataset;
    if (!disable) {
      this.setState({
        isSelecting: !this.state.isSelecting,
        startDate: formatJalaliDate(fadate),
        endDate: formatJalaliDate(fadate).add(2, "day"),
      });
    }
    return {};
  };
  public changeEndDay = (e: React.SyntheticEvent<EventTarget>) => {
    const { fadate } = (e.target as HTMLHtmlElement).dataset;
    const { isSelecting } = this.state;
    if (isSelecting) {
      this.setState({
        endDate: formatJalaliDate(fadate),
      });
    }
  };
  public daysEventListeners = () => {
    const { isSelecting } = this.state;
    if (!isSelecting) {
      return {
        onClick: this.changeStartDay,
      };
    } else {
      return {
        onMouseOver: this.changeEndDay,
        onClick: this.endSelecting,
      };
    }
  };
  public endSelecting = () => {
    const { isSelecting } = this.state;

    if (isSelecting) {
      this.setState({
        isSelecting: false,
      });
    }
  };
  public changeInputValues = (
    e: React.ChangeEvent<HTMLInputElement>,
    start: boolean = true,
  ) => {
    const formattedValue = formatJalaliDate(e.target.value);
    if (start && formatJalaliDate(e.target.value)) {
      return this.setState({
        startDate: formatJalaliDate(e.target.value),
      });
    } else if (formattedValue && formattedValue.isAfter(this.state.startDate)) {
      return this.setState({
        endDate: formatJalaliDate(e.target.value),
      });
    }
    return null;
  };

  public render(): React.ReactNode {
    const { modalZIndex, ArrowRight, ArrowLeft, theme } = this.props;
    return (
      <RangeDateDiv>
        <MaskedInput
          className="rdp__input--start"
          data-testid="input-start"
          value={this.state.startDate.format("jYYYY/jMM/jDD")}
          onClick={this.toggleModalOpen}
          onChange={e => this.changeInputValues(e)}
          mask={inputMask}
        />
        <MaskedInput
          className="rdp__input--end"
          data-testid="input-end"
          value={this.state.endDate.format("jYYYY/jMM/jDD")}
          onChange={e => this.changeInputValues(e, false)}
          mask={inputMask}
        />
        <Modal
          isOpen={this.state.isOpenModal}
          toggleOpen={this.toggleModalOpen}
          modalZIndex={modalZIndex}
        >
          <Days
            days={this.state.days}
            monthName={this.state.monthName}
            rangeDays={this.state.rangeDays}
            rangeStatus={this.state.rangeStatus}
            daysEvent={this.daysEventListeners}
            holiday={this.props.weekend}
            theme={theme}
            isSelecting={this.state.isSelecting}
            ArrowLeft={ArrowLeft}
            ArrowRight={ArrowRight}
            increaseMonth={() => this.changeMonth(1)}
            decreaseMonth={() => this.changeMonth(-1)}
          />
        </Modal>
      </RangeDateDiv>
    );
  }
}
