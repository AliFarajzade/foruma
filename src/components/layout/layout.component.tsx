import Navbar from '../navbar/navbar.component'

type IProps = {
    children: React.ReactChild[]
}

const Layout: React.FC<IProps> = ({ children }) => (
    <>
        <Navbar />
        <main>{children}</main>
    </>
)

export default Layout
