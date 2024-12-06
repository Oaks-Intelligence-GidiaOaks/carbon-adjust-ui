import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
// import Francis from "../../assets/Francis.svg";
// import Morea from "../../assets/Morea.svg";
// import Maria from "../../assets/Maria.svg";

const Review = () => {
  // const [_, setRating] = useState(0);

  // // Catch Rating value
  // const handleRating = (rate: any) => {
  //   setRating(rate);

  //   // other logic
  // };
  // // Optinal callback functions
  // const onPointerEnter = () => console.log("Enter");
  // const onPointerLeave = () => console.log("Leave");
  // const onPointerMove = (value: any, index: any) => console.log(value, index);

  return (
    <div className=" font-poppins py-5 px-5 lg:px-0 bg-[#EDF2FF] max-width-[1440px]">
      <motion.div
        className="w-full my-20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl lg:text-[2.5rem] max:text-[3rem] md:leading-[60px] font-semibold text-center">
            <span className="text-[#043A3A]"> Listen to what our</span>
            <span className="text-[#0B8DFF]"> customers say</span>
          </h1>

          <p className="text-[#525252] font-[500] text-lg md:leading-[28px] my-10 max-w-[900px] font-Mulish">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            hendrerit suscipit egestas. Nunc eget congue ante. Vivamus ut sapien
            et ex volutpat tincidunt eget at felis vivamus hendrerit.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="w-full lg:container mb-20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ReviewCard
            name="simon cooper"
            description="Phasellus fermentum orci non nunc fermentum mattis. In eleifend vehicula justo, sed pulvinar erat scelerisque vel. Vestibulum eu erat elit. Etiam mattis feugiat finibus."
            ratingValue={5}
          />
          <ReviewCard
            name="simon cooper"
            description="Phasellus fermentum orci non nunc fermentum mattis. In eleifend vehicula justo, sed pulvinar erat scelerisque vel. Vestibulum eu erat elit. Etiam mattis feugiat finibus."
            ratingValue={5}
          />
          <ReviewCard
            name="simon cooper"
            description="Phasellus fermentum orci non nunc fermentum mattis. In eleifend vehicula justo, sed pulvinar erat scelerisque vel. Vestibulum eu erat elit. Etiam mattis feugiat finibus."
            ratingValue={5}
          />
          <ReviewCard
            name="simon cooper"
            description="Phasellus fermentum orci non nunc fermentum mattis. In eleifend vehicula justo, sed pulvinar erat scelerisque vel. Vestibulum eu erat elit. Etiam mattis feugiat finibus."
            ratingValue={5}
          />
          <ReviewCard
            name="simon cooper"
            description="Phasellus fermentum orci non nunc fermentum mattis. In eleifend vehicula justo, sed pulvinar erat scelerisque vel. Vestibulum eu erat elit. Etiam mattis feugiat finibus."
            ratingValue={5}
          />
          <ReviewCard
            name="simon cooper"
            description="Phasellus fermentum orci non nunc fermentum mattis. In eleifend vehicula justo, sed pulvinar erat scelerisque vel. Vestibulum eu erat elit. Etiam mattis feugiat finibus."
            ratingValue={5}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Review;

interface ReviewCardProps {
  name: string;
  description: string;
  ratingValue: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  description,
  ratingValue,
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 flex flex-col gap-3 justify-center max-w-[500px] shadow-2xl">
      <div className="flex items-center gap-5">
        <div className="w-[70px] h-[70px] p-3 flex items-center justify-center rounded-[50%] bg-gray-400 "></div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#043A3A] lg:text-xl font-semibold leading-10 font-Bricolage">
            {name}
          </h2>
          <div className="flex gap-2">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <FaStar
                  size={16}
                  key={idx}
                  color={idx < ratingValue ? "#ffcc00" : "#ffcc00"} // Use yellow color code (#ffcc00) for filled stars
                  // onMouseEnter={() => props.onPointerEnter(idx + 1)}
                  // onMouseLeave={props.onPointerLeave}
                  // onClick={() => props.handleRating(idx + 1)}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[#404745] text-base mt-2 font-Mulish">{description}</p>
      </div>
    </div>
  );
};
