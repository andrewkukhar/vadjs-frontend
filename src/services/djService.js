const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/djs`;

export const fetchDjData = async (token, userId) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': `${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch DJ info');
  }
  return await response.json();
}

export const updateUserProfileData = async (token, userId, profileData) => {
  const endpoint = `${baseUrl}/${userId}/update`;

  const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'x-auth-token': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return await response.json();
};

export const updateUserProfileImage = async (token, userId, file) => {
  const endpoint = `${baseUrl}/${userId}/update-image`;

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
          'x-auth-token': `${token}`
      },
      body: formData
  });

  if (!response.ok) {
      throw new Error('Failed to update image');
  }
  return await response.json();
};

export const fetchAllDjUpcomingEvents = async () => {
  const response = await fetch(`${baseUrl}/all-gigs`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gigs');
  }
  return await response.json();
};