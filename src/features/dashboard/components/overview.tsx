import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'A社',
    total: 60,
  },
  {
    name: 'B社',
    total: 40,
  },
  {
    name: 'C社',
    total: 30,
  },
  {
    name: 'D社',
    total: 10,
  },
  {
    name: 'E社',
    total: 10,
  },
  {
    name: 'F社',
    total: 5,
  },
  {
    name: 'G社',
    total: 2,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='total'
          radius={[4, 4, 0, 0]}
          fill='#06C42C'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
