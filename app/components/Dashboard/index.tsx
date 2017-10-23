import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { withRouter } from 'react-router-dom';
import { Orders, StoreRootState } from '../../reducers';
import OrderAccepter from '../OrderAccepter';
import StatusLabel from './StatusLabel';

interface OwnProps {
  orders: Orders.State;
}

type Props = OwnProps & RouteComponentProps<any>;

interface State {

}

class Dashboard extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <OrderAccepter />
        <StatusLabel orders={this.props.orders} />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreRootState): OwnProps => {
  return { orders: state.orders };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return { };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
