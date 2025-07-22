import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IconSend } from '@tabler/icons-react'

// 仮データ
const rankingData = [
  {
    rank: 1,
    title: '展示会で注目の生成AIツール「CXDrive」来場者の皆様からの熱い質問が続々と….「ROIはどのくらい改善できる？」「導入までの期間は？」',
    probability: 70,
    summary: '',
  },
  {
    rank: 2,
    title: '高校受験を控えた家庭の悩みに、塾/私中の子どものスマートフォン利用にルールを設けるーー。学習塾「明光義塾」を展開する明光ネットワークジャパン（東京都新宿区）が高校進学を希望する中学3年生の…',
    probability: 50,
    summary: '',
  },
  {
    rank: 3,
    title: '参院選（20日投開票）の期日前投票で、有権者が投票所で候補者や政党名の記入を終えた投票用紙を撮影し、X（旧ツイッター）に投稿する事例が相次いでいる。「推し」の候補者や政党の支持を広げる目的が…',
    probability: 30,
    summary: '',
  },
]

export function SnsSuggestRankingCard() {
  return (
    
    <Card className="w-full  mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 rounded-full px-2 py-1 text-xs font-bold text-green-700">LINE</span>
          <CardTitle className="text-base font-bold">サジェストランキング</CardTitle>
        </div>
        <span className="text-xs text-gray-400">00:00 更新</span>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {rankingData.map((item, idx) => (
          <div key={item.rank} className="flex items-start bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex flex-col items-center mr-3 min-w-[2.5rem]">
              <span className="text-green-600 font-bold text-lg">{item.rank}位</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{item.title}</div>
              {/* 確率バー */}
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-24 h-3 bg-green-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${item.probability}%` }}
                  />
                </div>
                <Badge className="bg-green-500 text-white text-xs font-bold px-2 py-0.5">
                  関連率：{item.probability}%
                </Badge>
              </div>
            </div>
              <button className="ml-3 p-2 rounded-full border border-green-200 hover:bg-green-50 transition">
                <IconSend size={20} className="text-green-500" />
              </button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}