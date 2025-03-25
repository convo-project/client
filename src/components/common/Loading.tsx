import LoadingIcon from "../../assets/icon/LoadingIcon.svg";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full m-auto">
      <div className="flex flex-col items-center justify-center gap-10">
        <img src={LoadingIcon} alt="로딩 아이콘" width={62} height={62} className="animate-[spin_5s_linear_infinite]" />
        <span className="font-medium text-neutral-500">잠시만 기다려 주세요.</span>
      </div>
    </div>
  );
};

export default Loading;
