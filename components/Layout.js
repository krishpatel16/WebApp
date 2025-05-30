import Head from 'next/head';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      {children}
    </div>
  );
}
export default Layout;