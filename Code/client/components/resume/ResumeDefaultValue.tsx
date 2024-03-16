export const resumeDefaultValues = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    summary: "",
  },
  educations: [
    {
      index: 0,
      institution: "",
      subject: "",
      startDate: "",
      endDate: "",
      score: 0,
      location: "",
    },
  ],
  internships: [],
  employments: [
    // { index: 0, title: '', company: '', startDate: '', endDate: '', location: '', isCurrent: '', summary: '', }
  ],
  skills: [
    {
      index: 0,
      name: "",
      level: 0,
    },
  ],
  languages: [
    {
      index: 0,
      name: "",
      level: 0,
    },
  ],
  links: [
    // { index: 0, name: '', url: '' }
  ],
  courses: [
    // { index: 0, name: '', institution: '', startDate: '', endDate: ''}
  ],
  references: [
    // { index: 0, name: '', company: '', phone: '', email: '' }
  ],
};
