import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Settings, Upload, Brain, AlertCircle, CheckCircle, FileCheck, Clock } from 'lucide-react';

const statsCards = [
  {
    title: 'Total Standards',
    value: '247',
    subtitle: 'in this month',
    color: 'bg-primary',
    icon: FileText,
  },
  {
    title: 'Active Workflows',
    value: '8',
    subtitle: 'running',
    color: 'bg-success',
    icon: Settings,
  },
  {
    title: 'Pending Updates',
    value: '7',
    subtitle: 'new',
    color: 'bg-warning',
    icon: Upload,
  },
  {
    title: 'AI Processed',
    value: '1,429',
    subtitle: 'documents',
    color: 'bg-ai-primary',
    icon: Brain,
  },
];

const recentStandards = [
  {
    id: '3GPP TS 23.501',
    version: 'Version 17.9.0 • 5G Core',
    updated: 'Updated 2024-06-15',
    status: 'current',
  },
  {
    id: '3GPP TS 38.401',
    version: 'Version 17.8.0 • 5G RAN',
    updated: 'Updated 2024-05-20',
    status: 'current',
  },
  {
    id: 'IETF RFC 8200',
    version: 'Version IPv6 • Internet Protocol',
    updated: 'Updated 2024-04-10',
    status: 'stable',
  },
  {
    id: '3GPP TS 29.244',
    version: 'Version 17.7.0 • 5G RAN',
    updated: 'Updated 2024-03-25',
    status: 'stable',
  },
];

const recentActivity = [
  {
    type: 'new-version',
    title: 'New version detected',
    description: '3GPP TS 23.501 v17.10.0',
    time: '2 hours ago',
    icon: AlertCircle,
    priority: 'high',
  },
  {
    type: 'workflow-completed',
    title: 'Workflow completed',
    description: '3GPP TS 38.401 v17.3.0',
    time: '5 hours ago',
    icon: CheckCircle,
    priority: 'success',
  },
  {
    type: 'document-mapped',
    title: 'Document mapped',
    description: 'IETF RFC 8200 v4.6.1',
    time: '1 day ago',
    icon: FileCheck,
    priority: 'info',
  },
  {
    type: 'analysis-completed',
    title: 'AI analysis completed',
    description: '3GPP TS 29.244 v17.8.0',
    time: '2 days ago',
    icon: Brain,
    priority: 'ai',
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-8 py-6 space-y-6 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Overview of your telecom standards management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2.5 rounded-lg ${card.color}`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-foreground mb-1">{card.value}</div>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Standards */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Recent Standards
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Latest telecom standards and their status
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentStandards.map((standard, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-base">{standard.id}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{standard.version}</div>
                    <div className="text-xs text-muted-foreground mt-1">{standard.updated}</div>
                  </div>
                  <Badge
                    className={`status-badge ${
                      standard.status === 'current' ? 'status-current' : 'status-active'
                    }`}
                  >
                    {standard.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  System activities and updates
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div
                    className={`p-2.5 rounded-lg flex-shrink-0 ${
                      activity.priority === 'high'
                        ? 'bg-destructive/10 text-destructive'
                        : activity.priority === 'success'
                        ? 'bg-success/10 text-success'
                        : activity.priority === 'ai'
                        ? 'bg-ai-primary/10 text-ai-primary'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-base">{activity.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{activity.description}</div>
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}