import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '1月', A社: 400, B社: 240 },
  { name: '2月', A社: 300, B社: 139 },
  { name: '3月', A社: 200, B社: 980 },
  { name: '4月', A社: 278, B社: 390 },
  { name: '5月', A社: 189, B社: 480 },
  { name: '1月', A社: 400, B社: 240 },
  { name: '2月', A社: 300, B社: 139 },
  { name: '3月', A社: 200, B社: 980 },
  { name: '4月', A社: 278, B社: 390 },
  { name: '5月', A社: 189, B社: 480 },
];

export function StackedBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="A社" 
          stackId="a" 
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary' />
        <Bar dataKey="B社" stackId="a" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
