import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profile: {},
    jobs: [],
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/profile', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()
      const profile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profile,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsApiUrl = () => {
    const {
      searchInput,
      selectedEmploymentTypes,
      selectedSalaryRange,
    } = this.state

    return `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentTypes.join(
      ',',
    )}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = this.getJobsApiUrl()

    const response = await fetch(apiUrl, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()
      const jobs = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        location: each.location,
        employmentType: each.employment_type,
        packagePerAnnum: each.package_per_annum,
        description: each.job_description,
        companyLogoUrl: each.company_logo_url,
      }))

      this.setState({
        jobs,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => this.setState({searchInput: event.target.value})

  onSearch = () => this.getJobs()

  onChangeEmploymentType = id => {
    this.setState(
      prev => ({
        selectedEmploymentTypes: prev.selectedEmploymentTypes.includes(id)
          ? prev.selectedEmploymentTypes.filter(each => each !== id)
          : [...prev.selectedEmploymentTypes, id],
      }),
      this.getJobs,
    )
  }

  onChangeSalaryRange = id => {
    this.setState({selectedSalaryRange: id}, this.getJobs)
  }

  renderProfile = () => {
    const {profileApiStatus, profile} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.loading:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" />
          </div>
        )

      case apiStatusConstants.success:
        return (
          <div className="profile-section">
            <img src={profile.profileImageUrl} alt="profile" />
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-bio">{profile.shortBio}</p>
          </div>
        )

      case apiStatusConstants.failure:
        return (
          <button type="button" onClick={this.getProfile}>
            Retry
          </button>
        )

      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsApiStatus, jobs} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.loading:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" />
          </div>
        )

      case apiStatusConstants.success:
        if (jobs.length === 0) {
          return (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </div>
          )
        }
        return (
          <ul className="jobs-list">
            {jobs.map(each => (
              <JobCard key={each.id} job={each} />
            ))}
          </ul>
        )

      case apiStatusConstants.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.getJobs}>
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-section">
            {this.renderProfile()}
            <FilterGroup
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>

          <div className="jobs-section">
            <div className="search-bar">
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearch}
                placeholder="Search"
              />
              <button
                className="search-icon-btn"
                type="button"
                onClick={this.onSearch}
                data-testid="searchButton"
              >
                <BsSearch />
              </button>
            </div>

            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
