"use client";
import { useAuth } from "../../../context/AuthContext";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import CustomTable from "../../../components/table";
import { 
    Send2, UserAdd, MouseSquare, DirectNotification, 
    Link1, ShieldTick, CalendarTick, Profile2User 
} from "iconsax-react";
import React, { useMemo, useRef, useEffect } from "react";
import { motion } from 'framer-motion';
import { useFetchDashboardOverview } from "@/services/DashboardServices";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { useCreateCampaign } from "@/services/CampaignServices";

export default function Home() {
  const { loggedinUser } = useAuth();
  const { data: dashboardData, isLoading } = useFetchDashboardOverview();
  const [createCampaign, setcreateCampaign] = React.useState(false);
  
  Chart.register(CategoryScale);

  const stats = useMemo(() => [
    { name: 'Total Subscribers', value: dashboardData?.stats?.totalSubscribers || '0', change: '+0%', icon: UserAdd, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Emails Sent', value: dashboardData?.stats?.totalEmailsSent || '0', change: '+0%', icon: Send2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Avg. Open Rate', value: dashboardData?.stats?.avgOpenRate || '0%', change: '+0%', icon: DirectNotification, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Avg. Click Rate', value: dashboardData?.stats?.avgClickRate || '0%', change: '+0%', icon: MouseSquare, color: 'text-rose-600', bg: 'bg-rose-50' },
  ], [dashboardData]);

  const chartData = useMemo(() => ({
    labels: dashboardData?.growth?.map((d) => dayjs(d.month).format('MMM YYYY')) || [],
    datasets: [
      {
        label: "Subscribers",
        data: dashboardData?.growth?.map((d) => d.count) || [],
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderColor: "#4F46E5",
        borderWidth: 3,
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  }), [dashboardData]);

  const healthData = useMemo(() => ({
    labels: ['Delivered', 'Bounced', 'Spam'],
    datasets: [{
        data: [
            dashboardData?.health?.delivered || 100,
            dashboardData?.health?.bounced || 0,
            dashboardData?.health?.complaints || 0
        ],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
        borderWidth: 0,
        hoverOffset: 4
    }]
  }), [dashboardData]);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-8 space-y-8">
      
      {/* Quick Actions Bar */}
      <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl soft-shadow border border-slate-100">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <ShieldTick size="20" variant="Bulk" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-900">Campaign Manager</h4>
                <p className="text-xs text-slate-500">Last activity: {dayjs().format('HH:mm')}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Button 
              color="primary" 
              size="sm" 
              startContent={<Send2 size={18}/>} 
              className="font-bold rounded-xl"
              onClick={() => {
                setcreateCampaign(true);
              }}
            >
                New Campaign
            </Button>
            <Button as={Link} href="/app/mailing-list" variant="flat" size="sm" startContent={<UserAdd size={18}/>} className="font-bold rounded-xl">
                Add Subscribers
            </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div key={stat.name} variants={item} className="card group hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size="24" variant="Bulk" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">+0%</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Audience Growth Chart */}
        <motion.div variants={item} className="card lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Audience Growth</h3>
            <Profile2User size="20" className="text-slate-400" />
          </div>
          <div className="h-[300px] w-full">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </motion.div>

        {/* Deliverability Health Card */}
        <motion.div variants={item} className="card flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Deliverability Health</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="w-48 h-48">
                <Doughnut data={healthData} options={{ cutout: '75%', plugins: { legend: { display: false } } }} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-black text-slate-900">{dashboardData?.health?.rate}%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="text-center">
                <p className="text-xs font-bold text-emerald-600">{dashboardData?.health?.delivered}</p>
                <p className="text-[10px] text-slate-400">Sent</p>
            </div>
            <div className="text-center">
                <p className="text-xs font-bold text-rose-600">{dashboardData?.health?.bounced}</p>
                <p className="text-[10px] text-slate-400">Bounced</p>
            </div>
            <div className="text-center">
                <p className="text-xs font-bold text-amber-600">{dashboardData?.health?.complaints}</p>
                <p className="text-[10px] text-slate-400">Spam</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-8">
        {/* Top Clicked Links */}
        <motion.div variants={item} className="card xl:col-span-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Top Content</h3>
                <Link1 size="20" className="text-slate-400" />
            </div>
            <div className="space-y-4">
                {dashboardData?.topLinks?.map((link, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {i+1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{link.link}</p>
                            <p className="text-xs text-slate-500">{link.total_clicks} total clicks</p>
                        </div>
                    </div>
                ))}
                {(!dashboardData?.topLinks || dashboardData.topLinks.length === 0) && (
                    <p className="text-slate-400 text-sm italic">No link activity yet</p>
                )}
            </div>
        </motion.div>

        {/* Upcoming Sends */}
        <motion.div variants={item} className="card xl:col-span-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Upcoming Sends</h3>
                <CalendarTick size="20" className="text-slate-400" />
            </div>
            <div className="space-y-4">
                {dashboardData?.upcoming?.map((camp, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/30">
                        <div className="text-center px-3 py-2 bg-white rounded-lg soft-shadow border border-slate-100">
                            <p className="text-[10px] font-bold text-indigo-600 uppercase">{dayjs(camp.scheduled_at).format('MMM')}</p>
                            <p className="text-lg font-black text-slate-900 leading-none">{dayjs(camp.scheduled_at).format('DD')}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{camp.name}</p>
                            <p className="text-xs text-slate-500">at {dayjs(camp.scheduled_at).format('HH:mm')}</p>
                        </div>
                    </div>
                ))}
                {(!dashboardData?.upcoming || dashboardData.upcoming.length === 0) && (
                    <p className="text-slate-400 text-sm italic">No scheduled campaigns</p>
                )}
            </div>
        </motion.div>

        {/* Audience Distribution */}
        <motion.div variants={item} className="card xl:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Audience Distribution</h3>
            <div className="space-y-5">
                {dashboardData?.listDistribution?.map((list, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm font-bold text-slate-700">{list.name}</span>
                            <span className="text-xs font-bold text-slate-400">{list.subscribers_count}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${(list.subscribers_count / (dashboardData?.stats?.totalSubscribers.replace(/,/g, '') || 1)) * 100}%` }}
                                className="bg-indigo-500 h-full rounded-full" 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
      {createCampaign && <CreateCampaign />}
    </motion.div>
  );
}

function CreateCampaign() {
  const { user, createCampaign, isLoading } = useCreateCampaign();
  const hasCalled = useRef(false);
  
  useEffect(() => {
    if (!hasCalled.current) {
      hasCalled.current = true;
      createCampaign();
    }
  }, [createCampaign]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    redirect(`/app/campaigns/${user?.uuid}/preview`);
  }
  return <div></div>;
}
