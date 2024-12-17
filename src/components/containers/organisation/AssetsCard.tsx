import { IAsset } from "@/interfaces/organisation.interface";
import VehicleDetail from "../transport/TransportDetail";



const AssetCard: React.FC<IAsset> = ({
    deviceInfo,
    assetType,
    approvalStatus,
  }) => {
 
    
    // "assets": [
    //                 {
    //                     "_id": "675c57aa215b85be15fc1128",
    //                     "assetType": "DEVICE",
    //                     "approvalStatus": "APPROVED",
    //                     "createdAt": "2024-12-13T15:50:02.597Z",
    //                     "updatedAt": "2024-12-13T15:50:02.597Z",
    //                     "deviceInfo": {
    //                         "_id": "675c5788215b85be15fc1116",
    //                         "status": "activated",
    //                         "file": "https://storage.googleapis.com/carbon-adjust-file.appspot.com/9c56a426c8c12282abdcd206c35313d8.png",
    //                         "name": "new device",
    //                         "type": "Dish Washer",
    //                         "powerRating": 100,
    //                         "serialNos": "BING55rre",
    //                         "fixedCarbonOffsetProgress": 0,
    //                         "voltageLevel": 200,
    //                         "energySource": "Electricity",
    //                         "currentDispatchStatus": "scheduled",
    //                         "electricityProvider": "British Gas (Centrica)",
    //                         "creator": "67588d1af16be10ea8876b99",
    //                         "createdAt": "2024-12-13T15:49:28.929Z",
    //                         "updatedAt": "2024-12-13T15:49:28.929Z"
    //                     },
    //                     "buildingInfo": null
    //                 }
    //             ],


 

  return (
    <>
      <div className="flex flex-col bg-[#Fff] border rounded-lg py-5 sm:px-10 px-5 divide-y-2 ">
        <div className="flex justify-between items-center pb-3">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-sm font-normal text-gray-700">
                Asset Type
              </h3>
              <h4 className="text-sm font-semibold text-gray-600">
                {assetType}
              </h4>
            </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
              <h3 className="text-sm font-normal text-gray-700">
              Approval Status
              </h3>
              <h4 className="text-sm font-semibold text-gray-600">
                {approvalStatus}
              </h4>
            </div>
          </div>
          {/* {(totalProjectedCarbonOffset || totalEmission) && (
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleChecked(_id)}
              className="mr-4 cursor-pointer"
            />
          )} */}
        

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 py-5">
          <VehicleDetail title="ID" des={deviceInfo._id} />
          <VehicleDetail title="Name " des={deviceInfo.name} />
          <VehicleDetail title="Type" des={deviceInfo.type} />
        
        </div>
        {/* <div
          className={`flex flex-col sm:flex-row gap-5  items-start transition-all duration-500 ease-in-out overflow-hidden ${
            showMore
              ? "max-h-[1000px] opacity-100 visible py-5"
              : "max-h-0 opacity-0 invisible"
          }`}
          style={{ transitionProperty: "max-height, opacity" }}
        >
          <img
            src={transportPhoto}
            alt=""
            className="sm:w-[320px] w-[100%] h-[250px] rounded-md object-cover"
          />

          <div className="flex w-[250px] flex-col gap-[10px]">
            <div className="flex  justify-between gap-5">
              <VehicleDetail title="address" des={address} />
              <VehicleDetail title="city" des={city} />
            </div>
            <VehicleDetail title="emission factor" des={emissionFactor} />
          </div>
        </div>

        <div className="flex justify-center items-center p-3 ">
          <Button
            variant={"ghost"}
            className="gap-2"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                <span>Collapse</span>
                <FaAngleUp />
              </>
            ) : (
              <>
                <span>Expand</span>
                <FaAngleUp />
              </>
            )}
          </Button>
        </div> */}
        </div >
        
    </>
  );
};

export default AssetCard;
