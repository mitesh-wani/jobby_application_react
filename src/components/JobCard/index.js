import {Link} from 'react-router-dom'
import './index.css'
// import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = ({job}) => {
  const {
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    description,
  } = job
  return (
    <li className="job-card">
      <Link to={`/jobs/${job.id}`} className="link">
        <div className="job-img-card">
          <img
            className="company-logo-img"
            src={job.companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <p>⭐ {rating}</p>
          </div>
        </div>

        <div className="info">
          <div className="info-location-type-cart">
            <p className="location-icon-text">{location}</p>
            <p className="type-icon-text">
              <BsBriefcaseFill />
              {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>

        <hr />
        <h1 className="description-heading">Description</h1>
        <p>{description}</p>
      </Link>
    </li>
  )
}
export default JobCard
