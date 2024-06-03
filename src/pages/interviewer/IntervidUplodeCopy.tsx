import InterviewerNavbar from '../../components/interviewer/InterviewerNavbar'

const InterviewerUploads = () => {
  return (
    <div>
    <InterviewerNavbar/>
    <div className='h-36'>

        </div>
    <div className="max-w-md mx-auto  bg-white rounded-lg overflow-hidden shadow-md">
        
  <form className="p-6 space-y-6 ">
    <div>
      <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
      <input id="years_experience" name="years_experience" type="number" className="mt-1 p-2 block w-full border-gray-300 rounded-md border-2" />
    </div>
    <div>
      <label htmlFor="current_designation" className="block text-sm font-medium text-gray-700">Current Designation</label>
      <input id="current_designation"  name="current_designation" type="text" className="mt-1 p-2 block w-full border-gray-300 border-2 rounded-md" />
    </div>
    <div>
      <label htmlFor="organisation" className="block text-sm font-medium text-gray-700">Organisation</label>
      <input id="organisation" name="organisation" type="text" className="mt-1 p-2 block w-full border-gray-300 rounded-md border-2" />
    </div>
    <div>
      <label htmlFor="college" className="block text-sm font-medium text-gray-700">College</label>
      <input id="college" name="college" type="text" className="mt-1 p-2 block w-full border-gray-300 rounded-md border-2" />
    </div>
    <div>
      <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">Introduction</label>
      <textarea id="introduction" name="introduction" className="mt-1 p-2 block w-full border-gray-300 rounded-md border-2"></textarea>
    </div>
    <div>
      <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
      <input id="profile_picture" name="profile_picture" type="file" accept="image/*" className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
    </div>
    <div>
      <label htmlFor="salary_slip" className="block text-sm font-medium text-gray-700">Salary Slip</label>
      <input id="salary_slip" name="salary_slip" type="file" accept="image/*" className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
    </div>
    <div>
      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
      <input id="resume" name="resume" type="file" accept=".pdf" className="mt-1 p-2 block w-full border-gray-300 rounded-md" />
    </div>
    <div>
      <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600">Upload</button>
    </div>
  </form>
</div>

    </div>
)
}

export default InterviewerUploads






    // const handleImageUpload = (event:  React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if(file){
    //         console.log(file)
    //     }
    // }