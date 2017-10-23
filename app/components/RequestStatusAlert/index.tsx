import * as React from 'react';
import { Alert } from 'antd';
import { INITIAL_REQUEST_STATUS, RequestStatus } from '../../reducers/common';

interface Props extends React.Props<any> { // tslint:disable-line
  requestStatus: RequestStatus;
  simple?: boolean;
  closeText?: string;
  onClose?: () => void;
}

const requestStatusAlert: React.SFC<Props> = (props: Props) => {
  const { requestStatus, closeText, onClose } = props;
  return (
    <div className="RequestStatusAlert">
      {
        requestStatus.statusCode ? (
          <Alert
            message={`${requestStatus.statusText}: (${requestStatus.statusCode})`}
            description={props.simple ? undefined : requestStatus.errorMessage}
            type="error"
            showIcon={true}
            closable={!!onClose}
            closeText={closeText ? closeText : 'Close'}
            onClose={onClose}
          />
        ) : ''
      }
    </div>
  );
};

requestStatusAlert.defaultProps = {
  requestStatus: INITIAL_REQUEST_STATUS,
  simple: false
};

export default requestStatusAlert;
