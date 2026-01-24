import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {onChangeEmploymentType, onChangeSalaryRange} = props
  return (
    <div className="filter-container">
      <h1>Type of Employment</h1>
      <ul className="employee-type-list">
        {employmentTypesList.map(each => (
          <li className="type-list" key={each.employmentTypeId}>
            <input
              className="employmentTypeId"
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={() => onChangeEmploymentType(each.employmentTypeId)}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>

      <hr />
      <h1>Salary Range</h1>

      <ul className="salry-range-list">
        {salaryRangesList.map(each => (
          <li className="salry-list" key={each.salaryRangeId}>
            <input
              className="salaryRangeId"
              type="radio"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={() => onChangeSalaryRange(each.salaryRangeId)}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FilterGroup
