
const ProtectedRoutes = ({children}) => {
  
  if (!localStorage.getItem('token')) {
    window.location.href = '/';
  }
    return (
      children
  );
}

export default ProtectedRoutes;