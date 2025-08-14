import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  FileText, 
  Calendar, 
  GitCompare, 
  Settings, 
  Brain, 
  Lightbulb,
  Clock,
  Sparkles 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const quickActions = [
  {
    icon: FileText,
    title: 'Analyze Latest Standards',
    description: 'Review recent standard updates',
  },
  {
    icon: Calendar,
    title: 'Predict Next Update',
    description: 'Forecast upcoming releases',
  },
  {
    icon: GitCompare,
    title: 'Compare Versions',
    description: 'Analyze version differences',
  },
  {
    icon: Settings,
    title: 'Optimize Workflows',
    description: 'Improve automation efficiency',
  },
];

const aiInsights = [
  {
    title: '3GPP TS 23.501 Major Update',
    description: 'Based on release patterns, a major update to 3GPP TS 23.501 is expected within the next 30 days. The predicted improvements will focus on 5G Core network optimizations.',
    priority: 'high',
    tags: ['3GPP TS 23.501'],
    time: '2 hours ago',
  },
  {
    title: 'Network Slicing Documentation Gap',
    description: 'Analysis reveals inconsistencies in network slicing documentation between 3GPP TS 23.501 v17.8.0 and 3GPP TS 38.401 v17.3.0 regarding resource allocation procedures.',
    priority: 'medium',
    tags: ['3GPP TS 23.501', '3GPP TS 38.401'],
    time: '4 hours ago',
  },
  {
    title: 'Workflow Optimization',
    description: 'The IETF RFC monitoring workflow can be optimized by reducing the analysis interval from 24 hours to 12 hours, potentially improving response time by 40%.',
    priority: 'medium',
    tags: ['Workflow'],
    time: '6 hours ago',
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI assistant for telecom standards management. I can help you analyze documents, track version changes, predict update patterns, and automate workflows. What would you like to know?",
      timestamp: '10:30 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I understand you're asking about " + inputValue + ". Let me analyze the current standards data and provide you with relevant insights. Based on the latest analysis, I can help you with specific recommendations for your telecom standards management needs.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const message = `Please ${action.title.toLowerCase()} for me.`;
    setInputValue(message);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="priority-high">high</Badge>;
      case 'medium':
        return <Badge className="priority-medium">medium</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Brain className="h-8 w-8 text-ai-primary" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground">
          Intelligent insights and automation for telecom standards management
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Chat Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-ai-primary">
                <Sparkles className="h-5 w-5" />
                AI Chat
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask questions about standards, versions, and workflows
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <ScrollArea className="h-96 w-full rounded-md border p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about standards, versions, or workflows..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-ai-primary hover:bg-ai-primary/90 text-ai-foreground"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 justify-start hover-lift"
                    onClick={() => handleQuickAction(action)}
                  >
                    <div className="flex items-start gap-3">
                      <action.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-ai-primary">
                <Lightbulb className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Intelligent analysis and recommendations
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <Card key={index} className="border border-border/50 hover-lift">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-foreground">{insight.title}</h4>
                        {getPriorityBadge(insight.priority)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {insight.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {insight.time}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-ai-primary" />
                AI Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-ai-primary/5 border border-ai-primary/20">
                  <div className="text-2xl font-bold text-ai-primary">94%</div>
                  <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20">
                  <div className="text-2xl font-bold text-success">1,429</div>
                  <div className="text-sm text-muted-foreground">Documents Processed</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">23</div>
                  <div className="text-sm text-muted-foreground">Updates Detected</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/20">
                  <div className="text-2xl font-bold text-warning">87%</div>
                  <div className="text-sm text-muted-foreground">Automation Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}