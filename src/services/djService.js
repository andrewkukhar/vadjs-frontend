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

function prepareUpdatedData(data) {
  let updatedData = {};

  for (const key in data) {
    if (key === 'djInfo') {
      for (const djKey in data.djInfo) {
        updatedData[djKey] = data.djInfo[djKey];
      }
    } else {
      updatedData[key] = data[key];
    }
  }

  // Ensure image is formatted correctly for the backend.
  // If image is an object with contentType and data, convert it to base64 string.
  if (updatedData.image && typeof updatedData.image === 'object' && updatedData.image.contentType && updatedData.image.data) {
    updatedData.image = `data:${updatedData.image.contentType};base64,${updatedData.image.data.toString('base64')}`;
  }

  return updatedData;
}

export const updateUserProfile = async (token, userId, profileData) => {
  const endpoint = `${baseUrl}/${userId}/update`;

  const updatedData = prepareUpdatedData(profileData);

  const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'x-auth-token': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
  });
  
  if (!response.ok) {
      throw new Error('Failed to update profile');
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
