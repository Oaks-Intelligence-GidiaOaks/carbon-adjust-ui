import UserProfile from "@/components/sub-pages/user/Profile";
import { ProfileProps } from "@/types/general";

const Profile = ({ accountType }: ProfileProps) => {
  switch (accountType) {
    case "home-occupant":
      return <UserProfile />;
    default:
      break;
  }
};

export default Profile;
