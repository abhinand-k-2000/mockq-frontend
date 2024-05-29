
import map from '/map.png'

const PromotionalAd = () => {
  return ( 
    <div className='h-screen  bg-[#D9E9FF] flex'>
        <div className="h-60 bg-[#D9E9FF] w-full text-center" >
            <h2 className="font-semibold text-2xl p-5 text-[#142057]">Experts from every domain to every company size</h2>
            <p className="text-[#142057] font-medium">1000+ active interviewers</p>
        </div>
        <div className="h-60 bg-[#D9E9FF] w-full items-center">
            <img className='w-3/4' src={map} alt="" />
        </div>
    </div>
  )
}

export default PromotionalAd