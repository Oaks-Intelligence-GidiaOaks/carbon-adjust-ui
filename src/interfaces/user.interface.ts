// export interface IUser extends Document {
//     readonly _id?: mongoose.Schema.Types.ObjectId;
//     name: string;
//     readonly email: string;
//     password: string;
//     readonly hasAcceptTerms: boolean;
//     readonly roles: AppRoles[];
//     status: UserStatus;
//     readonly statusUpdatedAt?: Date;
//     readonly statusUpdatedBy?: mongoose.Types.ObjectId;
//     readonly hasEmailVerified?: boolean;
//     readonly activationCode?: string;
//     readonly activationExpiry?: Date;
//     readonly emailActivatedAt?: Date;
//     passwordUpdatedAt: Date;
//     readonly hasPhoneNosVerified?: boolean;
//     readonly phoneNosVerifiedAt?: Date;
//     phoneNos?: string;
//     address?: IUserAddress;
//     isInternalMerchant?: boolean;
//     readonly doc?: IUserDoc | IUserDoc[];
//     readonly dateFormed?: Date;
//     contactName?: string;
//     contactEmail?: string;
//     bio?: string;
//     readonly step?: number;
//     merchantType?: MerchantType;
//     nonFinMerchantType?: NonFinancialMerchantType;
//     phoneVerifyToken?: number;
//     readonly createdAt?: IDate['createdAt'];
//     readonly updatedAt?: IDate['updatedAt'];
//     dp?: string;
//     passwordLastResetAt?: IDate['createdAt'];
//     readonly accessLevel?: StaffAccessLevel[];
//     readonly creator?: mongoose.Schema.Types.ObjectId;
//   }

export enum UserRole {
  MERCHANT = "STAFFSTAFF",
  HOME_OCCUPANT = "HOME_OCCUPANT",
  ADMIN = "ADMIN",
  ADMIN_STAFF = "ADMIN_STAFF",
  STAFF = "STAFF",
  REPORT_MERCHANT = "REPORT_MERCHANT",
}
