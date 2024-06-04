import FaqImg from "../../assets/Faq.svg";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const Faq = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (isExpanded: any, panel: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="lg:container font-poppins mt-10 pb-2 ">
      <div className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:pr-20 lg:pl-8">
          <div className="lg:w-2/5">
            <img src={FaqImg} className="bg-cover " alt="" />
          </div>

          {/* Accordion */}

          <div className="lg:w-3/5">
            <div className="px-4">
              <h2 className="text-lg flex items-center  font-poppins text-ca-blue font-medium">
                Frequently Asked Questions
              </h2>
              <div>
                <p className="text-xs mb-4 font-poppins mt-6  flex">
                  Our FAQ section is designed to provide clarity and insight
                  into Carbon Adjust. Discover comprehensive answers to common
                  inquiries about carbon credits, trading, project selection,
                  verification, and more. Save time and gain a deeper
                  understanding of our platform's features and benefits.
                </p>
              </div>
            </div>

            <div
              style={{ overflowY: "auto", maxHeight: "300px" }}
              className="scrollbar-vertical p-4"
            >
              <Accordion
                expanded={expanded === "panel1"}
                onChange={(isExpanded) => handleChange(isExpanded, "panel1")}
              >
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className="text-xs text-ca-blue tracking-[1px] h-[20px] flex items-center">
                    <span className="text-xs font-poppins">
                      Who can use Carbon Adjust?
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: "#EFEBF1" }}>
                  <Typography>
                    <p className="text-xs font-poppins">
                      {" "}
                      Carbon Adjust serves a diverse user base, including home
                      occupants, financial institutions, SMEs/home improvement
                      agencies, aggregators, and Individuals.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={(isExpanded) => handleChange(isExpanded, "panel2")}
                className=""
              >
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className="text-xs text-ca-blue tracking-[1px] mx-[20px] h-[20px] flex items-center">
                    <span className="text-xs font-poppins">
                      What is the verification process like?
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: "#EFEBF1" }}>
                  <Typography>
                    <p className="text-xs font-poppins">
                      {" "}
                      Carbon Adjust conducts a thorough verification process to
                      ensure the authenticity of users and organizations. This
                      involves document verification and review to maintain a
                      secure environment.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={(isExpanded) => handleChange(isExpanded, "panel3")}
                className=""
              >
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className="text-xs text-ca-blue tracking-[1px] mx-[20px]  flex items-center">
                    <span className="text-xs font-poppins">
                      How can I monitor the performance of my carbon credits?
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: "#EFEBF1" }}>
                  <Typography>
                    <p className="text-xs font-poppins">
                      {" "}
                      Carbon Adjust provides a user-friendly dashboard where you
                      can track the performance of your carbon credit
                      investments and view your carbon reduction impact.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={(isExpanded) => handleChange(isExpanded, "panel4")}
                className=""
              >
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className="text-xs text-ca-blue tracking-[1px] mx-[20px] h-[20px] flex items-center">
                    <span className="text-xs font-poppins">
                      How does Carbon Adjust contribute to a sustainable future?
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: "#EFEBF1" }}>
                  <Typography>
                    <p className="text-xs font-poppins">
                      {" "}
                      Carbon Adjust supports projects that reduce carbon
                      emissions, combat climate change, and promote
                      environmental sustainability. Your investments directly
                      contribute to a greener planet.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel5"}
                onChange={(isExpanded) => handleChange(isExpanded, "panel5")}
                className=""
              >
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className="text-xs text-ca-blue tracking-[1px] mx-[20px] h-[20px] flex items-center">
                    <span className="text-xs font-poppins">
                      How do I stay informed about new carbon credit
                      opportunities?
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: "#EFEBF1" }}>
                  <Typography>
                    <p className="text-xs font-poppins">
                      {" "}
                      Carbon Adjust regularly updates users about new projects
                      and investment opportunities through email notifications
                      and our platform.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
