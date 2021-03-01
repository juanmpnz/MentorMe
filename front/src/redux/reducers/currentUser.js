const initialState = {
  skills: [],
  skillsToTeach: [],
  skillsToLearn: [],
  mentees: [],
  mentors: [
    {
      objectives: [],
      teachingSkills: [],
    },
  ],
}

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload
    case "ME_LOGIN":
      return action.payload
    case "LOGOUT":
      return initialState
    case "GET_MENTORS":
      return { ...state, mentors: action.payload }
    case "GET_MENTEES":
      return { ...state, mentees: action.payload }
    case "UPDATE_SKILLS_TO_LEARN":
      return { ...state, skillsToLearn: action.payload }
    case "UPDATE_SKILLS_TO_TEACH":
      return { ...state, skillsToTeach: action.payload }
    case "ADD_MENTOR":
      return { ...state, mentors: [...state.mentors, action.payload] }
    case "ADD_MENTEE":
      return { ...state, mentees: [...state.mentees, action.payload] }
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.payload }
    default:
      return state
  }
}
export default currentUserReducer
