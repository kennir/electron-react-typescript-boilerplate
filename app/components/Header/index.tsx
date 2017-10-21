import * as React from 'react';
import { Menu } from 'antd';

const MenuItem = Menu.Item;

interface OwnProps extends React.Props<any> {

}

const headerItem: React.SFC<OwnProps> = (props: OwnProps) => {
  return (
    <div>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px'}}>
        <MenuItem key="orders">订单</MenuItem>
      </Menu>
    </div>
  )
};

export default headerItem;

