import { assets } from "../assets/assets";
import Subscribe from "../components/Subscribe"
import Title from "../components/Title"
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img}/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>heyy hello ! have you ever been to reo to jamica or tokyo</p>
        <p>keep your hair done nails done like JENNIE</p>
        <b className="text-gray-800">Our Mission</b>
        <p>LA to Bangkok can't stop so we don't stop that's just my lifestyle</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY '} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
         <p className="text-gray-600">
            we prioritize quality above all. Every product we offer undergoes thorough checks and inspections to ensure it meets the highest standards. From sourcing to final delivery, our team is dedicated to maintaining consistency, reliability, and excellence in everything we do.</p>
        </div>
         <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>
            Convenience:
          </b>
          <p className="text-gray-600">
            we prioritize quality above all. Every product we offer undergoes thorough checks and inspections to ensure it meets the highest standards. From sourcing to final delivery, our team is dedicated to maintaining consistency, reliability, and excellence in everything we do. 
          </p>
         </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>
            Exceptional Customer Service:
          </b>
          <p className="text-gray-600">
            we prioritize quality above all. Every product we offer undergoes thorough checks and inspections to ensure it meets the highest standards. From sourcing to final delivery, our team is dedicated to maintaining consistency, reliability, and excellence in everything we do. 
          </p>
         </div>
      </div>
     <Subscribe/>
    </div>
  )
}

export default About
