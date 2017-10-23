import * as React from 'react';
import { Action } from 'redux';
import { connect, Dispatch, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { StoreRootState, Auth } from '../../reducers';
import LoginForm from './form';
import RequestStatusAlert from '../RequestStatusAlert';

interface OwnProps {
  auth: Auth.State;
}

interface OwnDispatchProps extends DispatchProp<any> {
  onSubmit: (payload: {}) => void;
}

type Props = OwnProps & OwnDispatchProps & RouteComponentProps<any>;

const loginPage: React.SFC<Props> = (props: Props) => {
  const { username, password, requestStatus } = props.auth;
  return (
    <div>
      <RequestStatusAlert requestStatus={requestStatus} />
      <LoginForm
        username={username}
        password={password}
        requestStatus={requestStatus}
        onSubmit={props.onSubmit}
      />
    </div>
  )
}

const mapStateToProps = (state: StoreRootState): OwnProps => {
  return { auth: state.auth };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): OwnDispatchProps => {
  return { onSubmit: (payload: any) => dispatch(Auth.login(payload)) };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginPage));
