type TLayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-white font-pretendard min-w-screen">
      <main className="w-[inherit] sm:w-[600px] bg-indigo-50 min-h-screen shadow-xl relative inline-flex max-h-dvh">
        {children}
        <div id="modal" />
      </main>
    </div>
  );
};

export default Layout;
