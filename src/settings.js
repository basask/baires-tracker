function getDefaults() {
  return {
    focalPoint: process.env.TT_FOCAL_POINT,
    project: process.env.TT_PROJECT,
    category: process.env.TT_CATEGORY,
    task: process.env.TT_TASK,
  };
}

function getApi() {
  return {
    workspaceId: process.env.CLOCKIFY_WORKSPACE_ID,
    apiKey: process.env.CLOCKIFY_API_KEY,
  };
}

function getTimeTracker() {
  return {
    user: process.env.TT_USER,
    password: process.env.TT_PASSWORD,
  };
}

module.exports = { getDefaults, getApi, getTimeTracker };
