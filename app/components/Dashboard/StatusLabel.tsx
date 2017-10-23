import * as React from 'react';
import { Orders } from '../../reducers';
import { Card } from 'antd';

interface Props {
  orders: Orders.State;
}

const statusLabel: React.SFC<Props> = (props: Props) => {
  const { loading, statusCode, statusText, lastUpdated } = props.orders.requestStatus;
  return (
    <div>
      <Card title="接单状态">
        <p>网络状态:{loading ? '连接中...' : statusCode ? statusText : '正常'}</p>
        <p>新增订单:{props.orders.acceptedOrders.length}</p>
        <p>最后更新时间:{lastUpdated.fromNow()}</p>
      </Card>
    </div>
  );
}

export default statusLabel;
