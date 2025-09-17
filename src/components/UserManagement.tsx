import { useState } from "react";
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
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Download } from "lucide-react";
import { useGetUsersQuery } from "@/services/query/userQuery";
import { UserRole } from "@/lib/enums";
import type { FieldExecutiveType } from "@/lib/types";
import {
  useCreateUserMutation,
  useUpdateStatusMutation,
} from "@/services/query/userManagementQuery";
import type { UserCreateType } from "@/lib/types";
import { exportJsonToExcel } from "@/lib/exporters/reportExport";
import { cn } from "@/lib/utils";

export function UserManagement() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [userType, setUserType] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>(
    UserRole.field_executive
  );
  // const [adminRole, setAdminRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [fullName, setFullName] = useState("");
  // const [userIdInput, setUserIdInput] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const {
    data: response,
    isPending,
    isFetching,
  } = useGetUsersQuery(selectedTab);
  const { mutateAsync: updateStatus } = useUpdateStatusMutation();
  const { mutateAsync: createUser, isPending: createUserPending } =
    useCreateUserMutation();
  // const { mutateAsync: updateUser, isPending: updatePending } = useUpdateUserMutation()

  const handleAddUser = async () => {
    // Construct the user object
    const user: UserCreateType = {
      name: fullName,
      email,
      phone: "+91" + phone,
      role: userType === "admin" ? UserRole.admin : UserRole.field_executive,
    };
    await createUser(user);
    setShowAddUser(false);
    setUserType("");
    // setAdminRole("");
    setFullName("");
    setPhone("");
    setEmail("");
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSaveEdit = () => {
    // Handle save edit logic here
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
  };

  const filterUsers = () => {
    // setUserType(user);
    return response?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Export helpers per tab
  const exportFieldExecutives = () => {
    const rows = (filterUsers() ?? []).map((u: any) => ({
      "User ID": u.phone,
      Name: u.name,
      Email: u.email,
      Status: u.isActive ? "Active" : "Inactive",
    }));
    exportJsonToExcel("Field Executives", "Field_Executives", rows);
  };

  const exportAdministrators = () => {
    const rows = (filterUsers() ?? []).map((u: any) => ({
      "User ID": u.phone,
      Name: u.name,
      Email: u.email,
      Status: u.isActive ? "Active" : "Inactive",
      Role: u.role,
    }));
    exportJsonToExcel("Administrators", "Administrators", rows);
  };

  const exportHospitalStaff = () => {
    const rows = (filterUsers() ?? []).map((u: any) => ({
      "User ID": u.phone,
      Name: u.name,
      Email: u.email,
      Hospital: u.hospitalName,
      Status: u.isActive ? "Active" : "Inactive",
    }));
    exportJsonToExcel("Hospital Staff", "Hospital_Staff", rows);
  };

  const FieldExecutiveTable = ({
    users,
  }: {
    users: FieldExecutiveType[] | undefined;
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.phone}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>

            <TableCell>
              <Badge
                variant={user.isActive ? "default" : "secondary"}
                className={
                  user.isActive
                    ? "bg-[#27ae60] text-white"
                    : "bg-[#717182] text-white"
                }
              >
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>
                <Switch
                  onClick={() =>
                    updateStatus({ id: user.id, isActive: !user.isActive })
                  }
                  checked={user.isActive}
                  className={cn([
                    "data-[state=unchecked]:bg-secondary-foreground/20 ",
                  ])}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const AdministratorTable = ({ users }: { users: any[] | undefined }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.phone}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                variant={user.isActive ? "default" : "secondary"}
                className={
                  user.isActive
                    ? "bg-[#27ae60] text-white"
                    : "bg-[#717182] text-white"
                }
              >
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-[#717182]">
              {user.role}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Switch checked={user.status === "Active"} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const HospitalStaffTable = ({ users }: { users: any[] | undefined }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.phone}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.hospitalName}</TableCell>
            <TableCell>
              <Badge
                variant={user.isActive ? "default" : "secondary"}
                className={
                  user.isActive
                    ? "bg-[#27ae60] text-white"
                    : "bg-[#717182] text-white"
                }
              >
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogTrigger asChild>
            <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account for the system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger
                    className={`!h-12 w-full bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl $`}
                  >
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Field Executive</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* {userType === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="adminRole">Role</Label>
                  <Select value={adminRole} onValueChange={setAdminRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )} */}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  className="h-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  placeholder="Enter user ID"
                  value={userIdInput}
                  onChange={(e) => setUserIdInput(e.target.value)}
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182] font-medium ">
                    +91
                  </div>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className={`h-12 pl-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl $`}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              {/* {userType === "executive" && (
                <div className="space-y-2">
                  <Label htmlFor="coverage">Coverage Area</Label>
                  <Input id="coverage" placeholder="Enter coverage area" />
                </div>
              )} */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className={`h-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl $`}
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                className="bg-[#3498db] hover:bg-[#2980b9] text-white"
                disabled={createUserPending || !fullName || !email || !phone}
              >
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">System Users</CardTitle>
          <CardDescription>
            Manage all user accounts in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="field-executive" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-12 bg-[#f5f6fa] p-1">
              <TabsTrigger
                onClick={() => setSelectedTab(UserRole.field_executive)}
                value="field-executive"
                className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm"
              >
                Field Executive
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab(UserRole.admin)}
                value="administrator"
                className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm"
              >
                Administrator
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab(UserRole.hospital_staff)}
                value="hospital-staff"
                className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm"
              >
                Hospital Staff
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2 mt-6">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm border-black/10"
              />
            </div>

            <TabsContent value="field-executive" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-[#3498db] text-[#3498db]"
                  onClick={exportFieldExecutives}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
              {isPending || isFetching ? (
                <div>Loading...</div>
              ) : (
                <FieldExecutiveTable users={filterUsers()} />
              )}
            </TabsContent>

            <TabsContent value="administrator" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-[#3498db] text-[#3498db]"
                  onClick={exportAdministrators}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
              {isPending || isFetching ? (
                <div>Loading...</div>
              ) : (
                <AdministratorTable users={filterUsers()} />
              )}
            </TabsContent>

            <TabsContent value="hospital-staff" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-[#3498db] text-[#3498db]"
                  onClick={exportHospitalStaff}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
              {isPending || isFetching ? (
                <div>Loading...</div>
              ) : (
                <HospitalStaffTable users={filterUsers()} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Full Name</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#3498db] hover:bg-[#2980b9] text-white"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
