import React, { useState } from 'react'; //Will be replaced with actual plagiarism detection logic
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { AlertTriangle, Eye, Filter } from 'lucide-react';

const Plagiarism: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState('all');
  const [minSimilarity, setMinSimilarity] = useState(50);

  const plagiarismReports = [
    {
      id: 1,
      assignment: 'Binary Search Implementation',
      studentA: 'Alice Johnson',
      studentIdA: 'S001',
      studentB: 'Bob Smith',
      studentIdB: 'S002',
      similarity: 92,
      status: 'flagged',
      date: '2025-10-05',
    },
    {
      id: 2,
      assignment: 'REST API Development',
      studentA: 'Charlie Brown',
      studentIdA: 'S003',
      studentB: 'Diana Prince',
      studentIdB: 'S004',
      similarity: 88,
      status: 'flagged',
      date: '2025-10-04',
    },
    {
      id: 3,
      assignment: 'Binary Search Implementation',
      studentA: 'Eve Martinez',
      studentIdA: 'S005',
      studentB: 'Frank Wilson',
      studentIdB: 'S006',
      similarity: 76,
      status: 'reviewed',
      date: '2025-10-03',
    },
    {
      id: 4,
      assignment: 'Sorting Algorithms',
      studentA: 'Grace Lee',
      studentIdA: 'S007',
      studentB: 'Henry Davis',
      studentIdB: 'S008',
      similarity: 68,
      status: 'cleared',
      date: '2025-09-30',
    },
    {
      id: 5,
      assignment: 'Database Design',
      studentA: 'Ivy Chen',
      studentIdA: 'S009',
      studentB: 'Jack Taylor',
      studentIdB: 'S010',
      similarity: 54,
      status: 'reviewed',
      date: '2025-09-28',
    },
  ];

  const assignments = ['all', ...new Set(plagiarismReports.map((r) => r.assignment))];

  const filteredReports = plagiarismReports
    .filter((r) => (selectedAssignment === 'all' ? true : r.assignment === selectedAssignment))
    .filter((r) => r.similarity >= minSimilarity);

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 85) return 'text-red-600 font-bold';
    if (similarity >= 70) return 'text-orange-600 font-semibold';
    return 'text-yellow-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'flagged':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle size={14} className="mr-1" />
            Flagged
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Under Review
          </span>
        );
      case 'cleared':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Cleared
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: plagiarismReports.length,
    flagged: plagiarismReports.filter((r) => r.status === 'flagged').length,
    reviewed: plagiarismReports.filter((r) => r.status === 'reviewed').length,
    cleared: plagiarismReports.filter((r) => r.status === 'cleared').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Plagiarism Detection</h1>
        <p className="text-gray-600 mt-1">Monitor code similarity across student submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Total Reports</p>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Flagged</p>
            <p className="text-3xl font-bold text-red-600">{stats.flagged}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Under Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.reviewed}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Cleared</p>
            <p className="text-3xl font-bold text-green-600">{stats.cleared}</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Assignment
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {assignments.map((assignment) => (
                  <option key={assignment} value={assignment}>
                    {assignment === 'all' ? 'All Assignments' : assignment}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Similarity: {minSimilarity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={minSimilarity}
              onChange={(e) => setMinSimilarity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                report.similarity >= 85
                  ? 'bg-red-50 border-red-200'
                  : report.similarity >= 70
                  ? 'bg-orange-50 border-orange-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{report.assignment}</h3>
                    {getStatusBadge(report.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="bg-white bg-opacity-60 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Student A</p>
                      <p className="font-semibold text-gray-800">{report.studentA}</p>
                      <p className="text-sm text-gray-600">{report.studentIdA}</p>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Student B</p>
                      <p className="font-semibold text-gray-800">{report.studentB}</p>
                      <p className="text-sm text-gray-600">{report.studentIdB}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Detected: {report.date}</span>
                    <span className={`font-bold ${getSimilarityColor(report.similarity)}`}>
                      Similarity: {report.similarity}%
                    </span>
                  </div>
                </div>

                <div className="ml-4 flex flex-col space-y-2">
                  <Button
                    variant="secondary"
                    onClick={() => console.log('View comparison', report.id)}
                    className="flex items-center space-x-2 text-sm px-3 py-2"
                  >
                    <Eye size={16} />
                    <span>Compare</span>
                  </Button>
                </div>
              </div>

              {report.similarity >= 85 && (
                <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start space-x-2">
                  <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-red-800">
                    <strong>High similarity detected!</strong> This submission requires immediate review.
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No plagiarism reports found matching your criteria.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Plagiarism;
