type TLayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center bg-white font-pretendard min-w-screen">
      <main className="w-[inherit] sm:w-[600px] bg-indigo-50 min-h-screen shadow-xl relative flex-col inline-flex max-h-dvh">
        {children}
      </main>
    </div>
  );
};

export default Layout;
