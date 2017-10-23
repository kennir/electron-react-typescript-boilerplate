import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { withRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import { Auth, StoreRootState } from '../../reducers';
import HeaderMenuBar from '../../components/Header';
import LoginPage from '../../components/LoginPage';
import DashboardPage from '../../components/Dashboard';
const locationHelperBuilder = require('redux-auth-wrapper/history4/locationHelper');
const r = require('redux-auth-wrapper/history4/redirect');

const { Header, Content, Footer } = Layout;

const locationHelper = locationHelperBuilder.default({});

interface OwnProps extends React.Props<any>, RouteComponentProps<any> {
  auth: Auth.State;
}

const userIsAuthenticated = r.connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state: StoreRootState) => {
    const { auth: { token } } = state;
    // return (token !== undefined && token !== null && token.length > 0);
    return !!token;
  },
  wrapperDisplayName: 'UserIsAuthenticated'
});

const userIsNotAuthenticated = r.connectedRouterRedirect({
  redirectPath: (state: any, ownProps: any) => locationHelper.getRedirectQueryParam(ownProps) || '/', // tslint:disable-line
  allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: (state: StoreRootState) => {
    const { auth: { token } } = state;
    return (!token);
  },
  wrapperDisplayName: 'UserIsNotAuthenticated'
});

const wrappedLoginPage = userIsNotAuthenticated(LoginPage)
const wrappedDashboardPage = userIsAuthenticated(DashboardPage)

interface State { }

class Home extends React.Component<OwnProps, State> {
    render() {
        return (
          <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
              <HeaderMenuBar />
            </Header>
            <Content style={{ marginTop: 64, height: '80vh' }}>
              <Switch>
                <Route path="/login" component={wrappedLoginPage} />
                <Route path="/" component={wrappedDashboardPage} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <p style={{fontWeight: 'bold'}}>fresca.club copyright 2017</p>
            </Footer>
          </Layout>
        )
    }
}

const mapStateToProps = (state: StoreRootState) => {
  return { auth: state.auth };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
