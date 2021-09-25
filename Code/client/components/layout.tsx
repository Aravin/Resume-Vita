import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />

      <main className="p-4">{children}</main>
      {/* <Footer /> */}
    </>
  )
}