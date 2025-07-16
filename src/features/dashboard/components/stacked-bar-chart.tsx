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
  { name: 'システム・アプリ展', 経営者・役員: 25, 管理職: 20, エンジニア: 18, セール・営業: 15, マーケティング: 12, 人事・採用: 5, その他: 5 },
  { name: 'ITインフラ展', 経営者・役員: 22, 管理職: 18, エンジニア: 20, セール・営業: 14, マーケティング: 11, 人事・採用: 5, その他: 5 },
  { name: 'IT人材育成・採用支援', 経営者・役員: 20, 管理職: 16, エンジニア: 19, セール・営業: 13, マーケティング: 10, 人事・採用: 6, その他: 5 },
  { name: 'データ分析・AI', 経営者・役員: 28, 管理職: 22, エンジニア: 25, セール・営業: 16, マーケティング: 13, 人事・採用: 7, その他: 5 },
  { name: 'クラウド業務改革', 経営者・役員: 24, 管理職: 19, エンジニア: 21, セール・営業: 15, マーケティング: 12, 人事・採用: 6, その他: 5 },
  { name: 'IoT・組込みシステム', 経営者・役員: 18, 管理職: 15, エンジニア: 22, セール・営業: 12, マーケティング: 9, 人事・採用: 5, その他: 5 },
  { name: 'Web&デジタルマーケ', 経営者・役員: 16, 管理職: 14, エンジニア: 20, セール・営業: 13, マーケティング: 18, 人事・採用: 8, その他: 5 },
  { name: '業務自動化・RPA', 経営者・役員: 21, 管理職: 17, エンジニア: 23, セール・営業: 11, マーケティング: 9, 人事・採用: 6, その他: 5 },
  { name: 'ネットワーク・通信', 経営者・役員: 15, 管理職: 12, エンジニア: 24, セール・営業: 10, マーケティング: 8, 人事・採用: 5, その他: 5 },
  { name: 'DX推進', 経営者・役員: 30, 管理職: 25, エンジニア: 28, セール・営業: 18, マーケティング: 15, 人事・採用: 10, その他: 7 },
];

export function StackedBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart 
        data={data} 
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        barSize={40}
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="その他" stackId="a" fill="#15803d"/>
        <Bar dataKey="人事・採用" stackId="a" fill="#16a34a"/>
        <Bar dataKey="マーケティング" stackId="a" fill="#22c55e"/>
        <Bar dataKey="セール・営業" stackId="a" fill="#4ade80"/>
        <Bar dataKey="エンジニア" stackId="a" fill="#86efac"/>
        <Bar dataKey="管理職" stackId="a" fill="#bbf7d0"/>
        <Bar dataKey="経営者・役員" stackId="a" fill="#dcfce7"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
