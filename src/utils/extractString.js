/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const extractString = (url) => {
  const parts = url.split('/');
  const fileNameWithExtension = parts.slice(-1)[0]; // Get the last part which is the filename with extension
  const fileNameWithoutExtension = fileNameWithExtension.split('.')[0]; // Remove the extension
  return `${parts.slice(-3, -1).join('/')}/${fileNameWithoutExtension}`;
};

module.exports = extractString;
