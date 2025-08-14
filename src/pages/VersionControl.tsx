import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Download, GitCompare } from 'lucide-react';

const versionsData = [
  {
    version: 'v17.9.0',
    standard: '3GPP TS 23.501',
    releaseDate: '2024-06-15',
    status: 'current',
    impact: 'major',
    size: '2.4MB',
  },
  {
    version: 'v17.8.0',
    standard: '3GPP TS 23.501',
    releaseDate: '2024-03-20',
    status: 'deprecated',
    impact: 'minor',
    size: '2.3MB',
  },
  {
    version: 'v17.10.0-draft',
    standard: '3GPP TS 23.501',
    releaseDate: '2024-07-01',
    status: 'draft',
    impact: 'major',
    size: '2.5MB',
  },
];

const versionDetails = [
  {
    id: '3GPP TS 23.501 v17.9.0',
    status: 'current',
    releaseDate: '2024-06-15',
    author: '3GPP SA2',
    size: '2.4 MB',
    keyChanges: [
      'Enhanced 5G Core network procedures',
      'New service continuity mechanisms',
      'Updated security protocols',
    ],
  },
  {
    id: '3GPP TS 23.501 v17.8.0',
    status: 'deprecated',
    releaseDate: '2024-03-20',
    author: '3GPP SA2',
    size: '2.3 MB',
    keyChanges: [
      'Network slicing improvements',
      'Edge computing enhancements',
      'Bug fixes for roaming scenarios',
    ],
  },
];

export default function VersionControl() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVersions = versionsData.filter((version) => {
    const matchesSearch = version.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.version.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStandard = selectedStandard === 'all' || version.standard === selectedStandard;
    return matchesSearch && matchesStandard;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge className="status-current">current</Badge>;
      case 'deprecated':
        return <Badge className="status-deprecated">deprecated</Badge>;
      case 'draft':
        return <Badge className="status-draft">draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'major':
        return <Badge className="impact-major">major</Badge>;
      case 'minor':
        return <Badge className="impact-minor">minor</Badge>;
      default:
        return <Badge>{impact}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Version Control</h1>
          <p className="text-muted-foreground">
            Track and manage telecom standards versions
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary-hover text-primary-foreground">
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Versions
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Search Standards
              </label>
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Standard
              </label>
              <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                <SelectTrigger>
                  <SelectValue placeholder="All standards" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All standards</SelectItem>
                  <SelectItem value="3GPP TS 23.501">3GPP TS 23.501</SelectItem>
                  <SelectItem value="3GPP TS 38.401">3GPP TS 38.401</SelectItem>
                  <SelectItem value="IETF RFC 8200">IETF RFC 8200</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="5g-core">5G Core</SelectItem>
                  <SelectItem value="5g-ran">5G RAN</SelectItem>
                  <SelectItem value="protocol">Protocol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="version-history" className="space-y-6">
        <TabsList>
          <TabsTrigger value="version-history">Version History</TabsTrigger>
          <TabsTrigger value="standards-overview">Standards Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="version-history" className="space-y-6">
          {/* Version History Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Version History
                <Badge variant="secondary" className="ml-2">
                  {filteredVersions.length} versions
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Complete version history with change tracking
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Version</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Standard</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Release Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Impact</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Size</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVersions.map((version, index) => (
                      <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">{version.version}</td>
                        <td className="py-3 px-4 text-foreground">{version.standard}</td>
                        <td className="py-3 px-4 text-muted-foreground">{version.releaseDate}</td>
                        <td className="py-3 px-4">{getStatusBadge(version.status)}</td>
                        <td className="py-3 px-4">{getImpactBadge(version.impact)}</td>
                        <td className="py-3 px-4 text-muted-foreground">{version.size}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Version Detail Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {versionDetails.map((detail, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{detail.id}</CardTitle>
                    {getStatusBadge(detail.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Released on {detail.releaseDate} by {detail.author}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Changes:</h4>
                    <ul className="space-y-1">
                      {detail.keyChanges.map((change, changeIndex) => (
                        <li key={changeIndex} className="text-sm text-primary flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Size: {detail.size}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="standards-overview">
          <Card>
            <CardHeader>
              <CardTitle>Standards Overview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Overview of all standards in the system
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Standards overview content would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}