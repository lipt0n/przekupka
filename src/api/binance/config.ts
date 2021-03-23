const dev = process.env.NODE_ENV !== 'production'
const devKey = '---'
const devSecret = '---'
const prodKey = 'uLLfAnK5N451KqbSjx2W9MQgtK0CkvnpowPRwPRYeyBK5mX686JTxJUfGxuDXrrW' // API Key
const prodSecret = '5Nj5mADcjRBSZ4Q9kIoJw7rHIMFaKzUjm4PXrpzt3Scdr4TCHZbWrXsy78bHjTtW' // API Private Key
export const key = prodKey
export const secret = prodSecret
export const baseUrl = 'https://api.binance.com/api/v3'
export const baseCoin = 'USDT'
export const markets = new Set(['USDT', 'BTC', 'BNB'])
export const desiredPrice = '20' // How many $ per transaction ( min 20, recomended min 40 )
export const desiredPriceBTC = '20' // How many $ per transaction ( min 20, recomended min 40 )
export const desiredPriceBNB = '20' // How many $ per transaction ( min 20, recomended min 40 )
export const minPriceDrop = 1.5
export const takeTrailingProfitFrom = 0.6
export const trailing = 0.1
export const marketVelocityDivider = 6
export const targetTakeProfitFromVelocityDivider = 14
export const dontBuybelow = {
  USDT: Number.parseInt(desiredPrice, 10) * 5,
  BTC: Number.parseInt(desiredPriceBTC, 10) * 5,
  BNB: Number.parseInt(desiredPriceBNB, 10) * 5,
}
export const safeBuyTresholds = [3, 6, 12, 20]
export const safeBuyMultipliers = [1, 1, 1, 2]
export const greed = 0.7
