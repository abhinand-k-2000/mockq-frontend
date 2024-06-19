import { useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import StackSelection from "../../components/candidate/StackSelection";
import TechnologySelection from "../../components/candidate/TechnologySelection";
import InterviewerSelection from "../../components/candidate/InterviewerSelection";



const CandidateHome = () => {


  const [selectedStack , setSelectedStack] = useState<string>('')
  const [selectedTech, setSelectedTech] = useState<string>('')
  const [selectedInterviewer, setSelectedInterviewer] = useState(null)

  console.log("HOME: ", selectedStack, selectedTech, selectedInterviewer)


  const handleSelectStack = (stack: string) => {      
    setSelectedStack(stack)
    setSelectedTech('');
    setSelectedInterviewer(null)
  }

  const handleSelectTech = (tech: string) => {
    setSelectedTech(tech)
    setSelectedInterviewer(null)
  }

  const handleSelectInterviewer = (interviewer: any) => {
    setSelectedInterviewer(interviewer);
    console.log("Inside handle select interviewer", selectedInterviewer)
  }

  return (
    <>
      <CandidateNavbar />

    {
      !selectedStack ? (
        <StackSelection onSelectStack={handleSelectStack} />

      ) : !selectedTech ? (
        <TechnologySelection selectedStack={selectedStack} onSelectTech={handleSelectTech} onSelectStack={handleSelectStack}/>
      ) : (
        <InterviewerSelection selectedTech={selectedTech} onSelectInterviewer={handleSelectInterviewer} onSelectTech={handleSelectTech}/>
      )
    }


      
    </>
  );
};

export default CandidateHome;
