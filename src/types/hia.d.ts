export type HIAAppMeta = {
  appRef: string;
  appId: string;
  createdAt: string;
  packageName: string;
  packageId: string;
  currentStatus: string;
  media: [
    {
      fileType: string;
      url: string;
      _id: string;
    }
  ];
  retrofittingType: string;
  appStage: number;
  address: {
    cityOrProvince: string;
    country: string;
    zipcode: string;
    firstLineAddress: string;
  };
  offerId: string;
  offerStatus: string;
  offer: string;
  retrofittingType: string;
  appStage: number;
  address: {
    cityOrProvince: string;
    country: string;
    zipcode: string;
    firstLineAddress: string;
  };
  hia: { _id: string; name: string };
  subcontractors: [{ _id: string; name: string }];
  hia: { _id: string; name: string };
  subcontractors: [{ _id: string; name: string }];
};
