import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const hideNavbar = pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="p-6">{children}</main>
    </>
  );
};

export default Layout;
