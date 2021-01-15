import React, {useState} from 'react'
import {Chart} from 'primereact/chart'
import moment from 'moment'

import {IStore, ITick} from '../api/server-store'
export default function chart({pair, store}: {pair: string; store: IStore}) {
  const log = store.tradeVars[pair]
  if (store.ticks.length === 0 || !log) return null

  let lastPrice: string
  const lastPrices = store.ticks.map((tick: ITick) => {
    lastPrice = tick.pairs[pair].c
    return {
      y: tick.pairs[pair].c,
      x: moment.unix(tick.timestamp).format('HH:mm:ss'),
    }
  })
  const transactions = Object.values(store.closedTransactions)
    .filter((t) => t.descr.pair === pair || t.descr.pair === store.assetPairs[pair]?.altname)
    .map((t) => ({
      ...t.descr,
      status: t.status,
      volume: t.vol,
      cost: t.cost,
      fee: t.fee,
      time: t.opentm,
      date: moment.unix(t.opentm).format('YYYY-MM-DD HH:mm:ss'),
      price: Number.parseFloat(t.price) > 0 ? t.price : t.descr.price,
    }))
    .sort((a, b) => b.time - a.time)
  const sellData = transactions
    .filter((t) => t.type === 'sell' && t.status === 'closed')
    .map((t) => ({
      y: t.price,
      x: moment.unix(t.time).format('HH:mm:ss'),
    }))
  const buyData = transactions
    .filter((t) => t.type === 'buy' && t.status === 'closed')
    .map((t) => ({
      y: t.price,
      x: moment.unix(t.time).format('HH:mm:ss'),
    }))
  const sellDataExpired = transactions
    .filter((t) => t.type === 'sell' && t.status === 'expired')
    .map((t) => ({
      y: t.price,
      x: moment.unix(t.time).format('HH:mm:ss'),
    }))
  const buyDataExpired = transactions
    .filter((t) => t.type === 'buy' && t.status === 'expired')
    .map((t) => ({
      y: t.price,
      x: moment.unix(t.time).format('HH:mm:ss'),
    }))

  const labels = [...store.ticks.map((tick) => tick.timestamp), ...transactions.map((t) => t.time)]
    .sort()
    .map((l) => moment.unix(l).format('HH:mm:ss'))
  const willSellAt = log
    ? Number.parseFloat((log.highest as unknown) as string) -
      Number.parseFloat((log.highest as unknown) as string) *
        (Number.parseFloat(store.pairs[pair].changeToChangeTrend) / 100)
    : 0
  const willBuyAt = log
    ? Number.parseFloat((log.lowest as unknown) as string) +
      Number.parseFloat((log.lowest as unknown) as string) *
        (Number.parseFloat(store.pairs[pair].changeToChangeTrend) / 100)
    : 0

  const basicData = {
    labels,
    datasets: [
      {
        label: 'price',
        data: lastPrices,
        fill: false,
        pointBorderWidth: 0,
        radius: 0,
        borderColor: '#42A5F5',
      },
      {
        label: 'highest',
        data: labels.map((_) => log.highest),
        fill: false,
        borderColor: '#f00',
        pointBorderWidth: 0,
        radius: 0,
        lineTension: 0.1,
        borderWidth: 1,
      },
      {
        label: 'will sell at',
        data: labels.map((_) => willSellAt),
        fill: false,
        borderColor: '#f00',
        pointBorderWidth: 0,
        radius: 0,
        lineTension: 0.1,
        borderWidth: 3,
        borderDash: [2, 5],
      },
      {
        label: 'lowest',
        data: labels.map((_) => log.lowest),
        fill: false,
        borderColor: '#0f0',
        pointBorderWidth: 0,
        radius: 0,
        lineTension: 0.1,
        borderWidth: 1,
      },
      {
        label: 'will buy at',
        data: labels.map((_) => willBuyAt),
        fill: false,
        borderColor: '#0f0',
        pointBorderWidth: 0,
        radius: 0,
        lineTension: 0.1,
        borderWidth: 3,
        borderDash: [2, 5],
      },
      {
        label: 'current price',
        data: labels.map((_) => lastPrice),
        fill: false,
        borderColor: '#42A5F5',
        pointBorderWidth: 0,
        radius: 0,
        lineTension: 0.1,
        borderWidth: 3,
        borderDash: [2, 5],
      },

      {
        label: 'buy',
        data: buyData,
        showLine: false,
        pointBorderWidth: 7,
        fill: false,
        borderColor: '#10a366',
      },
      {
        label: 'sell',
        showLine: false,
        pointBorderWidth: 7,
        data: sellData,
        fill: false,
        borderColor: '#a31510',
      },
      {
        label: 'expired sell',
        showLine: false,
        pointBorderWidth: 1,
        data: sellDataExpired,
        fill: false,
        radius: 5,

        borderStyle: 'cross',
        borderColor: '#a31510',
      },
      {
        label: 'expired buy',
        showLine: false,
        pointBorderWidth: 1,
        radius: 5,
        data: buyDataExpired,
        fill: false,
        borderStyle: 'cross',
        borderColor: '#10a366',
      },
    ],
  }
  const [opened, setOpened] = useState(false)

  return (
    <div>
      <Chart
        type='line'
        data={basicData}
        style={{height: 400}}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          scales: {
            yAxes: {
              ticks: {
                sampleSize: 10,
              },
            },
            xAxes: {
              ticks: {
                sampleSize: 10,
              },
            },
          },
        }}
      />
    </div>
  )
}
