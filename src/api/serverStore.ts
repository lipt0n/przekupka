import BigNumber from 'bignumber.js'
export interface  ITradeVars {
    buyHighlyNotProfitable?: boolean
    sellHighlyNotProfitable?: boolean
    highlyNotProfitable?: boolean
    processData?: {
      buy:boolean 
      sell:boolean
    }
    buy : boolean
    sell : boolean
    lastTrasnactionPrice?:BigNumber
    highest : BigNumber
    lowest :  BigNumber
    lastTransactions:  ('b' | 's')[]
    wait:number
    lastTransactionId:string
    noAssetsToSell?:boolean
    cantAffordToBuy?:boolean
    limitBuyPerHourReached?:boolean

  }
export interface IPair {
  changeToTrend:BigNumber
  changeToChangeTrend:BigNumber
  persuadeToBalance:number
  volume:BigNumber
  active:boolean,
  coin0:string,
  coin1:string,
  profit:BigNumber,
  buyPerHour:number
  coin0FriendlyName?:string
  coin1FriendlyName?:string
}
  interface closedTransactions {
    refid: string;
    userref: number;
    status: string;
    reason?: unknown;
    opentm: number;
    closetm: number;
    starttm: number;
    expiretm: number;
    descr: Descr;
    vol: string;
    vol_exec: string;
    cost: string;
    fee: string;
    price: string;
    stopprice: string;
    limitprice: string;
    misc: string;
    oflags: string;
  }
  
  interface Descr {
    pair: string;
    type: string;
    ordertype: string;
    price: string;
    price2: string;
    leverage: string;
    order: string;
    close: string;
  }
  interface IMsg {
    timestamp: number,
    msg:string
  }

interface IStore {
    tradeVars:{[pair:string]:ITradeVars}
    assetPairs:{[pair:string]: {
        altname: string;
        wsname: string;
        aclass_base: string;
        base: string;
        aclass_quote: string;
        quote: string;
        lot: string;
        pair_decimals: number;
        lot_decimals: number;
        lot_multiplier: number;
        leverage_buy: any[];
        leverage_sell: any[];
        fees: number[][];
        fees_maker: number[][];
        fee_volume_currency: string;
        margin_call: number;
        margin_stop: number;
        ordermin: string;
      }}
      balance:{
        [coin:string]:string
    }
    toSell:{
      [pair:string]:{
        value:BigNumber
        id:string
        timestamp:number
      }[]
    }
    pairs:{
        [pair:string]:IPair
    }
    ticks:{
        timestamp: number;
        pairs:{
                [pair:string]: {
                    a: string[]
                    b: string[]
                    c: string[]
                    v: string[]
                    p: string[]
                    t: number[]
                    l: string[]
                    h: string[]
                    o: string
                }
            }
    }[]
    closedTransactions:{
      [key:string]:closedTransactions
    }
  tradeBalance:{
    eb:string // = equivalent balance (combined balance of all currencies)
    tb:string // = trade balance (combined balance of all equity currencies)
    m:string // = margin amount of open positions
    n:string // = unrealized net profit/loss of open positions
    c:string // = cost basis of open positions
    v:string // = current floating valuation of open positions
    e:string // = equity = trade balance + unrealized net profit/loss
    mf:string // = free margin = equity - initial margin (maximum margin available to open new positions)
    ml:string // = margin level = (equity / initial margin) * 100
  }
}
export const createStore = (): IStore => ({
  tradeBalance: {
    eb: '',
    tb: '',
    m: '',
    n: '',
    c: '',
    v: '',
    e: '',
    mf: '',
    ml: '',
  },
  tradeVars: {},
  assetPairs: {},
  balance: {},
  closedTransactions: {},
  ticks: [],
  toSell: {},
  pairs: {
    XXBTZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 2,
      volume: new BigNumber('0.002'), // min 0.001
      active: true,
      coin0: 'XXBT',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2, // limit if allready not sold buys are present
      coin0FriendlyName: 'BTC',
      coin1FriendlyName: 'USD'
    },
    XETHZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1.8,
      volume: new BigNumber('0.05'), // min 0.02
      active: true,
      coin0: 'XETH',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'USD'
    },
    NANOUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1.2,
      volume: new BigNumber('30'), // min 10
      active: true,
      coin0: 'NANO',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'NANO',
      coin1FriendlyName: 'USD'
    },
    XXRPZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 2,
      volume: new BigNumber('60'), // min 30
      active: true,
      coin0: 'XXRP',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'XRP',
      coin1FriendlyName: 'USD'
    },
    XXMRZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.6'), // min 0.1
      active: true,
      coin0: 'XXMR',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'XMR',
      coin1FriendlyName: 'USD'
    },
    UNIUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 2,
      volume: new BigNumber('0.25'), //min 0.25
      active: true,
      coin0: 'UNI',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 1,
      coin0FriendlyName: 'UNI',
      coin1FriendlyName: 'USD'
    }, 
    XXLMZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 2,
      volume: new BigNumber('60'), //min 30
      active: true,
      coin0: 'XLM',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'XLM', //Stellar
      coin1FriendlyName: 'USD'
    },
    XLTCZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.15'), //min 0.25
      active: true,
      coin0: 'XLTC',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'LTC',
      coin1FriendlyName: 'USD'
    },
    ALGOUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('100'), // min 50
      active: true,
      coin0: 'ALGO',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'ALGO',
      coin1FriendlyName: 'USD'
    },
    XETHXXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.04'), // min 0.02
      active: true,
      coin0: 'XETH',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'ETH',
      coin1FriendlyName: 'BTC'
    },

    XZECZUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.03'), // min 0.03
      active: true,
      coin0: 'XZEC',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'ZEC',
      coin1FriendlyName: 'USD'
    },
    XXRPXXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('30'), // min 30
      active: true,
      coin0: 'XXRP',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'XRP',
      coin1FriendlyName: 'BTC'
    },
    XLTCXXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.1'), // min 0.1
      active: true,
      coin0: 'XLTC',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'LTC',
      coin1FriendlyName: 'BTC'
    },
    ALGOXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('50'), // min 50
      active: true,
      coin0: 'ALGO',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'ALGO',
      coin1FriendlyName: 'BTC'
    },
    NANOXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('10'), // min 10
      active: true,
      coin0: 'NANO',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'NANO',
      coin1FriendlyName: 'BTC'
    },
    XZECXXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.04'), // min 0.02
      active: true,
      coin0: 'XZEC',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'ZEC',
      coin1FriendlyName: 'BTC'
    },
    BCHXBT: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.025'), // min0.025
      active: true,
      coin0: 'BCH',
      coin1: 'XXBT',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'BCH',
      coin1FriendlyName: 'BTC'
    },
    BCHUSD: {
      changeToTrend: new BigNumber('1.5'),
      changeToChangeTrend: new BigNumber('0.5'),
      persuadeToBalance: 1,
      volume: new BigNumber('0.025'), // min0.025
      active: true,
      coin0: 'BCH',
      coin1: 'ZUSD',
      profit: new BigNumber(0),
      buyPerHour: 2,
      coin0FriendlyName: 'BCH',
      coin1FriendlyName: 'USD'
    },





  },
})
// eslint-disable-next-line prefer-const
export let store = createStore()