import { useState, useEffect } from "react";
import CarouselImage1 from "../../assets/CarouselImage1.svg";
import CarouselImage2 from "../../assets/CarouselImage2.svg";
import CarouselImage3 from "../../assets/CarouselImage3.svg";

// const breakPoints = [
//   { width: 1, itemsToShow: 1 },
//   { width: 550, itemsToShow: 1, itemsToScroll: 1 },
//   { width: 768, itemsToShow: 1 },
//   { width: 1200, itemsToShow: 1 },
// ];

function CarouselComponent() {
  const [items, setItems] = useState<any>([
    {
      title: "Apply to Aggregators for Carbon Credit",
      description:
        "Home occupants/owners can send applications for carbon credit with ease and get best rewards for their retrofitting activities.",
      icon: CarouselImage1,
    },
    {
      title: "Apply to Home Improvement Agencies to retrofit your home",
      description:
        "Home occupants/owners can send applications to Home improvement agencies for retrofitting of their homes by finding HIAs closer to them and selecting from a list of available packages.",
      icon: CarouselImage2,
    },
    {
      title: "Apply to Financial Institutions for Financial aid",
      description:
        "Home occupants/owners can send applications to Financial Institutions to finance the cost of retrofitting their homes by finding Financial Institutions closer to them and selecting from a list of available financial packages.",
      icon: CarouselImage3,
    },
  ]);

  const [_, setCurrentIndex] = useState(0);

  const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };

  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };

  // const handleOnReachEnd = () => {
  //   // Reset index to 0 when reaching the end
  //   setCurrentIndex(0);
  // };

  useEffect(() => {
    const carouselElement = document.querySelector(".rec-carousel");

    if (carouselElement) {
      // Attach event listener for reaching the end of the carousel
      const handleReachEnd = () => {
        // Reset index to 0 when reaching the end
        setCurrentIndex(0);
      };

      carouselElement.addEventListener("reachEnd", handleReachEnd);

      // Cleanup: Remove event listener when component unmounts
      return () => {
        carouselElement.removeEventListener("reachEnd", handleReachEnd);
      };
    }
  }, []);

  // const itemsPerPage = 1
  // const carouselRef = useRef(null);
  // const totalPages = 3;
  // let resetTimeout: NodeJS.Timeout;

  return (
    <div id="learn-more" className="">
      <div className="">
        <button onClick={removeItem}></button>
        <button onClick={addItem}></button>
      </div>{" "}
      <div className="">
        {/* <Carousel>
        {items.map(item => <div key={item.id}>{item.title}</div>)}
      </Carousel> */}
      </div>
    </div>
  );
}

export default CarouselComponent;
