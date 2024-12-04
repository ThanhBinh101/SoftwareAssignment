/* eslint-disable react/no-unescaped-entities */
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { HiPrinter } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-20 bg-primary px-8 py-4 ">
      <div className="flex items-center text-[18px]">
        <div className="flex flex-[2]">
          <h3 className="pr-2 border-r-[3px] border-black font-bold flex items-center">
            <HiPrinter className="inline-block mr-2" /> Smart Printing Service
          </h3>
          <p className="pl-2 italic">
            Fast Printing, Student Prices - The Perfect Solution for HCMUT's
            Student Documents.
          </p>
        </div>

        <div className="flex-[1]">
          <div className="flex items-center mb-2">
            <h3 className="mr-3 font-bold flex items-center">
              <FaPhoneAlt className="inline-block mr-2" />
              Contact Us:{" "}
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-[20px]">
                <FaFacebook />
              </div>
              <div className="text-[20px]">
                <FaInstagram />
              </div>
              <div className="w-[20px] aspect-square">
                <img src="/logo-school.png" alt="" />
              </div>
            </div>
          </div>
          <p className=" flex items-center">
            <span className="font-bold inline-flex items-center mr-2">
              <MdEmail className="inline-block mr-2" />
              Email:
            </span>{" "}
            hihihahaha@hcmut.edu.vn
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
