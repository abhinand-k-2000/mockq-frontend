import { useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import StackSelection from "../../components/candidate/StackSelection";
import TechnologySelection from "../../components/candidate/TechnologySelection";
import InterviewerSelection from "../../components/candidate/InterviewerSelection";



const CandidateHome = () => {


  const [selectedStack , setSelectedStack] = useState<string>('')
  const [selectedTech, setSelectedTech] = useState<string>('')

  const handleSelectStack = (stack: string) => {      
    setSelectedStack(stack)
    setSelectedTech('');
  }

  const handleSelectTech = (tech: string) => {
    setSelectedTech(tech)
  }


  return (
    <div className="flex flex-col min-h-screen  ">
      <CandidateNavbar />
      <div className="flex-grow ">
        {!selectedStack ? (
          <StackSelection onSelectStack={handleSelectStack} />
        ) : !selectedTech ? (
          <TechnologySelection
            selectedStack={selectedStack}
            onSelectTech={handleSelectTech}
            onSelectStack={handleSelectStack}
          />
        ) : (
          <InterviewerSelection
            selectedTech={selectedTech}
            onSelectTech={handleSelectTech}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateHome;
