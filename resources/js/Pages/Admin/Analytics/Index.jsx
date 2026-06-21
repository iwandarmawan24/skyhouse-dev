import AdminLayout from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from '@/Components/ui/Table';
import {
    Eye, MessageSquare, Phone, FileDown,
    Home, Users, TrendingUp, MousePointerClick,
} from 'lucide-react';

const EVENT_LABELS = {
    page_view:              { label: 'Page View',          variant: 'secondary' },
    contact_submit:         { label: 'Contact Submit',     variant: 'default' },
    whatsapp_click:         { label: 'WhatsApp',           variant: 'success' },
    brochure_download:      { label: 'Brochure Download',  variant: 'secondary' },
    unit_contact:           { label: 'Unit → Contact',     variant: 'default' },
    unit_brochure:          { label: 'Unit → Brochure',    variant: 'secondary' },
    article_view:           { label: 'Article View',       variant: 'secondary' },
    media_highlight_click:  { label: 'Media Highlight',    variant: 'secondary' },
};

function StatCard({ icon: Icon, label, today, week, month, color = 'text-blue-600', bg = 'bg-blue-50' }) {
    return (
        <Card className="p-5">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{month.toLocaleString()}</p>
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span>Today: <strong className="text-gray-700">{today}</strong></span>
                <span>7d: <strong className="text-gray-700">{week}</strong></span>
                <span>30d: <strong className="text-gray-700">{month}</strong></span>
            </div>
        </Card>
    );
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('id-ID', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function metaSummary(meta) {
    if (!meta) return '—';
    if (meta.unit_name) return meta.unit_name;
    if (meta.title) return meta.title.slice(0, 40) + (meta.title.length > 40 ? '…' : '');
    if (meta.subject) return meta.subject;
    return '—';
}

export default function Analytics({ summary, topPages, eventBreakdown, uniqueVisitors, recentEvents }) {
    const s = summary;

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-500 mt-1">Visitor behavior and engagement tracking</p>
            </div>

            {/* Unique Visitors */}
            <div className="mb-4">
                <Card className="p-5 flex items-center gap-6">
                    <div className="p-2 rounded-lg bg-purple-50">
                        <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Unique Visitors (by IP)</p>
                        <div className="flex gap-6 mt-1 text-sm">
                            <span>Today: <strong className="text-gray-900 text-lg">{uniqueVisitors.today}</strong></span>
                            <span>7d: <strong className="text-gray-900 text-lg">{uniqueVisitors.week}</strong></span>
                            <span>30d: <strong className="text-gray-900 text-lg">{uniqueVisitors.month}</strong></span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Stat Cards Row 1 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <StatCard icon={Eye}            label="Page Views"         today={s.page_view?.today}     week={s.page_view?.week}     month={s.page_view?.month}     color="text-blue-600"   bg="bg-blue-50" />
                <StatCard icon={MessageSquare}  label="Contact Submits"    today={s.contact_submit?.today} week={s.contact_submit?.week} month={s.contact_submit?.month} color="text-indigo-600" bg="bg-indigo-50" />
                <StatCard icon={Phone}          label="WhatsApp Clicks"    today={s.whatsapp_click?.today} week={s.whatsapp_click?.week} month={s.whatsapp_click?.month} color="text-green-600"  bg="bg-green-50" />
                <StatCard icon={FileDown}       label="Brochure Downloads" today={s.brochure_download?.today} week={s.brochure_download?.week} month={s.brochure_download?.month} color="text-orange-600" bg="bg-orange-50" />
            </div>

            {/* Stat Cards Row 2 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Home}               label="Unit → Contact"          today={s.unit_contact?.today}          week={s.unit_contact?.week}          month={s.unit_contact?.month}          color="text-sky-600"    bg="bg-sky-50" />
                <StatCard icon={TrendingUp}         label="Unit → Brochure"         today={s.unit_brochure?.today}         week={s.unit_brochure?.week}         month={s.unit_brochure?.month}         color="text-teal-600"   bg="bg-teal-50" />
                <StatCard icon={Eye}                label="Article Views"           today={s.article_view?.today}          week={s.article_view?.week}          month={s.article_view?.month}          color="text-violet-600" bg="bg-violet-50" />
                <StatCard icon={MousePointerClick}  label="Media Highlight Clicks"  today={s.media_highlight_click?.today} week={s.media_highlight_click?.week} month={s.media_highlight_click?.month} color="text-pink-600"   bg="bg-pink-50" />
            </div>

            {/* Top Pages + Event Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Top Pages</h2>
                        <p className="text-xs text-gray-500 mt-0.5">All-time page views</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>URL</TableHead>
                                <TableHead className="text-right w-20">Views</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topPages.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-sm text-gray-700 max-w-xs truncate">{row.page_url}</TableCell>
                                    <TableCell className="text-right font-medium">{row.count}</TableCell>
                                </TableRow>
                            ))}
                            {topPages.length === 0 && (
                                <TableRow><TableCell colSpan={2} className="text-center text-gray-400 py-8">No data yet</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Card className="overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Event Breakdown</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Last 30 days</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead className="text-right w-20">Count</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventBreakdown.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Badge variant={EVENT_LABELS[row.event_type]?.variant ?? 'secondary'}>
                                            {EVENT_LABELS[row.event_type]?.label ?? row.event_type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">{row.count}</TableCell>
                                </TableRow>
                            ))}
                            {eventBreakdown.length === 0 && (
                                <TableRow><TableCell colSpan={2} className="text-center text-gray-400 py-8">No data yet</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Recent Events */}
            <Card className="overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900">Recent Events</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Latest {recentEvents.data?.length ?? 0} events</p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Page</TableHead>
                            <TableHead>IP</TableHead>
                            <TableHead>Detail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentEvents.data?.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="whitespace-nowrap text-xs text-gray-500">{formatDate(event.created_at)}</TableCell>
                                <TableCell>
                                    <Badge variant={EVENT_LABELS[event.event_type]?.variant ?? 'secondary'}>
                                        {EVENT_LABELS[event.event_type]?.label ?? event.event_type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-gray-600 max-w-[200px] truncate">{event.page_url ?? '—'}</TableCell>
                                <TableCell className="text-xs text-gray-500 whitespace-nowrap">{event.ip_address ?? '—'}</TableCell>
                                <TableCell className="text-xs text-gray-600">
                                    {metaSummary(typeof event.meta === 'string' ? JSON.parse(event.meta || 'null') : event.meta)}
                                </TableCell>
                            </TableRow>
                        ))}
                        {(recentEvents.data?.length ?? 0) === 0 && (
                            <TableRow><TableCell colSpan={5} className="text-center text-gray-400 py-12">No events recorded yet</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </AdminLayout>
    );
}
