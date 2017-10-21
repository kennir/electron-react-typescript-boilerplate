import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { withRouter } from 'react-router-dom';
import { Orders, StoreRootState } from '../../reducers';


interface OwnProps extends React.Props<any>, RouteComponentProps<any> {
  orders: Orders.State;
}

interface State {

}

class OrderTable extends React.Component<OwnProps, State> {
  render() {
    return (
      <div>
        order table
      </div>
    );
  }
}

const mapStateToProps = (state: StoreRootState) => {
  return { orders: state.orders };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTable));
