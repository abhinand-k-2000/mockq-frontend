import Footer from '../../components/welcome_page/Footer'
import Navbar from '../../components/welcome_page/Navbar'
import PromotionalAd from '../../components/welcome_page/PromotionalAd'
import StackDisplay from '../../components/welcome_page/StackDisplay'

const Welcome = () => {
  return (
    <div>
        <Navbar/>
        <StackDisplay />
        <PromotionalAd />
        <Footer />
    </div>
  )
}

export default Welcome