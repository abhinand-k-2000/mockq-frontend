import { useEffect, useState } from "react";
import { blockCandidate, getCandidates } from "../../api/adminApi";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  isBlocked: boolean;
}


const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [block, setBlock] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [search, setSearch] = useState('')

  const handleSearch = (name: string) => {
    setSearch(name)
    console.log(name)
  }
  const filteredCandidates = candidates.filter((candidate) => candidate.name.toLowerCase().includes(search.toLowerCase()))

  const handleBlock = async (
    candidateId: string,
    candidateBlocked: boolean
  ) => {
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
      console.log(error);
    }
  };

  const fetchCandidates = async () => {
    const candidatesList = await getCandidates();
    setCandidates(candidatesList.data);
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
    <>
      {/*----------------------------------- Modal for block/unblock confirmation--------------------------------------------- */}

      <Dialog open={openModal} handler={handleCloseModal}>
        <DialogHeader>
          {selectedCandidate?.isBlocked
            ? "Unblock Candidate"
            : "Block Candidate"}
        </DialogHeader>
        <DialogBody>
          Are you sure you want to{" "}
          {selectedCandidate?.isBlocked ? "unblock" : "block"}{" "}
          {selectedCandidate?.name}?
        </DialogBody>
        <DialogFooter>
          <Button   
            variant="text"
            color="red"
            onClick={handleCloseModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() =>
              handleBlock(
                selectedCandidate?._id as string,
                selectedCandidate?.isBlocked as boolean
              )
            }
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/*-----------------------------------End of Modal for block/unblock confirmation--------------------------------------------- */}

      <div className="p-5 bg-gray-200 rounded-md  flex items-center">
        <input
          type="text"
          className="border-black border-1 px-5 w-1/4 py-1 rounded-md "
          placeholder="Search for candidates"
          value={search}
          onChange={(e)=> handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Mobile
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCandidates.map((candidate, index) => (
                    <tr key={candidate._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {candidate.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {candidate.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {candidate.mobile}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={
                            () => handleOpenModal(candidate)
                            // handleBlock(candidate._id, candidate.isBlocked)
                          }
                          className={`${
                            candidate.isBlocked
                              ? "px-6 py-2 text-sm bg-green-600 rounded-md text-white font-medium"
                              : "px-6 py-2 text-white rounded-md bg-red-700 text-sm font-medium"
                          }`}
                        >
                          {candidate.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidates;
