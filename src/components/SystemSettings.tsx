import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-[#2c3e50]">System Settings</h1>
        <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">General Settings</CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                defaultValue="Blood Sample Collection System"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Administrator Email</Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@bloodcollect.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">System Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">
                    UTC (Coordinated Universal Time)
                  </SelectItem>
                  <SelectItem value="est">
                    EST (Eastern Standard Time)
                  </SelectItem>
                  <SelectItem value="pst">
                    PST (Pacific Standard Time)
                  </SelectItem>
                  <SelectItem value="cst">
                    CST (Central Standard Time)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHours">Working Hours</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start Time" defaultValue="08:00" />
                <Input placeholder="End Time" defaultValue="18:00" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Assignment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">
              Auto-Assignment Configuration
            </CardTitle>
            <CardDescription>
              Automatic order assignment parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Auto-Assignment</Label>
                <p className="text-sm text-[#717182]">
                  Automatically assign orders to available executives
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="assignmentTimeout">
                Assignment Timeout (minutes)
              </Label>
              <Input id="assignmentTimeout" type="number" defaultValue="15" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxOrdersPerExecutive">
                Max Orders Per Executive
              </Label>
              <Input
                id="maxOrdersPerExecutive"
                type="number"
                defaultValue="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priorityHandling">Priority Handling</Label>
              <Select defaultValue="fifo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fifo">First In, First Out</SelectItem>
                  <SelectItem value="priority">Priority Based</SelectItem>
                  <SelectItem value="location">Location Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-[#717182]">
                  Send email alerts for system events
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Alerts</Label>
                <p className="text-sm text-[#717182]">
                  Send SMS for critical notifications
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Order Alerts</Label>
                <p className="text-sm text-[#717182]">
                  Notify when new orders are created
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Assignment Confirmations</Label>
                <p className="text-sm text-[#717182]">
                  Confirm successful order assignments
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input
                id="notificationEmail"
                type="email"
                defaultValue="notifications@bloodcollect.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">
              User Management Settings
            </CardTitle>
            <CardDescription>
              Account policies and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="60" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Password Requirements</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Security</SelectItem>
                  <SelectItem value="medium">Medium Security</SelectItem>
                  <SelectItem value="high">High Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-[#717182]">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Account Lockout</Label>
                <p className="text-sm text-[#717182]">
                  Lock accounts after failed login attempts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">System Maintenance</CardTitle>
            <CardDescription>
              Backup and maintenance configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Backups</Label>
                <p className="text-sm text-[#717182]">
                  Schedule regular database backups
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenanceWindow">Maintenance Window</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start Time" defaultValue="02:00" />
                <Input placeholder="End Time" defaultValue="04:00" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>System Status</Label>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#27ae60] rounded-full"></div>
                <span className="text-sm text-[#2c3e50]">
                  All systems operational
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Run System Diagnostics
            </Button>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">API Configuration</CardTitle>
            <CardDescription>
              External API settings and integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiBaseUrl">API Base URL</Label>
              <Input
                id="apiBaseUrl"
                defaultValue="https://api.bloodcollect.com/v1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                defaultValue="••••••••••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://your-webhook-url.com"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API Rate Limiting</Label>
                <p className="text-sm text-[#717182]">
                  Enable API rate limiting
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button variant="outline" className="w-full">
              Test API Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
