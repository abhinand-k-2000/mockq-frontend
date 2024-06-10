import { useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import StackSelection from "../../components/candidate/StackSelection";
import TechnologySelection from "../../components/candidate/TechnologySelection";



const CandidateHome = () => {

  const [selecetedStack , setSelectedStack] = useState<string>('')
  const [selectedTech, setSelectedTech] = useState('')

  const handleSelectStack = (stack: string) => {
    setSelectedStack(stack)
    setSelectedTech('');
  }

  const handleSelectTech = (tech: string) => {
    setSelectedTech(tech)
  }

  return (
    <>
      <CandidateNavbar />

    {
      !selecetedStack ? (
        <StackSelection onSelectStack={handleSelectStack} />

      ) : (
        <TechnologySelection selectedStack={selecetedStack} onSelectTech={handleSelectTech} onSelectStack={handleSelectStack}/>
      ) 
    }


      
    </>
  );
};

export default CandidateHome;
