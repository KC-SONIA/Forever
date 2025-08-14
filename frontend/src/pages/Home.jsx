import Bestseller from '../components/Bestseller'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import Ourpolicy from '../components/Ourpolicy'
import Subscribe from '../components/Subscribe'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <Bestseller/>
      <Ourpolicy/>
      <Subscribe/>
    </div>
  )
}

export default Home
