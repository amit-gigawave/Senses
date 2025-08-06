import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function FieldExecutiveManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddExecutive, setShowAddExecutive] = useState(false);

  const executives = [
    {
      id: 'FE001',
      name: 'Mike Rodriguez',
      phone: '+1 (555) 123-4567',
      email: 'mike.r@bloodcollect.com',
      status: 'Available',
      location: 'Downtown District',
      collectionsToday: 5,
      totalCollections: 127,
      rating: 4.8,
      joinDate: '2024-01-15',
      emergencyContact: '+1 (555) 987-6543'
    },
    {
      id: 'FE002',
      name: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      email: 'sarah.j@bloodcollect.com',
      status: 'Busy',
      location: 'Central Area',
      collectionsToday: 3,
      totalCollections: 89,
      rating: 4.9,
      joinDate: '2024-02-01',
      emergencyContact: '+1 (555) 876-5432'
    },
    {
      id: 'FE003',
      name: 'Jennifer Smith',
      phone: '+1 (555) 345-6789',
      email: 'jennifer.s@bloodcollect.com',
      status: 'Available',
      location: 'North District',
      collectionsToday: 4,
      totalCollections: 156,
      rating: 4.7,
      joinDate: '2023-11-20',
      emergencyContact: '+1 (555) 765-4321'
    },
    {
      id: 'FE004',
      name: 'David Kim',
      phone: '+1 (555) 456-7890',
      email: 'david.k@bloodcollect.com',
      status: 'Offline',
      location: 'Suburb Area',
      collectionsToday: 0,
      totalCollections: 94,
      rating: 4.6,
      joinDate: '2024-03-10',
      emergencyContact: '+1 (555) 654-3210'
    }
  ];

  const filteredExecutives = executives.filter(executive =>
    executive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    executive.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    executive.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-[#27ae60] text-white';
      case 'Busy':
        return 'bg-[#f39c12] text-white';
      case 'Offline':
        return 'bg-[#717182] text-white';
      default:
        return 'bg-[#3498db] text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-[#2c3e50]">Field Executive Management</h1>
        <Dialog open={showAddExecutive} onOpenChange={setShowAddExecutive}>
          <DialogTrigger asChild>
            <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
              Add New Executive
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Field Executive</DialogTitle>
              <DialogDescription>
                Create a new field executive account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="executiveName">Full Name</Label>
                  <Input id="executiveName" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="executivePhone">Phone Number</Label>
                  <Input id="executivePhone" placeholder="Enter phone number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="executiveEmail">Email Address</Label>
                <Input id="executiveEmail" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverageArea">Coverage Area</Label>
                <Input id="coverageArea" placeholder="Enter coverage area" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Emergency contact number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddExecutive(false)}>
                Cancel
              </Button>
              <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
                Create Executive
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Executive Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#2c3e50]">
              {executives.filter(e => e.status === 'Available').length}
            </div>
            <p className="text-sm text-[#717182]">Available Executives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#2c3e50]">
              {executives.reduce((sum, e) => sum + e.collectionsToday, 0)}
            </div>
            <p className="text-sm text-[#717182]">Collections Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Executive Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Executive Directory</CardTitle>
          <CardDescription>Manage field executive accounts and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search executives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" className="border-[#3498db] text-[#3498db]">
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Executive ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Coverage Area</TableHead>
                <TableHead>Today</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExecutives.map((executive) => (
                <TableRow key={executive.id}>
                  <TableCell className="font-medium">{executive.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-[#2c3e50]">{executive.name}</div>
                      <div className="text-sm text-[#717182]">{executive.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-[#717182]">{executive.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(executive.status)}>
                      {executive.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{executive.location}</TableCell>
                  <TableCell className="text-center">{executive.collectionsToday}</TableCell>
                  <TableCell className="text-center">{executive.totalCollections}</TableCell>
                  <TableCell>⭐ {executive.rating}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}