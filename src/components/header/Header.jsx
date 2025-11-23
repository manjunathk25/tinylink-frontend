import logo from '../../assets/logo.svg'
import "./header.css"

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} alt="logo" />
    </div>
  )
}

export default Header