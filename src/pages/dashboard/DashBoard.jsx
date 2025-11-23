import Header from "../../components/header/Header"
import CreateLinkForm from "../../components/create-link/CreateLinkForm"
import LinkList from "../../components/link-list/LinkList"

const DashBoard = () => {
  return (
    <>
      <Header />
      <CreateLinkForm />
      <LinkList />
    </>
  )
}

export default DashBoard