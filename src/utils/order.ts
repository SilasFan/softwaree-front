import request from './request';

interface Order {
    id?: number;
    acceptTime?: string | null;
    attachedInfo?: string | null;
    chipAmount?: number;
    chipType?: string;
    createTime?: string | null;
    edafileLocation?: string;
    produceProgress?: string | null;
    tallyTime?: string | null;
    customerID?: number | null;
}

interface OrderInfo {
    accept?: string | null;
    ordered?: string | null;
    produce?: string | null;
    ship?: string | null;
    tally?: string | null;
}

function parseOrderInfo(info: string) {
    const orderInfo: OrderInfo = {};
    const filterStr = info.substring(10, info.lastIndexOf('}'));
    const strArray = filterStr.trim().split(',');
    orderInfo.ordered = strArray[0].split('=')[1];
    orderInfo.accept = strArray[1].split('=')[1];
    orderInfo.produce = strArray[2].split('=')[1];
    orderInfo.ship = strArray[3].split('=')[1];
    orderInfo.tally = strArray[4].split('=')[1];
    return orderInfo;
}

export { Order, OrderInfo, parseOrderInfo };
