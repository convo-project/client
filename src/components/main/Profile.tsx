import { FaUser } from "react-icons/fa6";
import 치이카와 from "../../assets/image/치이카와.jpg";

const Profile = ({}: {}) => {
  const profileImg = true;
  return (
    <div className="flex items-center gap-[20px] w-full h-[120px] p-[20px] bg-white rounded-[5px] border-2 border-indigo-200">
      {profileImg ? (
        <img src={치이카와} alt="프로필 이미지" className="w-[80px] h-[80px] object-cover rounded-[10px]" />
      ) : (
        <div className="flex justify-center items-center w-[80px] h-[80px] bg-indigo-200 rounded-[10px]">
          <FaUser className="text-indigo-900 w-[50px] h-[50px]" />
        </div>
      )}
      <div className="flex flex-col justify-center gap-[10px] overflow-hidden">
        <span className="font-bold text-[20px]">{"모몽가"}</span>
        <span className="font-medium text-[16px] truncate">
          {"모몽가는 세상에서 제일 귀여워 ㅇㅈ? 모몽가는 세상에서 제일 귀여워 ㅇㅈ?"}
        </span>
      </div>
    </div>
  );
};

export default Profile;
