import { Link } from "react-router-dom";
import market from './market.png'

const Navigation = ({ web3Handler, account }) => {
  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="http://www.dappuniversity.com/bootcamp" className="flex items-center">
          <img src={market} width="40" height="40" className="mr-2" alt="Market Logo" />
          <span className="text-white text-lg">DApp NFT Marketplace</span>
        </Link>
        <button
          className="text-white block lg:hidden focus:outline-none"
          aria-controls="responsive-navbar-nav"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div className="w-full lg:flex lg:items-center lg:w-auto hidden lg:block">
          <ul className="lg:flex lg:space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/create" className="text-white hover:text-gray-300">Create</Link>
            </li>
            <li>
              <Link to="/my-listed-items" className="text-white hover:text-gray-300">My Listed Items</Link>
            </li>
            <li>
              <Link to="/my-purchases" className="text-white hover:text-gray-300">My Purchases</Link>
            </li>
          </ul>
        </div>
        <div className="lg:flex lg:items-center">
          {account ? (
            <a
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-4"
            >
              <button className="border border-white text-white px-4 py-2 rounded hover:bg-gray-600">
                {account.slice(0, 5) + '...' + account.slice(38, 42)}
              </button>
            </a>
          ) : (
            <button
              onClick={web3Handler}
              className="border border-white text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
