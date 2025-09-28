import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const withRouter = (Component: any) => {
  return function WrappedComponent (props: any) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} match={{ params }} navigate={navigate} location={location} />;
  };
}