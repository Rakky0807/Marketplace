const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return {success: true, message: data.message};
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}

const signup = async (name, email, password) => {
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    return {success: true, message: data.message};
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}


export {login, signup};