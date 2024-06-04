import { FaStar } from "react-icons/fa";
import Francis from "../../assets/Francis.svg";
import Morea from "../../assets/Morea.svg";
import Maria from "../../assets/Maria.svg";

const Review = (props: any) => {
  const starSize = 16;
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
    <div className=" font-poppins pb-10 bg-[#4688E9]">
      <div className="pt-8 lg:container">
        <h2 className="text-2xl  font-poppins text-white font-medium flex justify-center items-center ">
          Reviews
        </h2>
        <div className=" bg-white rounded mx-4  lg:mx-40 mt-8 ">
          <div className=" flex items-center justify-center px-2 lg:px-4 py-1">
            <div>
              <div className="flex items-center gap-2">
                <img src={Francis} alt="" />
                <h2 className="text-sm text-left text-ca-blue">Maria Cooper</h2>
              </div>

              <div className="pl-10">
                <div className="flex item pt-1  gap-6">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <FaStar
                          size={starSize}
                          key={idx}
                          color={
                            idx < props.ratingValue ? "#ffcc00" : "#ffcc00"
                          } // Use yellow color code (#ffcc00) for filled stars
                          onMouseEnter={() => props.onPointerEnter(idx + 1)}
                          onMouseLeave={props.onPointerLeave}
                          onClick={() => props.handleRating(idx + 1)}
                        />
                      ))}
                  </div>

                  <div>
                    <p className=" text-ca-blue text-sm">
                      {" "}
                      4/5 - Exceptional and Essential
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs pt-2 font-poppins">
                    Wow, I am thoroughly impressed with this software
                    application! From the moment I started using it, I could
                    tell that it was meticulously designed with the user in
                    mind. The interface is incredibly intuitive, allowing even
                    those without much technical expertise to dive right in and
                    start using its powerful features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded mx-4  lg:mx-40 mt-1 pb-2">
          <div className=" flex items-center justify-center px-2 lg:px-4 py-1">
            <div>
              <div className="flex items-center gap-2">
                <img src={Morea} alt="" />
                <h2 className="text-sm text-left text-ca-blue">Maria Cooper</h2>
              </div>

              <div className="pl-10">
                <div className="flex item pt-1  gap-6">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <FaStar
                          size={starSize}
                          key={idx}
                          color={
                            idx < props.ratingValue ? "#ffcc00" : "#ffcc00"
                          } // Use yellow color code (#ffcc00) for filled stars
                          onMouseEnter={() => props.onPointerEnter(idx + 1)}
                          onMouseLeave={props.onPointerLeave}
                          onClick={() => props.handleRating(idx + 1)}
                        />
                      ))}
                  </div>

                  <div>
                    <p className=" text-ca-blue text-sm">
                      {" "}
                      4/5 - Exceptional and Essential
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs pt-2 font-poppins">
                    Wow, I am thoroughly impressed with this software
                    application! From the moment I started using it, I could
                    tell that it was meticulously designed with the user in
                    mind. The interface is incredibly intuitive, allowing even
                    those without much technical expertise to dive right in and
                    start using its powerful features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded mx-4  lg:mx-40 mt-1 pb-2">
          <div className=" flex items-center justify-center px-2 lg:px-4 py-1">
            <div>
              <div className="flex items-center gap-2">
                <img src={Maria} alt="" />
                <h2 className="text-sm text-left text-ca-blue">Maria Cooper</h2>
              </div>

              <div className="pl-10">
                <div className="flex item pt-1  gap-6">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <FaStar
                          size={starSize}
                          key={idx}
                          color={
                            idx < props.ratingValue ? "#ffcc00" : "#ffcc00"
                          } // Use yellow color code (#ffcc00) for filled stars
                          onMouseEnter={() => props.onPointerEnter(idx + 1)}
                          onMouseLeave={props.onPointerLeave}
                          onClick={() => props.handleRating(idx + 1)}
                        />
                      ))}
                  </div>

                  <div>
                    <p className=" text-ca-blue text-sm">
                      {" "}
                      4/5 - Exceptional and Essential
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs pt-2 font-poppins">
                    Wow, I am thoroughly impressed with this software
                    application! From the moment I started using it, I could
                    tell that it was meticulously designed with the user in
                    mind. The interface is incredibly intuitive, allowing even
                    those without much technical expertise to dive right in and
                    start using its powerful features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
