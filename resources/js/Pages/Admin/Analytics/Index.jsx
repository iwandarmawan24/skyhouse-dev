import AdminLayout from '@/Layouts/AdminLayout';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from '@/Components/ui/Table';
import {
    Eye, MessageSquare, Phone, FileDown,
    Home, Users, TrendingUp, MousePointerClick, Monitor, Smartphone, Tablet, Download,
} from 'lucide-react';

// ─── Sankey SVG renderer (zero dependencies) ─────────────────────────────────

function SankeyChart({ nodes, links }) {
    if (!nodes?.length || !links?.length) {
        return (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                Not enough flow data yet (need at least 2 transitions with ≥ 2 sessions each)
            </div>
        );
    }

    const W = 760, H = 340, NODE_W = 14, PAD = 10;

    // Assign column levels by BFS
    const inDegree = {};
    const adj = {};
    nodes.forEach((_, i) => { inDegree[i] = 0; adj[i] = []; });
    links.forEach(({ source, target }) => {
        inDegree[target] = (inDegree[target] ?? 0) + 1;
        adj[source].push(target);
    });

    const col = {};
    const queue = nodes.map((_, i) => i).filter(i => inDegree[i] === 0);
    queue.forEach(i => { col[i] = 0; });
    let head = 0;
    while (head < queue.length) {
        const cur = queue[head++];
        adj[cur].forEach(next => {
            col[next] = Math.max(col[next] ?? 0, (col[cur] ?? 0) + 1);
            queue.push(next);
        });
    }

    const maxCol = Math.max(...Object.values(col), 0);
    const colX = (c) => NODE_W / 2 + (c / (maxCol || 1)) * (W - NODE_W - 20) + 10;

    // Group nodes by column
    const byCols = {};
    nodes.forEach((_, i) => {
        const c = col[i] ?? 0;
        (byCols[c] = byCols[c] ?? []).push(i);
    });

    // Node heights proportional to total flow
    const nodeVal = {};
    links.forEach(({ source, target, value }) => {
        nodeVal[source] = (nodeVal[source] ?? 0) + value;
        nodeVal[target] = (nodeVal[target] ?? 0) + value;
    });
    const maxVal = Math.max(...Object.values(nodeVal), 1);
    const nodeH = (i) => Math.max(20, (nodeVal[i] / maxVal) * (H - PAD * 12));

    // Y positions within each column
    const nodeY = {};
    Object.entries(byCols).forEach(([, group]) => {
        const totalH = group.reduce((s, i) => s + nodeH(i) + PAD, 0);
        let y = (H - totalH) / 2;
        group.forEach(i => {
            nodeY[i] = y;
            y += nodeH(i) + PAD;
        });
    });

    const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#84cc16'];
    const nodeColor = (i) => COLORS[i % COLORS.length];

    // Short label (last segment after colon)
    const label = (name) => name.replace(/^page_view:/, '').replace(/^([^:]+):/, '').replace(/_/g, ' ');

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 360 }}>
            {/* Links */}
            {links.map(({ source, target, value }, idx) => {
                const sx = colX(col[source] ?? 0) + NODE_W / 2;
                const tx = colX(col[target] ?? 0) - NODE_W / 2;
                const sy = (nodeY[source] ?? 0) + nodeH(source) / 2;
                const ty = (nodeY[target] ?? 0) + nodeH(target) / 2;
                const thickness = Math.max(2, (value / maxVal) * 30);
                const cx = (sx + tx) / 2;
                return (
                    <path
                        key={idx}
                        d={`M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ty}, ${tx} ${ty}`}
                        fill="none"
                        stroke={nodeColor(source)}
                        strokeWidth={thickness}
                        strokeOpacity={0.35}
                    />
                );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => {
                const x = colX(col[i] ?? 0) - NODE_W / 2;
                const y = nodeY[i] ?? 0;
                const h = nodeH(i);
                const lx = x + NODE_W + 6;
                const textAnchor = (col[i] ?? 0) > maxCol / 2 ? 'end' : 'start';
                const tlx = textAnchor === 'end' ? x - 6 : lx;
                return (
                    <g key={i}>
                        <rect x={x} y={y} width={NODE_W} height={h} rx={3} fill={nodeColor(i)} />
                        <text
                            x={tlx} y={y + h / 2 + 4}
                            fontSize={10} fill="#374151"
                            textAnchor={textAnchor}
                            className="font-medium"
                        >
                            {label(node.name)} ({nodeVal[i] ?? 0})
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EVENT_LABELS = {
    page_view:             { label: 'Page View',          variant: 'secondary' },
    contact_submit:        { label: 'Contact Submit',     variant: 'default' },
    wa_click:              { label: 'WhatsApp',           variant: 'success' },
    download_click:        { label: 'Brochure Download',  variant: 'secondary' },
    contact_click:         { label: 'Unit → Contact',     variant: 'default' },
    article_view:          { label: 'Article View',       variant: 'secondary' },
    media_highlight_click: { label: 'Media Highlight',    variant: 'secondary' },
    click:                 { label: 'Click',              variant: 'secondary' },
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
            <p className="text-3xl font-bold text-gray-900">{(month ?? 0).toLocaleString()}</p>
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span>Today: <strong className="text-gray-700">{today ?? 0}</strong></span>
                <span>7d: <strong className="text-gray-700">{week ?? 0}</strong></span>
                <span>30d: <strong className="text-gray-700">{month ?? 0}</strong></span>
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

const DEVICE_ICONS = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Analytics({
    summary, uniqueSessions, topPages, eventBreakdown,
    deviceBreakdown, sankeyData, recentEvents,
}) {
    const s = summary ?? {};

    return (
        <AdminLayout>
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-500 mt-1">Visitor behaviour and engagement tracking</p>
                </div>
                <a
                    href="/admin/analytics/export"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white text-sm font-medium rounded-lg hover:bg-[#1e40af] transition-colors shrink-0"
                >
                    <Download className="h-4 w-4" />
                    Download Excel
                </a>
            </div>

            {/* Unique Sessions */}
            <div className="mb-4">
                <Card className="p-5 flex items-center gap-6">
                    <div className="p-2 rounded-lg bg-purple-50">
                        <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Unique Sessions</p>
                        <div className="flex gap-6 mt-1 text-sm">
                            <span>Today: <strong className="text-gray-900 text-lg">{uniqueSessions?.today ?? 0}</strong></span>
                            <span>7d: <strong className="text-gray-900 text-lg">{uniqueSessions?.week ?? 0}</strong></span>
                            <span>30d: <strong className="text-gray-900 text-lg">{uniqueSessions?.month ?? 0}</strong></span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <StatCard icon={Eye}            label="Page Views"       today={s.page_view?.today}      week={s.page_view?.week}      month={s.page_view?.month}      color="text-blue-600"   bg="bg-blue-50" />
                <StatCard icon={MessageSquare}  label="Contact Submits"  today={s.contact_submit?.today} week={s.contact_submit?.week} month={s.contact_submit?.month} color="text-indigo-600" bg="bg-indigo-50" />
                <StatCard icon={Phone}          label="WhatsApp Clicks"  today={s.wa_click?.today}       week={s.wa_click?.week}       month={s.wa_click?.month}       color="text-green-600"  bg="bg-green-50" />
                <StatCard icon={FileDown}       label="Brochure Downloads" today={s.download_click?.today} week={s.download_click?.week} month={s.download_click?.month} color="text-orange-600" bg="bg-orange-50" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard icon={Home}              label="Unit → Contact"  today={s.contact_click?.today}  week={s.contact_click?.week}  month={s.contact_click?.month}  color="text-sky-600"    bg="bg-sky-50" />
                <StatCard icon={Eye}               label="Article Views"   today={s.article_view?.today}   week={s.article_view?.week}   month={s.article_view?.month}   color="text-violet-600" bg="bg-violet-50" />
                <StatCard icon={MousePointerClick} label="Media Clicks"    today={s.media_highlight_click?.today} week={s.media_highlight_click?.week} month={s.media_highlight_click?.month} color="text-pink-600"   bg="bg-pink-50" />
            </div>

            {/* Sankey — Visitor Journey (hidden until enough data is collected) */}

            {/* Top Pages + Event Breakdown + Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Top Pages</h2>
                        <p className="text-xs text-gray-500 mt-0.5">All-time page views</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>URL</TableHead>
                                <TableHead className="text-right w-16">Views</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(topPages ?? []).map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="text-xs text-gray-700 max-w-[160px] truncate">{row.page_url}</TableCell>
                                    <TableCell className="text-right font-medium">{row.count}</TableCell>
                                </TableRow>
                            ))}
                            {!topPages?.length && (
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
                                <TableHead className="text-right w-16">Count</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(eventBreakdown ?? []).map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Badge variant={EVENT_LABELS[row.event_type]?.variant ?? 'secondary'}>
                                            {EVENT_LABELS[row.event_type]?.label ?? row.event_type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">{row.count}</TableCell>
                                </TableRow>
                            ))}
                            {!eventBreakdown?.length && (
                                <TableRow><TableCell colSpan={2} className="text-center text-gray-400 py-8">No data yet</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Card className="overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Device / Browser</h2>
                        <p className="text-xs text-gray-500 mt-0.5">All-time sessions</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Device</TableHead>
                                <TableHead>Browser</TableHead>
                                <TableHead>OS</TableHead>
                                <TableHead className="text-right w-14">Sessions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(deviceBreakdown ?? []).slice(0, 10).map((row, i) => {
                                const Icon = DEVICE_ICONS[row.device_type] ?? Monitor;
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <span className="flex items-center gap-1 text-xs">
                                                <Icon className="h-3.5 w-3.5 text-gray-400" />
                                                {row.device_type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs">{row.browser ?? '—'}</TableCell>
                                        <TableCell className="text-xs">{row.os ?? '—'}</TableCell>
                                        <TableCell className="text-right font-medium">{row.count}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {!deviceBreakdown?.length && (
                                <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">No data yet</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Recent Events */}
            <Card className="overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900">Recent Events</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Latest {recentEvents?.data?.length ?? 0} events</p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Page</TableHead>
                            <TableHead>Device</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(recentEvents?.data ?? []).map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="whitespace-nowrap text-xs text-gray-500">{formatDate(event.created_at)}</TableCell>
                                <TableCell>
                                    <Badge variant={EVENT_LABELS[event.event_type]?.variant ?? 'secondary'}>
                                        {EVENT_LABELS[event.event_type]?.label ?? event.event_type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-gray-600 max-w-[140px] truncate">
                                    {event.target_label ?? event.event_target ?? '—'}
                                </TableCell>
                                <TableCell className="text-xs text-gray-600 max-w-[160px] truncate">{event.page_url ?? '—'}</TableCell>
                                <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                                    {[event.device_type, event.browser].filter(Boolean).join(' / ') || '—'}
                                </TableCell>
                            </TableRow>
                        ))}
                        {!(recentEvents?.data?.length) && (
                            <TableRow><TableCell colSpan={5} className="text-center text-gray-400 py-12">No events recorded yet</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </AdminLayout>
    );
}
