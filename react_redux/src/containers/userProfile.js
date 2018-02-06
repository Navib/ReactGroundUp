import { connect } from 'react-redux';
import UserProfile from '../components/userProfile';

const mapStateToProps = (state) => ({
  userProfile: state.UserProfile,
})

const UserProfileContainer = connect(
  mapStateToProps,
)(UserProfile)

export default UserProfileContainer;
