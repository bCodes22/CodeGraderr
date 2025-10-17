import React, { useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Users, ShieldCheck, BookOpen, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@university.edu',
      role: 'Student',
      status: 'Active',
      joinedAt: '2025-01-15',
    },
    {
      id: 2,
      name: 'Dr. Robert Smith',
      email: 'robert@university.edu',
      role: 'Professor',
      status: 'Active',
      joinedAt: '2024-08-20',
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily@university.edu',
      role: 'Grader',
      status: 'Active',
      joinedAt: '2025-02-10',
    },
    {
      id: 4,
      name: 'Bob Williams',
      email: 'bob@university.edu',
      role: 'Student',
      status: 'Inactive',
      joinedAt: '2024-09-01',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
  };

  const handleStatusToggle = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Role',
      accessor: 'role',
      render: (value: string, row: any) => (
        <select
          value={value}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Grader">Grader</option>
          <option value="Admin">Admin</option>
        </select>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value: string) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            value === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: 'Joined',
      accessor: 'joinedAt',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value: number, row: any) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedUser(row);
              setIsModalOpen(true);
            }}
            className="text-sm px-3 py-1"
          >
            View
          </Button>
          <Button
            variant={row.status === 'Active' ? 'danger' : 'success'}
            onClick={() => handleStatusToggle(value)}
            className="text-sm px-3 py-1"
          >
            {row.status === 'Active' ? 'Disable' : 'Enable'}
          </Button>
        </div>
      ),
    },
  ];

  const stats = {
    totalUsers: users.length,
    students: users.filter((u) => u.role === 'Student').length,
    professors: users.filter((u) => u.role === 'Professor').length,
    graders: users.filter((u) => u.role === 'Grader').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage users and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalUsers}</p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.students}</p>
            </div>
            <BookOpen className="text-green-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Professors</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.professors}</p>
            </div>
            <ShieldCheck className="text-yellow-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Graders</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{stats.graders}</p>
            </div>
            <Settings className="text-blue-600" size={40} />
          </div>
        </Card>
      </div>

      <Card title="User Management">
        <Table columns={columns} data={users} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900 mt-1">{selectedUser.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900 mt-1">{selectedUser.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <p className="text-gray-900 mt-1">{selectedUser.role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="text-gray-900 mt-1">{selectedUser.status}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Joined Date</label>
              <p className="text-gray-900 mt-1">
                {new Date(selectedUser.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
