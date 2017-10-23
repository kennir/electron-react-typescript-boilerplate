import * as React from 'react';
import { Form, Row, Col, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { RequestStatus } from '../../reducers/common';


interface OwnProps {
  username?: string;
  password?: string;
  requestStatus: RequestStatus;
  onSubmit: (payload: {}) => void;
}

interface State {}

class LoginForm extends React.Component<OwnProps & FormComponentProps, State> {
  handleSubmit = (e: React.SyntheticEvent<{}>) => {
    const { form: {validateFieldsAndScroll} } = this.props;
    e.preventDefault();

    validateFieldsAndScroll((err: any, values: any) => {  // tslint:disable-line
      if (err) { return; }
      const payload = {
        username: values.username,
        password: values.password
      };

      this.props.onSubmit(payload);
    });
  }

  render() {
    const { username, password, requestStatus, form: { getFieldDecorator } } = this.props;
    const { loading } = requestStatus;
    return (
      <div style={{ margin: '10vh' }}>
        <Row type="flex" align="middle" justify="center">
          <Col>
          <Form onSubmit={this.handleSubmit}>
              <Form.Item hasFeedback={true}>
                {
                  getFieldDecorator('username', {
                    rules: [
                      { required: true, message: '请填写用户名' },
                      { type: 'string', pattern: /^[a-zA-Z0-9]+$/, message: '必须为英文字母或者数字' },
                      { min: 2, max: 8, message: '长度必须在2-8位之间' },
                    ],
                    initialValue: username
                  })(<Input addonBefore={<Icon type="user" />} placeholder="输入用户名"/>)
                }
              </Form.Item>
              <Form.Item hasFeedback={true}>
                {
                  getFieldDecorator('password', {
                    rules: [
                      { required: true, message: '请填写密码' },
                      { type: 'string', pattern: /[A-Za-z0-9@#$%^&+=]{4,}/, message: '密码必须为字母或者数字，长度不低于4位'}
                    ],
                    initialValue: password
                  })(<Input addonBefore={<Icon type="lock" />} type="password" placeholder="输入密码" />)
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" loading={loading} htmlType="submit" style={{ width: '100%' }}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}



export default Form.create()(LoginForm);
