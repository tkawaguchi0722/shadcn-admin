import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { SimplePieChart } from './components/piechart'
import { StackedBarChart } from './components/stacked-bar-chart'

export default function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
          </h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 '>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>SNS サジェスト ランキング</CardTitle>
                </CardHeader>
                <CardContent className='pl-2 h-30'>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>参加人数</CardTitle>
                </CardHeader>
                <CardContent className='pl-2 h-30 flex items-center justify-center'>
                  <div className='text-4xl font-bold'>1234人</div>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>エンゲージメント数</CardTitle>
                </CardHeader>
                <CardContent className='pl-2 h-30'>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>エンゲージメント率</CardTitle>
                </CardHeader>
                <CardContent className='pl-2 h-30'>
                </CardContent>
              </Card>
            </div>
            {/* PieChart */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>グラフタイトル</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>グラフタイトル</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart />
                </CardContent>
              </Card>
            </div>

            {/* BarChart */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>ブース人気ランキング</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
               <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>技術トピック別 関心度</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
            </div>

            {/* StackedBarChart */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
               <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle>ブース×職種クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart/>
                </CardContent>
              </Card>
            </div>

          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
