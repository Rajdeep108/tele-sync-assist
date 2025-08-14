import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Plus, Zap, Settings, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';

const workflowsData = [
  {
    id: 1,
    name: '3GPP Standards Monitor',
    description: 'Automatically detect new 3GPP releases and trigger document mapping workflow',
    progress: 75,
    trigger: 'New version detection',
    monitoredStandards: ['3GPP TS 23.501', '3GPP TS 38.401', '3GPP TS 29.244'],
    actions: [
      { name: 'Trigger: New version detection', completed: true },
      { name: 'Version comparison', completed: true },
      { name: 'Document mapping', completed: true },
      { name: 'Stakeholder notification', completed: false },
      { name: 'Archive previous version', completed: false },
    ],
    lastRun: '2024-06-28 14:30',
    nextRun: '2024-06-29 09:00',
    isActive: true,
  },
  {
    id: 2,
    name: 'IETF RFC Updater',
    description: 'Monitor IETF RFC updates and maintain internal documentation alignment',
    progress: 100,
    trigger: 'RFC publication',
    monitoredStandards: ['IETF RFC 8200', 'IETF RFC 7540'],
    actions: [
      { name: 'Trigger: RFC publication', completed: true },
      { name: 'Impact analysis', completed: true },
      { name: 'Documentation update', completed: true },
      { name: 'Team notification', completed: true },
    ],
    lastRun: '2024-06-27 16:45',
    nextRun: '2024-06-30 10:00',
    isActive: true,
  },
];

export default function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState(workflowsData);

  const toggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, isActive: !workflow.isActive }
        : workflow
    ));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Workflow Automation</h1>
          <p className="text-muted-foreground">
            Automate document workflows when new standards are released
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary-hover text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <Badge className={workflow.isActive ? 'status-active' : 'status-deprecated'}>
                      {workflow.isActive ? 'active' : 'inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">Current Progress</span>
                  <span className="text-muted-foreground">{workflow.progress}%</span>
                </div>
                <Progress value={workflow.progress} className="h-2" />
              </div>

              {/* Trigger */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  Trigger: {workflow.trigger}
                </div>
                
                {/* Monitored Standards */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Monitored Standards:</div>
                  <div className="flex flex-wrap gap-2">
                    {workflow.monitoredStandards.map((standard, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">Actions:</div>
                <div className="space-y-2">
                  {workflow.actions.map((action, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      {action.completed ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted" />
                      )}
                      <span className={action.completed ? 'text-foreground' : 'text-muted-foreground'}>
                        {action.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Run Details */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Last Run:</div>
                  <div className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {workflow.lastRun}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Next Run:</div>
                  <div className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {workflow.nextRun}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={workflow.isActive}
                    onCheckedChange={() => toggleWorkflow(workflow.id)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {workflow.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Common workflow operations and monitoring tools
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">View All Logs</div>
                <div className="text-sm text-muted-foreground">
                  Review workflow execution history
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Performance Metrics</div>
                <div className="text-sm text-muted-foreground">
                  Monitor workflow efficiency
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Template Gallery</div>
                <div className="text-sm text-muted-foreground">
                  Browse workflow templates
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}