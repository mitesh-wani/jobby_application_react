// import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onCLickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home">
        <div className="home-content-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="text">
            Millions of people are searching for jobs, salary information,
            company reviews and in which place,company reviews find the job that
            fits to your skills and that are suiatable for our own work.
          </p>
          <Link to="/jobs" className="nav-link">
            <button
              className="find-job-btn"
              type="button"
              onClick={onCLickFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
