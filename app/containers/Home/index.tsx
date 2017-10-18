import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

interface OwnProps extends React.Props<any>, RouteComponentProps<any> {
    
}

interface State { }

class Home extends React.Component<OwnProps, State> {
    render() {
        return <div>Hello home</div>
    }
}

export default withRouter(Home);