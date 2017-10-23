import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { Orders, StoreRootState } from '../../reducers';

interface OwnProps {
  orders: Orders.State;
  interval: number;     // interval in second
}

interface OwnDispatchProps {
  acceptOrders: () => void;
}

type Props = OwnProps & OwnDispatchProps;

interface State {
  timer?: any;
}

class OrderAccepter extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    interval: 10
  }

  componentDidMount() {
    const ms = this.props.interval * 1000;
    this.setState({ timer: setInterval(() => { this.props.acceptOrders(); }, ms) });
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    return <div className="OrderAccepter" />
  }
}

const mapStateToProps = (state: StoreRootState): Partial<OwnProps> => {
  return { orders: state.orders };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): OwnDispatchProps => {
  return { acceptOrders: () => dispatch(Orders.acceptOrders()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderAccepter);
