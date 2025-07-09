// Mapping from display names to backend file names
const areaNameMapping = {
  'HSR Layout': 'hsr_layout',
  'Koramangala': 'kormangala',
  'Whitefield': 'whitefield'
};

// Reverse mapping for display
const displayNameMapping = {
  'hsr_layout': 'HSR Layout',
  'kormangala': 'Koramangala',
  'whitefield': 'Whitefield'
};

export const getBackendAreaName = (displayName) => {
  return areaNameMapping[displayName] || displayName.toLowerCase().replace(/\s+/g, '_');
};

export const getDisplayAreaName = (backendName) => {
  return displayNameMapping[backendName] || backendName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const availableAreas = [
  'HSR Layout',
  'Koramangala', 
  'Whitefield'
];