import React, { useEffect, useState } from "react";
import { blockCandidate, getCandidates } from "../../api/adminApi";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FiSearch, FiUser, FiMail, FiPhone, FiLock, FiUnlock } from "react-icons/fi";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  isBlocked: boolean;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [block, setBlock] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [search, setSearch] = useState('');

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = async (candidateId: string, candidateBlocked: boolean) => {
    try {
      const response = await blockCandidate(candidateId);
      if (response) {
        setBlock(!block);
        candidateBlocked
          ? toast.success("Candidate Unblocked Successfully")
          : toast.success("Candidate Blocked Successfully");
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating candidate status");
    }
  };

  const fetchCandidates = async () => {
    try {
      const candidatesList = await getCandidates();
      setCandidates(candidatesList.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch candidates");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [block]);

  const handleOpenModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Candidates</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for candidates"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCandidates.map((candidate, index) => (
                <tr key={candidate._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <FiUser className="h-10 w-10 rounded-full text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{candidate.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{candidate.mobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(candidate)}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        candidate.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        candidate.isBlocked ? "focus:ring-green-500" : "focus:ring-red-500"
                      }`}
                    >
                      {candidate.isBlocked ? (
                        <>
                          <FiUnlock className="mr-2" /> Unblock
                        </>
                      ) : (
                        <>
                          <FiLock className="mr-2" /> Block
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={openModal} handler={handleCloseModal}>
        <DialogHeader>
          {selectedCandidate?.isBlocked ? "Unblock Candidate" : "Block Candidate"}
        </DialogHeader>
        <DialogBody>
          Are you sure you want to {selectedCandidate?.isBlocked ? "unblock" : "block"} {selectedCandidate?.name}?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCloseModal} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color={selectedCandidate?.isBlocked ? "green" : "red"}
            onClick={() =>
              handleBlock(selectedCandidate?._id as string, selectedCandidate?.isBlocked as boolean)
            }
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Candidates;