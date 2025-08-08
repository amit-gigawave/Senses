type TopbarProps = {
  title: string;
  userName?: string;
  userEmail?: string;
};

export default function Topbar({ title, userName, userEmail }: TopbarProps) {
  return (
    <header className="bg-white border-b border-[#e9ebef] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-[#2c3e50]">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-[#2c3e50]">{userName}</p>
            <p className="text-xs text-[#717182]">{userEmail}</p>
          </div>
          <div className="w-8 h-8 bg-[#3498db] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {userName ? userName.charAt(0) : ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
