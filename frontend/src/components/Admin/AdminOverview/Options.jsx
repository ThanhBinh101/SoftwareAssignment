import CancelButton from "./CancelButton";
import ApplyChangesButton from "./ApplyChangesButton";

const Options = () => {
  return (
    <div className="p-5 ml-[100px] w-[1454px]">
      <div className="mb-3 flex items-center">
        <span className="font-normal text-3xl">Next refill in <span className="font-semibold">10 days</span></span>
        <input
          type="text"
          style={{ borderColor: '#A68BC1' }}
          className="ml-[10px] border rounded-[10px] w-[275px] h-[48px] px-2 py-1"
        />
        <img src="/Edit_fill.svg" alt="Edit" className="w-[24px] h-[24px]" />
        <i className="fas fa-pen ml-2"></i>
      </div>

      <div className="mb-[20px]">
        <p className="font-medium text-2xl mb-[20px] ">Acceptable file type</p>
        <div className="flex items-center space-x-[175px]"> 
          <div className="flex flex-col space-y-[27px]">
            <label className="flex items-center">
                <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
                />
                <span className="ml-2 text-xl">pdf</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">doc</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">docx</span>
            </label>
          </div>

          <div className="flex flex-col space-y-[27px] ">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">ppt</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">pdf</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">xls</span>
            </label>
          </div>

          <div className="flex flex-col space-y-[27px]"> 
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">pdf</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="fileType" 
                style={{ borderColor: '#A68BC1'}}
                className="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                checked:before:bg-[#A68BC1]"
              />
              <span className="ml-2 text-xl">txt</span>
            </label>
            <label class="flex items-center">
            <input 
                type="radio" 
                name="fileType"
                style={{ borderColor: '#A68BC1'}}
                class="appearance-none h-5 w-5 border border-gray-300 rounded-full bg-[#F7BCD6] relative
                    before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:h-3 before:w-3 
                    before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
                    checked:before:bg-[#A68BC1]"
            />
            <span class="ml-2 text-xl">pptx</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <label className="font-medium text-2xl mr-[40px]">Price</label>
          <input type="text" style={{ borderColor: '#A68BC1' }} className="bg-white border rounded-[16px] w-[120px] h-[48px] px-2 py-1 mx-2" />
          <span className="font-normal">VND /</span>
          <input type="text" style={{ borderColor: '#A68BC1' }} className="bg-white border rounded-[16px] w-[120px] h-[48px] px-2 py-1 mx-2" />
          <span className="font-normal">Papers</span>
          <img src="/Edit_fill.svg" alt="Edit" className="w-[24px] h-[24px]" />
          <i className="fas fa-pen ml-2"></i>
      </div>

      <div className="mb-4">
        <p className="font-medium text-2xl">Available Pay amount</p>
        <div className=" grid-cols-5 grid p-0 mt-[10px] w-[670px]">
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 ">5.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 ">10.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 ">20.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 ">50.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 ">100.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 mt-[10px]">200.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 mt-[10px]">200.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 mt-[10px]">200.000</button>
          <button style={{ borderColor: '#A68BC1' }} className="bg-white font-medium border rounded-[16px] w-[120px] h-[48px] px-2 py-1 mt-[10px]">200.000</button>
          <button style={{ color: '#A68BC1' }} className="bg-[#A68BC133] rounded-[16px] mt-[10px] w-[120px] h-[48px] text-4xl font-bold">+</button>
        </div>
      </div>

      <div className="flex items-center space-x-20 ml-[42px] ">
        <div className="bg-[#FEC8D8] text-xl rounded-[25px] mt-[5px] w-[245px] flex items-center justify-center h-[52px]">
          <CancelButton />
        </div>
        <div className="bg-[#97D99D] text-xl rounded-[25px] mt-[5px] w-[245px] flex items-center justify-center h-[52px]">
          <ApplyChangesButton />
        </div>
      </div>
    </div>
  );
};

export default Options;
